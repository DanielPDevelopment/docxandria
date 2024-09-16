import { useState, useEffect } from 'react';
import { useAuth } from 'contexts/user/AuthContext';
import { useLibrary } from 'contexts/libraries/LibraryContext';

// Determine WebSocket URL based on environment
const socketAdd = process.env.REACT_APP_DEVELOPMENT === 'true' ? process.env.REACT_APP_WEBSOKET_DEV : process.env.REACT_APP_WEBSOCKET_PROD;

export function useMic() {
    // State variables
    const [audioElement, setAudioElement] = useState(null); // For managing audio element
    const [isListening, setIsListening] = useState(false); // Indicates if the microphone is active
    const [stream, setStream] = useState(null); // MediaStream from the microphone
    const [transcript, setTranscript] = useState(''); // Transcript of the spoken words
    const [recognition, setRecognition] = useState(null); // SpeechRecognition instance
    const [ws, setWs] = useState(null); // WebSocket instance
    const { user } = useAuth(); // User context for identifying the user
    const { activeLibraries, setActiveResults, addToActiveResults } = useLibrary(); // Library context

    // Effect to manage WebSocket connection when listening state changes
    useEffect(() => {
        if (isListening) {
            try {
                const websocket = new WebSocket(socketAdd);
                setWs(websocket);

                websocket.onopen = () => {
                    // Send initial data when WebSocket connection opens
                    const dataToSend = {
                        type: 'initial',
                        id: user._id,
                        activeLibraries
                    };
                    websocket.send(JSON.stringify(dataToSend));
                };

                websocket.onmessage = (event) => {
                    // Handle incoming WebSocket messages
                    addToActiveResults({ data: event.data });
                };

                websocket.onerror = (error) => {
                    console.error('WebSocket error:', error);
                };

                return () => {
                    // Clean up WebSocket connection on unmount or when `isListening` changes
                    if (websocket.readyState === WebSocket.OPEN || websocket.readyState === WebSocket.CONNECTING) {
                        websocket.close();
                    }
                };
            } catch (err) {
                console.log(err);
            }
        }
    }, [isListening]);

    // Effect to send transcript data to the WebSocket server
    useEffect(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const dataToSend = {
                type: 'update',
                message: transcript.trim(),
                id: user._id,
                activeLibraries
            };
            ws.send(JSON.stringify(dataToSend));
        }
    }, [transcript]);

    // Effect to clean up audio stream and WebSocket connection when listening stops
    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                setStream(null);
                stopAudio();
            }
        };
    }, [isListening, stream]);

    // Request access to the microphone and set up the audio stream
    const requestMicrophoneAccess = async () => {
        if (stream) {
            console.log("Audio stream is already in use");
            return;
        }

        try {
            const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log("Microphone access granted");

            const combinedStream = new MediaStream([...micStream.getAudioTracks()]);

            const audioEl = document.createElement('audio');
            audioEl.srcObject = combinedStream;
            // audioEl.play(); // Uncomment to play the sound for testing purposes

            setAudioElement(audioEl);
            setStream(combinedStream);
            setIsListening(true);

            startSpeechRecognition();
        } catch (error) {
            console.error("Audio access denied:", error);
            setIsListening(false);
            alert("Audio access was denied. Please check your browser settings to allow audio access and try again.");
        }
    };

    // Initialize and start speech recognition
    const startSpeechRecognition = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Your browser does not support speech recognition.");
            return;
        }

        const recognitionInstance = new window.webkitSpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                interimTranscript = event.results[i][0].transcript;
                setTranscript(interimTranscript);
            }
        };

        recognitionInstance.onerror = (event) => {
            if (event.error !== 'no speech') {
                setIsListening(false);
            }
        };

        recognitionInstance.onend = () => {
            setIsListening(false);
        };

        recognitionInstance.start();
        setRecognition(recognitionInstance);
    };

    // Stop audio, speech recognition, and WebSocket connection
    const stopAudio = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        if (recognition) {
            recognition.stop();
            setRecognition(null);
        }
        if (audioElement) {
            audioElement.pause();
            audioElement.srcObject = null;
            setAudioElement(null);
        }
        if (ws) {
            ws.close();
            setWs(null);
        }
        setIsListening(false);
        setTranscript('');
    };

    return [requestMicrophoneAccess, audioElement, isListening, setIsListening, transcript, stopAudio];
}
