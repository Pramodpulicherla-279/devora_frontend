import React, { useState } from 'react';
import './visual.css';

const CssEffectsVisualizer = () => {
  const [activeTab, setActiveTab] = useState('opacity');

  // --- STATE: Alpha & Opacity ---
  const [alphaVal, setAlphaVal] = useState(0.5);
  const [opacityVal, setOpacityVal] = useState(0.5);

  // --- STATE: Transforms & Transitions ---
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [skew, setSkew] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // Simulates hover state

  // --- STATE: Box Shadow & Background ---
  const [shadowX, setShadowX] = useState(5);
  const [shadowY, setShadowY] = useState(5);
  const [shadowBlur, setShadowBlur] = useState(10);
  const [bgSize, setBgSize] = useState('cover');

  // --- STATE: Positioning ---
  const [positionType, setPositionType] = useState('static');
  const [topVal, setTopVal] = useState(20);
  const [leftVal, setLeftVal] = useState(20);

  // --- Helpers ---
  const getTransformString = () => {
    return `rotate(${rotate}deg) scale(${scale}) translate(${translateX}px, 0px) skew(${skew}deg)`;
  };

  const getShadowString = () => {
    return `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,0.5)`;
  };

  return (
    <div className="cev-container">
      <header className="cev-header">
        <h2>CSS Effects & Layout Visualizer</h2>
        <p>Master transparency, animations, styling, and positioning.</p>
      </header>

      {/* TABS */}
      <div className="cev-tabs">
        {['opacity', 'transform', 'styling', 'position'].map((tab) => (
          <button
            key={tab}
            className={`cev-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'opacity' && 'Alpha vs Opacity'}
            {tab === 'transform' && 'Transforms'}
            {tab === 'styling' && 'Shadows & BG'}
            {tab === 'position' && 'Positioning'}
          </button>
        ))}
      </div>

      <div className="cev-content">
        
        {/* ================= TAB 1: ALPHA & OPACITY ================= */}
        {activeTab === 'opacity' && (
          <div className="cev-section fadeIn">
            <div className="cev-split-card">
              
              {/* Alpha Demo */}
              <div className="cev-card">
                <h3>Alpha (RGBA)</h3>
                <p>Affects only the background color.</p>
                <div 
                  className="cev-box alpha-box" 
                  style={{ backgroundColor: `rgba(52, 152, 219, ${alphaVal})` }}
                >
                  <span className="cev-text-content">Text stays solid</span>
                </div>
                <div className="cev-controls">
                  <label>Alpha Value: {alphaVal}</label>
                  <input type="range" min="0" max="1" step="0.1" value={alphaVal} onChange={(e) => setAlphaVal(e.target.value)} />
                  <code className="cev-code">bg-color: rgba(52, 152, 219, {alphaVal});</code>
                </div>
              </div>

              {/* Opacity Demo */}
              <div className="cev-card">
                <h3>Opacity Property</h3>
                <p>Affects the whole element (and children).</p>
                <div 
                  className="cev-box opacity-box" 
                  style={{ opacity: opacityVal, backgroundColor: '#e74c3c' }}
                >
                  <span className="cev-text-content">Text fades too!</span>
                </div>
                <div className="cev-controls">
                  <label>Opacity Value: {opacityVal}</label>
                  <input type="range" min="0" max="1" step="0.1" value={opacityVal} onChange={(e) => setOpacityVal(e.target.value)} />
                  <code className="cev-code">opacity: {opacityVal};</code>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 2: TRANSFORMS ================= */}
        {activeTab === 'transform' && (
          <div className="cev-section fadeIn">
            <div className="cev-transform-layout">
              <div className="cev-controls-panel">
                <h4>Transform Properties</h4>
                
                <div className="cev-control-group">
                  <label>Rotate ({rotate}deg)</label>
                  <input type="range" min="0" max="360" value={rotate} onChange={(e) => setRotate(e.target.value)} />
                </div>
                <div className="cev-control-group">
                  <label>Scale ({scale})</label>
                  <input type="range" min="0.5" max="2" step="0.1" value={scale} onChange={(e) => setScale(e.target.value)} />
                </div>
                <div className="cev-control-group">
                  <label>Translate X ({translateX}px)</label>
                  <input type="range" min="-100" max="100" value={translateX} onChange={(e) => setTranslateX(e.target.value)} />
                </div>
                <div className="cev-control-group">
                  <label>Skew ({skew}deg)</label>
                  <input type="range" min="-45" max="45" value={skew} onChange={(e) => setSkew(e.target.value)} />
                </div>

                {/* <div className="cev-hover-trigger">
                    <label>
                        <input type="checkbox" checked={isHovered} onChange={() => setIsHovered(!isHovered)} />
                        Simulate Hover State (Trigger Transition)
                    </label>
                </div> */}
              </div>

              <div className="cev-visual-stage">
                <div 
                  className={`cev-transform-box ${isHovered ? 'hover-active' : ''}`}
                  style={{ 
                      // If hover simulation is off, apply manual transforms. 
                      // If on, let CSS class handle it (concept demo) or apply manual to show transition
                      transform: getTransformString(),
                      transition: 'transform 0.5s ease-in-out'
                  }}
                >
                  Transform Me
                </div>
              </div>
                 <code className="cev-code-block">
                  transform: {getTransformString()};<br/>
                  transition: transform 0.5s ease-in-out;
                </code>
            </div>
          </div>
        )}

        {/* ================= TAB 3: STYLING (Shadow & BG) ================= */}
        {activeTab === 'styling' && (
          <div className="cev-section fadeIn">
             <div className="cev-split-card">
                {/* Box Shadow */}
                <div className="cev-card">
                    <h3>Box Shadow</h3>
                    <div 
                        className="cev-box shadow-demo-box"
                        style={{ boxShadow: getShadowString() }}
                    >
                        Card
                    </div>
                    <div className="cev-controls">
                        <label>X Offset: {shadowX}px</label>
                        <input type="range" min="-20" max="20" value={shadowX} onChange={(e) => setShadowX(e.target.value)} />
                        <label>Y Offset: {shadowY}px</label>
                        <input type="range" min="-20" max="20" value={shadowY} onChange={(e) => setShadowY(e.target.value)} />
                        <label>Blur Radius: {shadowBlur}px</label>
                        <input type="range" min="0" max="30" value={shadowBlur} onChange={(e) => setShadowBlur(e.target.value)} />
                        <code className="cev-code">box-shadow: {getShadowString()};</code>
                    </div>
                </div>

                {/* Background Image */}
                <div className="cev-card">
                    <h3>Background Size</h3>
                    <div 
                        className="cev-box bg-demo-box"
                        style={{ 
                            backgroundImage: 'url("https://picsum.photos/300/200")',
                            backgroundSize: bgSize,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        Image Box
                    </div>
                    <div className="cev-btn-group">
                        {['cover', 'contain', 'auto'].map(size => (
                            <button 
                                key={size}
                                className={bgSize === size ? 'active' : ''}
                                onClick={() => setBgSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    <p className="cev-hint">
                        {bgSize === 'cover' && "Crops image to fill box."}
                        {bgSize === 'contain' && "Fits entire image inside."}
                        {bgSize === 'auto' && "Default image size."}
                    </p>
                </div>
             </div>
          </div>
        )}

        {/* ================= TAB 4: POSITIONING ================= */}
        {activeTab === 'position' && (
          <div className="cev-section fadeIn">
            <div className="cev-position-layout">
                <div className="cev-controls-panel">
                    <h4>Position Property</h4>
                    <div className="cev-btn-group vertical">
                        {['static', 'relative', 'absolute', 'fixed'].map(pos => (
                            <button 
                                key={pos}
                                className={positionType === pos ? 'active' : ''}
                                onClick={() => setPositionType(pos)}
                            >
                                {pos}
                            </button>
                        ))}
                    </div>
                    
                    {positionType !== 'static' && (
                        <>
                            <div className="cev-control-group">
                                <label>Top: {topVal}px</label>
                                <input type="range" min="0" max="150" value={topVal} onChange={(e) => setTopVal(e.target.value)} />
                            </div>
                            <div className="cev-control-group">
                                <label>Left: {leftVal}px</label>
                                <input type="range" min="0" max="150" value={leftVal} onChange={(e) => setLeftVal(e.target.value)} />
                            </div>
                        </>
                    )}
                </div>

                <div className="cev-browser-mockup">
                    <div className="cev-browser-header">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                        <span>Browser Window (Scrollable)</span>
                    </div>
                    <div className="cev-browser-body">
                        <div className="cev-doc-flow">
                            <div className="cev-block grey">Normal Element</div>
                            
                            {/* The Parent Container */}
                            <div className="cev-position-parent">
                                <span className="cev-label-light">Parent (Relative)</span>
                                
                                {/* The Target Element */}
                                <div 
                                    className={`cev-target-element ${positionType}`}
                                    style={{ 
                                        position: positionType,
                                        top: positionType === 'static' ? 'auto' : `${topVal}px`,
                                        left: positionType === 'static' ? 'auto' : `${leftVal}px`,
                                    }}
                                >
                                    <strong>Target</strong><br/>
                                    {positionType}
                                </div>

                                <div className="cev-block ghost">Ghost (Where I was)</div>
                            </div>
                            
                            <div className="cev-block grey">Normal Element</div>
                            <div className="cev-block grey">Normal Element</div>
                            <div className="cev-block grey">Normal Element</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cev-footer-note">
                {positionType === 'static' && "Static: Default. Top/Left have no effect."}
                {positionType === 'relative' && "Relative: Moves relative to its normal position. Gap remains."}
                {positionType === 'absolute' && "Absolute: Removed from flow. Positioned relative to Parent."}
                {positionType === 'fixed' && "Fixed: Removed from flow. Stays on screen when scrolling."}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CssEffectsVisualizer;