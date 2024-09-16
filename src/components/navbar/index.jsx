import React, { useState } from 'react';
import Dropdown from 'components/dropdown';
import { useAuth } from '../../contexts/user/AuthContext';
import menuIcon from 'assets/img/soundWaves2.png';
import micImageOff from 'assets/img/mic1C.png';
import micImageOn from 'assets/img/mic2.png';
import Logo from 'components/brand/Logo';
import { useMic } from 'hooks/Microphone/useMic';
import { useLibrary } from 'contexts/libraries/LibraryContext';

const Navbar = () => {
  const { signOut } = useAuth();
  const [avatarOpen, setAvatarOpen] = useState(false);
  const { setAddingLibrary, setSeeLibraries } = useLibrary();
  const [openWrapper, setOpenWrapper] = useState(false);
  const [requestMicrophoneAccess, audioElement, isListening, setIsListening, transcript] = useMic();

  return (
    <nav className="fixed top-4 md:top-4 z-40 flex wrap justify-between align-start content-start w-full">
      <Logo
        textExtra="md:text-4xl text-2xl"
        imageExtra="md:h-14 h-12"
      />
      <div className="flex h-[61px] items-center rounded-full bg-lightGray px-4 md:flex-grow-0 md:gap-1 xl:gap-2">
        <div className="flex justify-center items-center">
          {isListening && (
            <div>
              <span className="text-grayWhite font-mono">
                {transcript.split(' ').slice(-3).join(' ')}...
              </span>
            </div>
          )}
          <img
            src={!isListening ? micImageOff : micImageOn}
            alt="microphone"
            className="md:h-8 h-6 cursor-pointer drop-shadow-xl transition-all duration-300 ease-in-out text-white"
            style={{ width: 'auto' }}
            onClick={() => {
              setIsListening((prev) => !prev);
              requestMicrophoneAccess();
            }}
          />
        </div>

        {/* Profile & Dropdown */}
        <Dropdown
          setAvatarOpen={setAvatarOpen}
          openWrapper={openWrapper}
          setOpenWrapper={setOpenWrapper}
          button={
            <img
              src={menuIcon}
              alt="Menu"
              className="md:px-2 px-1 md:h-10 h-8 cursor-pointer mx-4 drop-shadow-xl transition-all duration-300 ease-in-out"
              style={{ width: 'auto' }}
              onClick={() => setAvatarOpen(true)}
            />
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-creamyWhite bg-cover bg-no-repeat shadow-xl">
              <div className="p-4 cursor-default">
                <div className="flex items-center gap-2">
                  <p
                    className="text-sm text-grayBlue font-poppins cursor-pointer"
                    onClick={() => {
                      setAddingLibrary(true);
                      setSeeLibraries(false);
                      setOpenWrapper(false);
                    }}
                  >
                    Add Library
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <p
                    className="text-sm text-grayBlue font-poppins cursor-pointer"
                    onClick={() => {
                      setAddingLibrary(false);
                      setSeeLibraries(true);
                      setOpenWrapper(false);
                    }}
                  >
                    View Libraries
                  </p>
                </div>
              </div>
              <div className="h-px w-full bg-primaryBlue w-[90%] m-auto dark:bg-white/20" />

              <div className="flex flex-col p-4">
                <a
                  href="#"
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                  onClick={() => signOut()}
                >
                  Log Out
                </a>
              </div>
            </div>
          }
          classNames="py-2 top-10 left-0 -left-[150px] md:-left-[150px] w-max"
          animation="origin-[75%_0%] md:origin-top-end transition-all duration-300 ease-in-out"
        />
      </div>
    </nav>
  );
};

export default Navbar;
