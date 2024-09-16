import { useEffect } from 'react';

/**
 * Custom hook to set the document title.
 *
 * @param {string} title - The title to set for the document.
 */
function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

/**
 * Custom hook to set the meta description tag in the document head.
 *
 * @param {string} desc - The description to set for the meta description tag.
 */
function useDocumentDescription(desc) {
  useEffect(() => {
    // Find the meta description element or create one if it doesn't exist
    let descriptionMetaTag = document.querySelector('meta[name="description"]');
    
    if (!descriptionMetaTag) {
      descriptionMetaTag = document.createElement('meta');
      descriptionMetaTag.name = 'description';
      document.head.appendChild(descriptionMetaTag);
    }
    
    descriptionMetaTag.content = desc;
  }, [desc]);
}

export { useDocumentTitle, useDocumentDescription };
