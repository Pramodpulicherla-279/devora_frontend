import React from 'react';
import parse, { domToReact } from 'html-react-parser';
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

      // If a matching component exists, render it inside an isolating
      // wrapper so the lesson's prose styles (which are placed in the
      // @layer dvz-lesson-prose cascade layer) never bleed into the
      // dark-themed visualization.
      if (Component) {
        return (
          <div className="dvz-embed">
            <Component />
          </div>
        );
      }
      
      // Optional: Return an error message or null if type is not found
      console.warn(`No visualization found for type: ${vizType}`);
      return null;
    }

    // Wrap prose tables in a scroll container so they fill the available
    // width and distribute columns normally, while still scrolling
    // horizontally (instead of being clipped) on narrow screens.
    // Children are rendered with the same options so any nested embeds
    // still resolve, and we avoid re-processing this same <table> node.
    if (domNode.name === 'table') {
      return (
        <div className="ls-table-wrap">
          <table>{domToReact(domNode.children, parserOptions)}</table>
        </div>
      );
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