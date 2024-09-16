import { useState, useEffect } from 'react';

/**
 * Custom hook to toggle search visibility with a keyboard shortcut.
 *
 * @returns {Array} An array containing:
 *  - searchOpen: Boolean indicating if the search is open.
 *  - setSearchOpen: Function to toggle the search state.
 *  - handleKeyPress: Function to handle the keyboard shortcut.
 */
export function useSearchToggle() {
  const [searchOpen, setSearchOpen] = useState(false);

  /**
   * Handles key press events to toggle the search state.
   *
   * @param {KeyboardEvent} event - The keyboard event.
   */
  const handleKeyPress = (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'S') {
      setSearchOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    // Add event listener for keydown events
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (searchOpen) {
      // Focus the search input when search is opened
      const searchInput = document.getElementById('search');
      if (searchInput) {
        searchInput.focus();
      }
    }
  }, [searchOpen]);

  return [searchOpen, setSearchOpen, handleKeyPress];
}
