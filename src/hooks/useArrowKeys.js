import React from 'react';

/**
 * Custom hook to handle arrow key navigation on search bar results and opening a URL on Enter key press.
 *
 * @param {number} maxIndexInit - Initial maximum index for navigation.
 * @returns {[number|null, React.Dispatch<React.SetStateAction<number>>, React.Dispatch<React.SetStateAction<string|null>>]} 
 * Array containing the current location index, a function to set the maximum index, and a function to set the target URL.
 */
export function useArrowKeys(maxIndexInit) {
  // State for the current location index, maximum index, and target URL
  const [locationIndex, setLocationIndex] = React.useState(null);
  const [maxIndex, setMaxIndex] = React.useState(maxIndexInit);
  const [target, setTarget] = React.useState(null);

  /**
   * Handles key press events for arrow key navigation and Enter key URL opening.
   * 
   * @param {KeyboardEvent} event - The keyboard event.
   */
  const handleKeyPress = (event) => {
    if (event.key === 'ArrowDown') {
      setLocationIndex((prev) => {
        if (maxIndex && prev < maxIndex - 1) {
          return prev + 1;
        }
        return 0;
      });
    } else if (event.key === 'ArrowUp') {
      setLocationIndex((prev) => {
        if (prev <= 0) {
          return prev;
        }
        return prev - 1;
      });
    } else if (event.key === 'Enter' && target) {
      window.open(target, '_blank');
    }
  };

  // Set up and clean up the event listener for key presses
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [maxIndex, target]);

  return [locationIndex, setMaxIndex, setTarget];
}
