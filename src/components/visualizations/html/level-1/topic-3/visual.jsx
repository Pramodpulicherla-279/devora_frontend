import React, { useState, useRef, useEffect } from 'react';
import './visual.css';

// --- Data Structure ---
// Maps IDs to the explanations provided in the prompt
const explanations = {
  doctype: {
    title: '<!DOCTYPE html>',
    content: 'Tells the browser that the document is written in HTML5. It is not an HTML tag, but an instruction to the web browser about what version of HTML the page is written in.'
  },
  htmlStart: {
    title: '<html lang="en">',
    content: (
      <>
        <p>This is the <strong>root element</strong> of the page. All other content sits inside this tag.</p>
        <p>The <code>lang="en"</code> attribute declares the language of the webpage as English. This is crucial for accessibility (screen readers) and SEO (Search Engine Optimization).</p>
      </>
    )
  },
  headBlock: {
    title: 'The <head> Section',
    content: (
      <>
        <p>This container holds <strong>metadata</strong>—information <em>about</em> the webpage that isn't displayed directly on the main canvas.</p>
        <p>It typically includes the page title, links to CSS stylesheets, character set declarations, and other technical settings.</p>
      </>
    )
  },
  metaCharset: {
    title: '<meta charset="UTF-8" />',
    content: 'This ensures your webpage can display almost all international characters, symbols, and emojis correctly without looking scrambled.'
  },
  metaViewport: {
    title: '<meta name="viewport" ... />',
    content: 'This is essential for modern web design. It tells mobile browsers how to control the page\'s dimensions and scaling, making your site responsive on phones and tablets.'
  },
  titleTag: {
    title: '<title>...</title>',
    content: 'Sets the text that appears in the browser\'s tab or window title bar. It is also highly important for search engine results.'
  },
  bodyBlock: {
    title: 'The <body> Section',
    content: 'This contains everything the user will actually <strong>see and interact with</strong> in the browser window—text, images, buttons, videos, and links.'
  },
  contentExample: {
    title: 'Page Content Example',
    content: 'These are standard HTML elements inside the body. The <h1> is a top-level heading, and the <p> is a paragraph.'
  },
  closingTags: {
    title: 'Closing Tags (</body> and </html>)',
    content: 'These signify the end of the body section and the end of the entire HTML document structure, respectively.'
  }
};

// The structure of the code viewer, linking lines to explanation IDs and setting indentation levels.
const codeStructure = [
  { id: 'doctype', text: '<!DOCTYPE html>', indent: 0 },
  { id: 'htmlStart', text: '<html lang="en">', indent: 0 },
  { id: 'headBlock', text: '<head>', indent: 1, isWrapper: true },
  { id: 'metaCharset', text: '<meta charset="UTF-8" />', indent: 2 },
  { id: 'metaViewport', text: '<meta name="viewport" content="..." />', indent: 2 },
  { id: 'titleTag', text: '<title>My First Webpage</title>', indent: 2 },
  { id: 'headBlock', text: '</head>', indent: 1, isWrapper: true },
  { id: 'bodyBlock', text: '<body>', indent: 1, isWrapper: true },
  { id: 'contentExample', text: '  <h1>Welcome to HTML</h1>', indent: 2 },
  { id: 'contentExample', text: '  <p>This is the basic page structure.</p>', indent: 2 },
  { id: 'closingTags', text: '</body>', indent: 1, isWrapper: true },
  { id: 'closingTags', text: '</html>', indent: 0 },
];


const HtmlBoilerplateVisualizer = () => {
  // State to track which part of the code is currently selected
  const [selectedId, setSelectedId] = useState(null);
  const detailsRef = useRef(null);

  // Auto-scroll the details panel into view on mobile when selected
  useEffect(() => {
    if (selectedId && window.innerWidth < 768 && detailsRef.current) {
        detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedId]);

  const handleLineClick = (id) => {
    // Toggle selection off if clicking the same line again
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  const activeExplanation = selectedId ? explanations[selectedId] : null;

  return (
    <div className="hbv-container">
      <header className="hbv-header">
        <h2>The HTML Boilerplate "Skeleton"</h2>
        <p>
          Every HTML document starts with this standard structure. It's the foundation required for a webpage to work correctly across all browsers.
        </p>
        <p className="hbv-instruction">
          👇 <strong>Tap on any line of code below</strong> to see what it does.
        </p>
      </header>

      <div className="hbv-interactive-layout">
        {/* --- Left Column: Code Viewer --- */}
        <div className="hbv-code-panel">
          <div className="hbv-code-window-controls">
            <span className="hbv-dot red"></span>
            <span className="hbv-dot yellow"></span>
            <span className="hbv-dot green"></span>
            <span className="hbv-filename">index.html</span>
          </div>
          <pre className="hbv-code-block">
            <code>
              {codeStructure.map((line, index) => {
                const isActive = selectedId === line.id;
                // Wrapper lines get a distinct color context
                const wrapperClass = line.isWrapper ? (isActive ? 'hbv-wrapper-active' : 'hbv-wrapper-inactive') : '';
                
                return (
                  <button
                    key={index}
                    onClick={() => handleLineClick(line.id)}
                    className={`hbv-code-line indent-${line.indent} ${isActive ? 'active' : ''} ${wrapperClass}`}
                    aria-pressed={isActive}
                    aria-label={`View explanation for ${line.text}`}
                  >
                    <span className="hbv-line-number">{index + 1}</span>
                    <span className="hbv-line-content">{line.text}</span>
                  </button>
                );
              })}
            </code>
          </pre>
        </div>

        {/* --- Right/Bottom Column: Explanation Panel --- */}
        <div 
            className={`hbv-details-panel ${activeExplanation ? 'is-open' : ''}`} 
            ref={detailsRef}
        >
          {activeExplanation ? (
            <div className="hbv-details-content fadeIn">
              <h3 className="hbv-details-title code-font">{activeExplanation.title}</h3>
              <div className="hbv-details-body">
                {typeof activeExplanation.content === 'string' ? (
                  <p>{activeExplanation.content}</p>
                ) : (
                  activeExplanation.content
                )}
              </div>
              <button 
                  className="hbv-close-mobile-btn"
                  onClick={() => setSelectedId(null)}
              >
                  Close
              </button>
            </div>
          ) : (
            <div className="hbv-details-placeholder fadeIn">
              <div className="placeholder-icon">👈</div>
              <h3>Select a line of code</h3>
              <p>Click on any part of the HTML skeleton on the left to view its purpose here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HtmlBoilerplateVisualizer;