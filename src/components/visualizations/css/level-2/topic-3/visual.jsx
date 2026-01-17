import React, { useState } from 'react';
import './visual.css';

const CssBoxModelVisualizer = () => {
  const [activeTab, setActiveTab] = useState('box-model');

  // --- State for Box Model ---
  const [margin, setMargin] = useState(20);
  const [padding, setPadding] = useState(20);
  const [border, setBorder] = useState(10);
  const [width, setWidth] = useState(150);
  
  // --- State for Display Property ---
  const [displayType, setDisplayType] = useState('block');

  // --- State for Units ---
  const [rootSize, setRootSize] = useState(16); // Default 16px
  const [parentSize, setParentSize] = useState(20); // Parent font size

  return (
    <div className="cbv-container">
      <header className="cbv-header">
        <h2>CSS Layout & Box Model</h2>
        <p>Master the fundamental building blocks of web layout.</p>
      </header>

      {/* --- Tab Navigation --- */}
      <div className="cbv-tabs">
        <button 
          className={`cbv-tab-btn ${activeTab === 'box-model' ? 'active' : ''}`}
          onClick={() => setActiveTab('box-model')}
        >
          The Box Model
        </button>
        <button 
          className={`cbv-tab-btn ${activeTab === 'display' ? 'active' : ''}`}
          onClick={() => setActiveTab('display')}
        >
          Display Property
        </button>
        <button 
          className={`cbv-tab-btn ${activeTab === 'units' ? 'active' : ''}`}
          onClick={() => setActiveTab('units')}
        >
          Units (px, em, rem)
        </button>
      </div>

      <div className="cbv-content">
        
        {/* ================= BOX MODEL TAB ================= */}
        {activeTab === 'box-model' && (
          <div className="cbv-section fadeIn">
            <div className="cbv-split-view">
              
              {/* Controls */}
              <div className="cbv-controls-panel">
                <h3>Adjust Values (px)</h3>
                
                <div className="cbv-control-group">
                  <label>Margin (Space outside): {margin}px</label>
                  <input type="range" min="0" max="50" value={margin} onChange={(e) => setMargin(Number(e.target.value))} className="cbv-slider margin-slider"/>
                </div>

                <div className="cbv-control-group">
                  <label>Border (Thickness): {border}px</label>
                  <input type="range" min="0" max="20" value={border} onChange={(e) => setBorder(Number(e.target.value))} className="cbv-slider border-slider"/>
                </div>

                <div className="cbv-control-group">
                  <label>Padding (Space inside): {padding}px</label>
                  <input type="range" min="0" max="50" value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="cbv-slider padding-slider"/>
                </div>

                <div className="cbv-control-group">
                  <label>Content Width: {width}px</label>
                  <input type="range" min="50" max="250" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="cbv-slider content-slider"/>
                </div>

                <div className="cbv-total-calc">
                  <strong>Total Element Width:</strong>
                  <span>{width} + {padding*2} + {border*2} = {width + (padding*2) + (border*2)}px</span>
                  <small>(Content + Padding + Border)</small>
                </div>
              </div>

              {/* Visualization */}
              <div className="cbv-visual-stage box-model-stage">
                <div className="cbv-box-wrapper" style={{ padding: margin, backgroundColor: '#f9e79f' }}>
                  <span className="cbv-label margin-label">Margin</span>
                  
                  <div className="cbv-box-border" style={{ padding: border, backgroundColor: '#f5b7b1' }}>
                    <span className="cbv-label border-label">Border</span>
                    
                    <div className="cbv-box-padding" style={{ padding: padding, backgroundColor: '#a9dfbf' }}>
                      <span className="cbv-label padding-label">Padding</span>
                      
                      <div className="cbv-box-content" style={{ width: width, height: 80, backgroundColor: '#aed6f1' }}>
                        <span className="cbv-label content-label">Content ({width}px)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= DISPLAY TAB ================= */}
        {activeTab === 'display' && (
          <div className="cbv-section fadeIn">
             <div className="cbv-display-controls">
                <button className={`cbv-toggle ${displayType === 'block' ? 'active' : ''}`} onClick={() => setDisplayType('block')}>Block</button>
                <button className={`cbv-toggle ${displayType === 'inline' ? 'active' : ''}`} onClick={() => setDisplayType('inline')}>Inline</button>
                <button className={`cbv-toggle ${displayType === 'inline-block' ? 'active' : ''}`} onClick={() => setDisplayType('inline-block')}>Inline-Block</button>
             </div>

             <div className="cbv-display-explanation">
                {displayType === 'block' && <p><strong>Block:</strong> Starts on a new line. Takes up full width available.</p>}
                {displayType === 'inline' && <p><strong>Inline:</strong> Sits on the same line. Width/Height properties are ignored.</p>}
                {displayType === 'inline-block' && <p><strong>Inline-Block:</strong> Sits on the same line, BUT respects width, height, margin, and padding.</p>}
             </div>

             <div className="cbv-display-demo">
                <span className="cbv-text-context">Before Text...</span>
                <div className={`cbv-display-box ${displayType}`}>Box 1</div>
                <div className={`cbv-display-box ${displayType}`}>Box 2</div>
                <div className={`cbv-display-box ${displayType}`}>Box 3</div>
                <span className="cbv-text-context">...After Text</span>
             </div>
          </div>
        )}

        {/* ================= UNITS TAB ================= */}
        {activeTab === 'units' && (
          <div className="cbv-section fadeIn">
            <div className="cbv-units-grid">
              
              {/* Controls */}
              <div className="cbv-unit-controls">
                <div className="cbv-control-group">
                  <label>Root HTML Font Size: <strong>{rootSize}px</strong></label>
                  <input type="range" min="10" max="24" value={rootSize} onChange={(e) => setRootSize(Number(e.target.value))} />
                  <p className="cbv-hint">Changing this affects REM units.</p>
                </div>

                <div className="cbv-control-group">
                  <label>Parent Container Font Size: <strong>{parentSize}px</strong></label>
                  <input type="range" min="10" max="30" value={parentSize} onChange={(e) => setParentSize(Number(e.target.value))} />
                  <p className="cbv-hint">Changing this affects EM units.</p>
                </div>
              </div>

              {/* Comparison */}
              <div className="cbv-units-demo">
                
                {/* REM Example */}
                <div className="cbv-unit-card">
                  <h4>2rem</h4>
                  <div className="cbv-unit-box" style={{ fontSize: `${2 * rootSize}px` }}>
                    Text Size
                  </div>
                  <p className="cbv-calc">2 × {rootSize} (Root) = <strong>{2 * rootSize}px</strong></p>
                </div>

                {/* EM Example */}
                <div className="cbv-unit-card" style={{ fontSize: `${parentSize}px` }}>
                  <h4>2em (Inside Parent)</h4>
                  <div className="cbv-unit-box" style={{ fontSize: '2em' }}>
                     Text Size
                  </div>
                  <p className="cbv-calc">2 × {parentSize} (Parent) = <strong>{2 * parentSize}px</strong></p>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CssBoxModelVisualizer;