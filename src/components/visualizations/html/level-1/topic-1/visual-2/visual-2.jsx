import React from 'react';
import './visual-2.css';

const HtmlLayersVisualization = () => {
  return (
    <div className="html-layers-container">
      <div className="html-layers-inner">
        <div className="html-layers-intro">
          <h2>HTML Document Layers</h2>
          <p>
            Think of an HTML page as a stack of layers. Hover each layer to see
            what part of the page it represents.
          </p>
        </div>

        <div className="html-layers-stack">
          {/* HTML layer */}
          <div className="layer-card layer-html-box">
            <div className="layer-face">
              <span className="layer-tag">&lt;html&gt; ... &lt;/html&gt;</span>
              <p className="layer-label">Whole document wrapper</p>
              <p className="layer-description">
                The <code>&lt;html&gt;</code> tag wraps everything on the page.
              </p>
            </div>
          </div>

          {/* HEAD layer */}
          <div className="layer-card layer-head">
            <div className="layer-face">
              <span className="layer-tag">&lt;head&gt; ... &lt;/head&gt;</span>
              <p className="layer-label">Page information</p>
              <p className="layer-description">
                Holds the <code>&lt;title&gt;</code>, metadata, and links to CSS or
                scripts.
              </p>
            </div>
          </div>

          {/* BODY layer */}
          <div className="layer-card layer-body">
            <div className="layer-face">
              <span className="layer-tag">&lt;body&gt; ... &lt;/body&gt;</span>
              <p className="layer-label">Visible content</p>
              <p className="layer-description">
                Everything you can see in the browser: headings, text, images,
                buttons, and more.
              </p>
            </div>
          </div>
        </div>

        {/* Simple browser preview on the right */}
        <div className="html-layers-preview">
          <div className="preview-browser">
            <div className="preview-bar">
              <span className="preview-dot red" />
              <span className="preview-dot yellow" />
              <span className="preview-dot green" />
              <span className="preview-title">My First Webpage</span>
            </div>
            <div className="preview-body">
              <h1>Welcome to HTML</h1>
              <p>This is a simple paragraph.</p>
            </div>
          </div>
          <p className="preview-caption">
            All three layers work together to produce this page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HtmlLayersVisualization;