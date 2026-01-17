import React, { useState } from 'react';
import './visual.css';

const CssTextVisualizer = () => {
  // State for all CSS properties
  const [textAlign, setTextAlign] = useState('left');
  const [fontWeight, setFontWeight] = useState('400');
  const [textDecoration, setTextDecoration] = useState('none');
  const [lineHeight, setLineHeight] = useState('1.5');
  const [letterSpacing, setLetterSpacing] = useState('0');
  const [fontSize, setFontSize] = useState(16);
  const [fontSizeUnit, setFontSizeUnit] = useState('px');
  const [fontFamily, setFontFamily] = useState('Arial, sans-serif');

  // Dynamic Styles Object
  const previewStyle = {
    textAlign: textAlign,
    fontWeight: fontWeight,
    textDecoration: textDecoration,
    lineHeight: lineHeight,
    letterSpacing: `${letterSpacing}px`,
    fontSize: `${fontSize}${fontSizeUnit}`,
    fontFamily: fontFamily,
  };

  // Helper to generate code snippet for display
  const getCodeSnippet = () => {
    return `.my-text {
  font-family: ${fontFamily};
  font-size: ${fontSize}${fontSizeUnit};
  font-weight: ${fontWeight};
  text-align: ${textAlign};
  text-decoration: ${textDecoration};
  line-height: ${lineHeight};
  letter-spacing: ${letterSpacing}px;
}`;
  };

  return (
    <div className="ctv-container">
      <header className="ctv-header">
        <h3>CSS Text Properties Playground</h3>
        <p>Experiment with typography styles to see how they transform text.</p>
      </header>

      <div className="ctv-workspace">
        {/* --- Controls Panel --- */}
        <div className="ctv-controls">
          
          {/* Font Family */}
          <div className="ctv-control-group">
            <label>Font Family</label>
            <select 
              value={fontFamily} 
              onChange={(e) => setFontFamily(e.target.value)}
              className="ctv-select"
            >
              <option value="Arial, sans-serif">Arial (Sans-serif)</option>
              <option value="'Times New Roman', serif">Times New Roman (Serif)</option>
              <option value="'Courier New', monospace">Courier New (Monospace)</option>
              <option value="'Brush Script MT', cursive">Brush Script (Cursive)</option>
            </select>
          </div>

          {/* Font Size Group */}
          <div className="ctv-control-group">
            <label>Font Size</label>
            <div className="ctv-input-row">
              <input 
                type="number" 
                value={fontSize} 
                onChange={(e) => setFontSize(e.target.value)}
                className="ctv-number-input"
              />
              <select 
                value={fontSizeUnit} 
                onChange={(e) => setFontSizeUnit(e.target.value)}
                className="ctv-unit-select"
              >
                <option value="px">px</option>
                <option value="rem">rem</option>
                <option value="em">em</option>
                <option value="%">%</option>
              </select>
            </div>
            <p className="ctv-info-text">
              {fontSizeUnit === 'px' ? 'Absolute unit (fixed).' : 'Relative unit (responsive).'}
            </p>
          </div>

          {/* Font Weight */}
          <div className="ctv-control-group">
            <label>Font Weight: <strong>{fontWeight}</strong></label>
            <input 
              type="range" 
              min="100" 
              max="900" 
              step="100" 
              value={fontWeight} 
              onChange={(e) => setFontWeight(e.target.value)}
              className="ctv-slider"
            />
            <div className="ctv-slider-labels">
              <span>Thin (100)</span>
              <span>Bold (700)</span>
              <span>Heavy (900)</span>
            </div>
          </div>

          {/* Text Align */}
          <div className="ctv-control-group">
            <label>Text Align</label>
            <div className="ctv-btn-group">
              {['left', 'center', 'right', 'justify'].map((align) => (
                <button
                  key={align}
                  className={`ctv-btn ${textAlign === align ? 'active' : ''}`}
                  onClick={() => setTextAlign(align)}
                >
                  {align.charAt(0).toUpperCase() + align.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Text Decoration */}
          <div className="ctv-control-group">
            <label>Text Decoration</label>
            <select 
              value={textDecoration} 
              onChange={(e) => setTextDecoration(e.target.value)}
              className="ctv-select"
            >
              <option value="none">None</option>
              <option value="underline">Underline</option>
              <option value="overline">Overline</option>
              <option value="line-through">Line-through</option>
            </select>
          </div>

          {/* Line Height & Letter Spacing */}
          <div className="ctv-double-row">
            <div className="ctv-control-group">
              <label>Line Height: {lineHeight}</label>
              <input 
                type="range" 
                min="0.8" 
                max="3.0" 
                step="0.1" 
                value={lineHeight} 
                onChange={(e) => setLineHeight(e.target.value)}
                className="ctv-slider"
              />
            </div>
            <div className="ctv-control-group">
              <label>Letter Spacing: {letterSpacing}px</label>
              <input 
                type="range" 
                min="-2" 
                max="10" 
                step="0.5" 
                value={letterSpacing} 
                onChange={(e) => setLetterSpacing(e.target.value)}
                className="ctv-slider"
              />
            </div>
          </div>

        </div>

        {/* --- Preview & Code Panel --- */}
        <div className="ctv-preview-panel">
          
          <div className="ctv-card preview-card">
            <div className="ctv-card-header">Live Preview</div>
            <div className="ctv-preview-box" style={previewStyle}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                CSS text properties allow you to control the flow and style 
                of your typography. Adjust the controls to see how this 
                paragraph changes!
              </p>
            </div>
          </div>

          <div className="ctv-card code-card">
            <div className="ctv-card-header">CSS Output</div>
            <pre className="ctv-code-block">
              <code>{getCodeSnippet()}</code>
            </pre>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CssTextVisualizer;