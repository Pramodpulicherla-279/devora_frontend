import React, { useState } from 'react';
import './visual.css';

const CssAdvancedVisualizer = () => {
  const [activeTab, setActiveTab] = useState('pseudo-classes');

  // --- State for Pseudo-Classes ---
  const [nthMode, setNthMode] = useState('none'); // 'none', '2', '2n'

  // --- State for Cascade/Specificity ---
  const [useElement, setUseElement] = useState(true); // div { color: red }
  const [useClass, setUseClass] = useState(false);    // .box { color: blue }
  const [useId, setUseId] = useState(false);          // #unique { color: green }
  const [useImportant, setUseImportant] = useState(false); // !important

  // --- State for Inheritance ---
  const [parentColor, setParentColor] = useState('black');
  const [parentBorder, setParentBorder] = useState(false);

  // Helper to determine the winning color for Specificity Demo
  const getWinningColor = () => {
    if (useImportant) return '#9b59b6'; // Purple (!important)
    if (useId) return '#27ae60';        // Green (ID)
    if (useClass) return '#2980b9';     // Blue (Class)
    if (useElement) return '#e74c3c';   // Red (Element)
    return '#ccc'; // Default
  };

  const getWinningSource = () => {
    if (useImportant) return 'div { background: purple !important; }';
    if (useId) return '#my-box { background: green; }';
    if (useClass) return '.my-box { background: blue; }';
    if (useElement) return 'div { background: red; }';
    return 'No rules applied';
  };

  return (
    <div className="cp-container">
      <header className="cp-header">
        <h2>Advanced CSS Concepts</h2>
        <p>Explore Pseudo-classes, Pseudo-elements, and how the browser decides which styles "win".</p>
      </header>

      {/* --- Tab Navigation --- */}
      <div className="cp-tabs">
        <button 
          className={`cp-tab-btn ${activeTab === 'pseudo-classes' ? 'active' : ''}`}
          onClick={() => setActiveTab('pseudo-classes')}
        >
          Pseudo-Classes
        </button>
        <button 
          className={`cp-tab-btn ${activeTab === 'pseudo-elements' ? 'active' : ''}`}
          onClick={() => setActiveTab('pseudo-elements')}
        >
          Pseudo-Elements
        </button>
        <button 
          className={`cp-tab-btn ${activeTab === 'cascade' ? 'active' : ''}`}
          onClick={() => setActiveTab('cascade')}
        >
          Cascade & Inheritance
        </button>
      </div>

      <div className="cp-content">
        
        {/* ================= PSEUDO-CLASSES TAB ================= */}
        {activeTab === 'pseudo-classes' && (
          <div className="cp-section fadeIn">
            <h3>1. Interactive States</h3>
            <div className="cp-demo-row">
              {/* Hover & Active */}
              <div className="cp-card">
                <h4>:hover & :active</h4>
                <p className="cp-desc">Hover or click the button below.</p>
                <button className="cp-interactive-btn">Hover Me / Click Me</button>
                <div className="cp-code-mini">
                  <code>button:hover &#123; bg: orange; &#125;</code><br/>
                  <code>button:active &#123; scale: 0.95; &#125;</code>
                </div>
              </div>

              {/* Checked */}
              <div className="cp-card">
                <h4>:checked</h4>
                <p className="cp-desc">Toggle the checkbox.</p>
                <label className="cp-checkbox-label">
                  <input type="checkbox" className="cp-checkbox" />
                  <span>Enable Mode</span>
                </label>
                <div className="cp-code-mini">
                  <code>input:checked &#123; border: green; &#125;</code>
                </div>
              </div>
            </div>

            <h3>2. Structural Selectors (:nth-of-type)</h3>
            <div className="cp-card full-width">
              <div className="cp-controls-row">
                <button 
                  className={`cp-toggle ${nthMode === 'none' ? 'active' : ''}`} 
                  onClick={() => setNthMode('none')}
                >
                  Reset
                </button>
                <button 
                  className={`cp-toggle ${nthMode === '2' ? 'active' : ''}`} 
                  onClick={() => setNthMode('2')}
                >
                  :nth-of-type(2)
                </button>
                <button 
                  className={`cp-toggle ${nthMode === '2n' ? 'active' : ''}`} 
                  onClick={() => setNthMode('2n')}
                >
                  :nth-of-type(2n)
                </button>
              </div>

              <div className={`cp-flex-container mode-${nthMode}`}>
                <div className="cp-box">1</div>
                <div className="cp-box">2</div>
                <div className="cp-box">3</div>
                <div className="cp-box">4</div>
                <div className="cp-box">5</div>
              </div>
              <p className="cp-hint">
                {nthMode === '2' && "Selects strictly the 2nd item."}
                {nthMode === '2n' && "Selects every 2nd item (Evens: 2, 4, 6...)."}
                {nthMode === 'none' && "No selection applied."}
              </p>
            </div>
          </div>
        )}

        {/* ================= PSEUDO-ELEMENTS TAB ================= */}
        {activeTab === 'pseudo-elements' && (
          <div className="cp-section fadeIn">
            <div className="cp-card full-width">
              <h3>::first-letter & ::first-line</h3>
              <p className="cp-desc">CSS can style specific parts of the text automatically.</p>
              
              <div className="cp-pseudo-text-demo">
                <h1>Once upon a time...</h1>
                <p>
                  This is a paragraph demonstrating pseudo-elements. The first line of this text 
                  is colored pink because of the ::first-line pseudo-element rule. 
                  Notice how it adapts if you resize the window!
                </p>
              </div>

              <div className="cp-code-block">
                <span className="cp-comment">/* Styles applied above */</span><br/>
                h1::first-letter &#123; color: green; font-size: 3em; &#125;<br/>
                p::first-line &#123; color: pink; font-weight: bold; &#125;
              </div>
            </div>

            <div className="cp-card full-width">
              <h3>::selection</h3>
              <p className="cp-desc">Highlight the text below with your mouse/cursor.</p>
              <div className="cp-selection-demo">
                Select this text to see the custom background color! 
                Standard selection is blue, but we made this limegreen.
              </div>
               <div className="cp-code-mini" style={{marginTop: '15px'}}>
                  <code>p::selection &#123; background-color: limegreen; &#125;</code>
                </div>
            </div>
          </div>
        )}

        {/* ================= CASCADE TAB ================= */}
        {activeTab === 'cascade' && (
          <div className="cp-section fadeIn">
            <h3>1. Specificity Wars</h3>
            <p className="cp-desc">
              Toggle the rules below. The browser applies the rule with the <strong>highest specificity score</strong>.
            </p>

            <div className="cp-specificity-game">
              {/* Controls */}
              <div className="cp-game-controls">
                <label className="cp-control-item">
                  <input type="checkbox" checked={useElement} onChange={() => setUseElement(!useElement)} />
                  <span className="cp-tag element">Element (Score: 1)</span>
                  <code>div &#123; bg: red; &#125;</code>
                </label>
                
                <label className="cp-control-item">
                  <input type="checkbox" checked={useClass} onChange={() => setUseClass(!useClass)} />
                  <span className="cp-tag class">Class (Score: 10)</span>
                  <code>.my-box &#123; bg: blue; &#125;</code>
                </label>

                <label className="cp-control-item">
                  <input type="checkbox" checked={useId} onChange={() => setUseId(!useId)} />
                  <span className="cp-tag id">ID (Score: 100)</span>
                  <code>#my-box &#123; bg: green; &#125;</code>
                </label>

                <label className="cp-control-item">
                  <input type="checkbox" checked={useImportant} onChange={() => setUseImportant(!useImportant)} />
                  <span className="cp-tag important">!important (Nuclear)</span>
                  <code>bg: purple !important;</code>
                </label>
              </div>

              {/* Output */}
              <div className="cp-game-output">
                <div 
                  className="cp-target-box"
                  style={{ backgroundColor: getWinningColor() }}
                >
                  I am the Target
                </div>
                <div className="cp-winner-label">
                  Winning Rule:<br/>
                  <strong>{getWinningSource()}</strong>
                </div>
              </div>
            </div>

            <h3>2. Inheritance</h3>
            <div className="cp-inheritance-demo">
              <div className="cp-controls-row">
                 <button onClick={() => setParentColor(parentColor === 'black' ? 'blue' : 'black')}>
                   Toggle Parent Color ({parentColor})
                 </button>
                 <button onClick={() => setParentBorder(!parentBorder)}>
                   Toggle Parent Border ({parentBorder ? 'ON' : 'OFF'})
                 </button>
              </div>

              <div 
                className="cp-parent" 
                style={{ 
                  color: parentColor, 
                  border: parentBorder ? '5px solid #333' : '1px dashed #ccc' 
                }}
              >
                <strong>Parent Element</strong>
                <div className="cp-child">
                  <strong>Child Element</strong>
                  <p>
                    I inherited <code>color: {parentColor}</code> automatically.<br/>
                    I did {parentBorder ? 'NOT' : ''} inherit the border.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default CssAdvancedVisualizer;