import React from 'react';
import parse from 'html-react-parser';
import visualizationRegistry from '../visualizationRegistry';

/**
 * Custom options for html-react-parser
 * It checks for div.visualization-embed and replaces it with a React Component
 */
const parserOptions = {
  replace: (domNode) => {
    // Check if the element is a <div> with class "visualization-embed"
    if (domNode.attribs && domNode.attribs.class === 'visualization-embed') {
      
      // Get the type from data-type="web-stack"
      const vizType = domNode.attribs['data-type'];

      // Look up the component in our registry
      const Component = visualizationRegistry[vizType];

      // If a matching component exists, render it
      if (Component) {
        return <Component />;
      }
      
      // Optional: Return an error message or null if type is not found
      console.warn(`No visualization found for type: ${vizType}`);
      return null; 
    }
  },
};

/**
 * Main helper function to use in your components
 * @param {string} htmlContent - The raw HTML string from backend
 */
export const parseLessonContent = (htmlContent) => {
  if (!htmlContent) return null;
  return parse(htmlContent, parserOptions);
};