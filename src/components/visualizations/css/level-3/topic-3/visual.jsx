import React, { useState, useRef, useEffect } from 'react';
import './visual.css';

const CssMasterVisualizer = () => {
  const [activeTab, setActiveTab] = useState('grid');

  // --- GRID STATE ---
  const [gridCols, setGridCols] = useState(3);
  const [gridRows, setGridRows] = useState(3);
  const [gridGap, setGridGap] = useState(10);
  const [gridItems, setGridItems] = useState([
    { id: 1, colStart: 'auto', colEnd: 'auto', rowStart: 'auto', rowEnd: 'auto' },
    { id: 2, colStart: 'auto', colEnd: 'auto', rowStart: 'auto', rowEnd: 'auto' },
    { id: 3, colStart: 'auto', colEnd: 'auto', rowStart: 'auto', rowEnd: 'auto' },
    { id: 4, colStart: 'auto', colEnd: 'auto', rowStart: 'auto', rowEnd: 'auto' },
    { id: 5, colStart: 'auto', colEnd: 'auto', rowStart: 'auto', rowEnd: 'auto' },
  ]);
  const [selectedGridId, setSelectedGridId] = useState(null);

  // --- ANIMATION STATE ---
  const [animType, setAnimType] = useState('grow');
  const [animDuration, setAnimDuration] = useState(2);
  const [animTiming, setAnimTiming] = useState('linear');
  const [animIteration, setAnimIteration] = useState('infinite');
  const [isAnimating, setIsAnimating] = useState(true);

  // --- MEDIA QUERY STATE ---
  const [viewportWidth, setViewportWidth] = useState(350);

  // --- Z-INDEX STATE ---
  const [cards, setCards] = useState([
    { id: 1, color: '#ff7675', zIndex: 1, position: 'absolute', top: 20, left: 20, label: 'Red' },
    { id: 2, color: '#74b9ff', zIndex: 2, position: 'absolute', top: 50, left: 50, label: 'Blue' },
    { id: 3, color: '#55efc4', zIndex: 3, position: 'absolute', top: 80, left: 80, label: 'Green' }
  ]);
  const [selectedCardId, setSelectedCardId] = useState(1);

  // --- GRID HANDLERS ---
  const updateGridItem = (prop, value) => {
    if (!selectedGridId) return;
    setGridItems(prev => prev.map(item => 
      item.id === selectedGridId ? { ...item, [prop]: value } : item
    ));
  };

  // --- Z-INDEX HANDLERS ---
  const updateCard = (prop, value) => {
    setCards(prev => prev.map(c => c.id === selectedCardId ? { ...c, [prop]: value } : c));
  };

  return (
    <div className="cmv-container">
      <header className="cmv-header">
        <h2>CSS Layout & Effects Master</h2>
        <p>Interactive playground for Grid, Animations, Media Queries, and more.</p>
      </header>

      {/* --- TABS --- */}
      <div className="cmv-tabs">
        {['grid', 'animation', 'media', 'z-index', 'icons'].map(tab => (
          <button
            key={tab}
            className={`cmv-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="cmv-content">
        
        {/* ==================== TAB 1: CSS GRID ==================== */}
        {activeTab === 'grid' && (
          <div className="cmv-section fadeIn">
            <div className="cmv-split-layout">
              {/* Controls */}
              <div className="cmv-controls-panel">
                <h3>Container Settings</h3>
                <div className="cmv-control-group">
                  <label>Columns (repeat): {gridCols}</label>
                  <input type="range" min="1" max="6" value={gridCols} onChange={e => setGridCols(Number(e.target.value))} />
                </div>
                <div className="cmv-control-group">
                  <label>Rows (repeat): {gridRows}</label>
                  <input type="range" min="1" max="6" value={gridRows} onChange={e => setGridRows(Number(e.target.value))} />
                </div>
                <div className="cmv-control-group">
                  <label>Gap: {gridGap}px</label>
                  <input type="range" min="0" max="30" value={gridGap} onChange={e => setGridGap(Number(e.target.value))} />
                </div>

                <hr className="cmv-divider"/>

                <h3>Item Settings</h3>
                {selectedGridId ? (
                  <>
                    <div className="cmv-tag selected">Editing Item #{selectedGridId}</div>
                    <div className="cmv-grid-inputs">
                      <div className="cmv-input-pair">
                        <label>Column Start</label>
                        <input type="text" value={gridItems.find(i=>i.id===selectedGridId).colStart} onChange={e => updateGridItem('colStart', e.target.value)} />
                      </div>
                      <div className="cmv-input-pair">
                        <label>Column End</label>
                        <input type="text" value={gridItems.find(i=>i.id===selectedGridId).colEnd} onChange={e => updateGridItem('colEnd', e.target.value)} />
                      </div>
                      <div className="cmv-input-pair">
                        <label>Row Start</label>
                        <input type="text" value={gridItems.find(i=>i.id===selectedGridId).rowStart} onChange={e => updateGridItem('rowStart', e.target.value)} />
                      </div>
                      <div className="cmv-input-pair">
                        <label>Row End</label>
                        <input type="text" value={gridItems.find(i=>i.id===selectedGridId).rowEnd} onChange={e => updateGridItem('rowEnd', e.target.value)} />
                      </div>
                    </div>
                    <p className="cmv-hint">Tip: Use numbers (1, 2) or "span 2".</p>
                  </>
                ) : (
                  <p className="cmv-empty-msg">Click a numbered box to edit its position.</p>
                )}
              </div>

              {/* Visual Grid */}
              <div className="cmv-stage grid-stage">
                <div 
                  className="cmv-grid-container"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                    gridTemplateRows: `repeat(${gridRows}, 1fr)`,
                    gap: `${gridGap}px`
                  }}
                >
                  {/* Grid Track Lines (Visual Guide) */}
                  <div className="cmv-grid-overlay" style={{
                    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                    gridTemplateRows: `repeat(${gridRows}, 1fr)`,
                    gap: `${gridGap}px`
                  }}>
                    {Array.from({length: gridCols * gridRows}).map((_, i) => <div key={i} className="cmv-cell-guide"></div>)}
                  </div>

                  {gridItems.map(item => (
                    <div 
                      key={item.id}
                      className={`cmv-grid-item ${selectedGridId === item.id ? 'selected' : ''}`}
                      onClick={() => setSelectedGridId(item.id)}
                      style={{
                        gridColumnStart: item.colStart,
                        gridColumnEnd: item.colEnd,
                        gridRowStart: item.rowStart,
                        gridRowEnd: item.rowEnd
                      }}
                    >
                      {item.id}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: ANIMATIONS ================= */}
        {activeTab === 'animation' && (
          <div className="cmv-section fadeIn">
            <div className="cmv-anim-layout">
              <div className="cmv-controls-panel">
                <h3>Keyframe Controls</h3>
                <div className="cmv-control-group">
                  <label>Animation Name</label>
                  <select value={animType} onChange={e => setAnimType(e.target.value)}>
                    <option value="grow">Grow (Font/Size)</option>
                    <option value="bounce">Bounce (Movement)</option>
                    <option value="spin">Spin (Rotate)</option>
                    <option value="fade">Fade (Opacity)</option>
                  </select>
                </div>
                <div className="cmv-control-group">
                  <label>Duration: {animDuration}s</label>
                  <input type="range" min="0.5" max="5" step="0.5" value={animDuration} onChange={e => setAnimDuration(e.target.value)} />
                </div>
                <div className="cmv-control-group">
                  <label>Timing Function</label>
                  <select value={animTiming} onChange={e => setAnimTiming(e.target.value)}>
                    <option value="linear">Linear</option>
                    <option value="ease">Ease</option>
                    <option value="ease-in-out">Ease-In-Out</option>
                    <option value="steps(5)">Steps(5)</option>
                  </select>
                </div>
                <button className="cmv-action-btn" onClick={() => setIsAnimating(!isAnimating)}>
                  {isAnimating ? '⏸ Pause' : '▶ Play'}
                </button>
              </div>

              <div className="cmv-stage anim-stage">
                <div 
                  className={`cmv-anim-box ${animType}`}
                  style={{
                    animationDuration: `${animDuration}s`,
                    animationTimingFunction: animTiming,
                    animationIterationCount: animIteration,
                    animationPlayState: isAnimating ? 'running' : 'paused'
                  }}
                >
                  Animate Me!
                </div>
                
                <div className="cmv-code-block">
                  <code>
                    @keyframes {animType} &#123; ... &#125;<br/>
                    .box &#123;<br/>
                    &nbsp;&nbsp;animation: {animType} {animDuration}s {animTiming} {animIteration};<br/>
                    &#125;
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: MEDIA QUERIES ================= */}
        {activeTab === 'media' && (
          <div className="cmv-section fadeIn">
             <div className="cmv-media-demo">
               <div className="cmv-slider-wrapper">
                  <label>Viewport Width Simulator: <strong>{viewportWidth}px</strong></label>
                  <input 
                    type="range" min="200" max="800" value={viewportWidth} 
                    onChange={e => setViewportWidth(Number(e.target.value))} 
                    className="cmv-width-slider"
                  />
                  <div className="cmv-breakpoints">
                     <span onClick={() => setViewportWidth(300)}>📱 Mobile</span>
                     <span onClick={() => setViewportWidth(500)}>📟 Tablet</span>
                     <span onClick={() => setViewportWidth(700)}>💻 Desktop</span>
                  </div>
               </div>

               <div 
                 className="cmv-resizable-viewport"
                 style={{ width: `${viewportWidth}px` }}
               >
                 <div className={`cmv-media-content ${
                    viewportWidth < 400 ? 'mobile' : 
                    viewportWidth < 600 ? 'tablet' : 'desktop'
                 }`}>
                    <h3>
                      {viewportWidth < 400 ? 'Mobile Layout' : 
                       viewportWidth < 600 ? 'Tablet Layout' : 'Desktop Layout'}
                    </h3>
                    <p>
                      {viewportWidth < 400 ? 'Background is Red. Width < 400px' : 
                       viewportWidth < 600 ? 'Background is Yellow. Width < 600px' : 'Background is Green. Width > 600px'}
                    </p>
                    <div className="cmv-responsive-grid">
                      <div className="box">1</div>
                      <div className="box">2</div>
                      <div className="box">3</div>
                    </div>
                 </div>
               </div>

               <div className="cmv-code-block">
                 {viewportWidth < 400 && <code>@media (max-width: 400px) &#123; bg: red; flex-direction: column; &#125;</code>}
                 {viewportWidth >= 400 && viewportWidth < 600 && <code>@media (min-width: 400px) and (max-width: 600px) &#123; bg: yellow; &#125;</code>}
                 {viewportWidth >= 600 && <code>@media (min-width: 600px) &#123; bg: green; flex-direction: row; &#125;</code>}
               </div>
             </div>
          </div>
        )}

        {/* ================= TAB 4: Z-INDEX ================= */}
        {activeTab === 'z-index' && (
          <div className="cmv-section fadeIn">
            <div className="cmv-split-layout">
              <div className="cmv-controls-panel">
                <h3>Layer Controls</h3>
                <div className="cmv-card-selector">
                  {cards.map(c => (
                    <button 
                      key={c.id}
                      className={selectedCardId === c.id ? 'active' : ''}
                      onClick={() => setSelectedCardId(c.id)}
                      style={{ borderLeft: `5px solid ${c.color}` }}
                    >
                      {c.label} Card
                    </button>
                  ))}
                </div>

                <div className="cmv-control-group">
                  <label>Z-Index: {cards.find(c=>c.id===selectedCardId).zIndex}</label>
                  <input 
                    type="range" min="-1" max="10" 
                    value={cards.find(c=>c.id===selectedCardId).zIndex} 
                    onChange={e => updateCard('zIndex', Number(e.target.value))} 
                  />
                </div>

                <div className="cmv-control-group">
                   <label>Position Type</label>
                   <select 
                      value={cards.find(c=>c.id===selectedCardId).position} 
                      onChange={e => updateCard('position', e.target.value)}
                   >
                     <option value="absolute">Absolute (Works)</option>
                     <option value="relative">Relative (Works)</option>
                     <option value="fixed">Fixed (Works)</option>
                     <option value="static">Static (BROKEN)</option>
                   </select>
                   {cards.find(c=>c.id===selectedCardId).position === 'static' && 
                      <p className="cmv-error">⚠️ Z-Index does not work with position: static!</p>
                   }
                </div>
              </div>

              <div className="cmv-stage z-index-stage">
                <div className="cmv-layers-container">
                   {cards.map(c => (
                     <div 
                       key={c.id}
                       className="cmv-layer-card"
                       style={{
                         backgroundColor: c.color,
                         zIndex: c.zIndex,
                         position: c.position,
                         top: `${c.top}px`,
                         left: `${c.left}px`,
                         boxShadow: c.id === selectedCardId ? '0 0 0 4px #2d3436' : '0 4px 10px rgba(0,0,0,0.2)'
                       }}
                       onClick={() => setSelectedCardId(c.id)}
                     >
                       <strong>{c.label}</strong><br/>
                       z-index: {c.zIndex}<br/>
                       {c.position}
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: ICONS ================= */}
        {activeTab === 'icons' && (
          <div className="cmv-section fadeIn">
            <div className="cmv-icons-gallery">
              <h3>Font Awesome Examples</h3>
              <p>Scalable vector icons used via class names.</p>
              
              <div className="cmv-icon-grid">
                <div className="cmv-icon-card">
                  <i className="fa-icon">♥</i> {/* Simulated FontAwesome */}
                  <code>&lt;i class="fa-solid fa-heart"&gt;&lt;/i&gt;</code>
                </div>
                <div className="cmv-icon-card">
                  <i className="fa-icon">★</i>
                  <code>&lt;i class="fa-solid fa-star"&gt;&lt;/i&gt;</code>
                </div>
                <div className="cmv-icon-card">
                  <i className="fa-icon">🔍</i>
                  <code>&lt;i class="fa-solid fa-search"&gt;&lt;/i&gt;</code>
                </div>
                <div className="cmv-icon-card">
                  <i className="fa-icon">🏠</i>
                  <code>&lt;i class="fa-solid fa-home"&gt;&lt;/i&gt;</code>
                </div>
              </div>
              
              <div className="cmv-alert-box">
                <strong>How to use:</strong> Add the CDN link to your <code>&lt;head&gt;</code>, then use the class names above inside your body.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CssMasterVisualizer;