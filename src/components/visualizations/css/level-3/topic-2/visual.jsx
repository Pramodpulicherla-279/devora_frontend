import React, { useState, useEffect } from 'react';
// import FlexboxLauncher from './launcher';
import './visual.css';

const FlexboxProVisualizer = () => {
  const [activeTab, setActiveTab] = useState('container');
  const [showGuides, setShowGuides] = useState(true);
  
  // --- Container State ---
  const [containerStyles, setContainerStyles] = useState({
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    alignContent: 'stretch',
    gap: '10px'
  });

  // --- Items State ---
  const [items, setItems] = useState([
    { id: 1, label: '1', styles: { flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' } },
    { id: 2, label: '2', styles: { flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' } },
    { id: 3, label: '3', styles: { flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' } },
  ]);

  const [selectedItemId, setSelectedItemId] = useState(null);

  // --- Actions ---
  const updateContainer = (prop, value) => {
    setContainerStyles(prev => ({ ...prev, [prop]: value }));
  };

  const updateItem = (prop, value) => {
    if (selectedItemId === null) return;
    setItems(prevItems => prevItems.map(item => 
      item.id === selectedItemId 
        ? { ...item, styles: { ...item.styles, [prop]: value } }
        : item
    ));
  };

  const addItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    setItems([...items, { id: newId, label: newId.toString(), styles: { flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' } }]);
  };

  const removeItem = () => {
    if (items.length === 0) return;
    const newItems = [...items];
    const removed = newItems.pop();
    setItems(newItems);
    if (selectedItemId === removed.id) setSelectedItemId(null);
  };

  // --- Presets ---
  const applyPreset = (type) => {
    switch (type) {
      case 'center':
        setContainerStyles({ ...containerStyles, justifyContent: 'center', alignItems: 'center' });
        break;
      case 'navbar':
        setContainerStyles({ ...containerStyles, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' });
        break;
      case 'sidebar':
        setContainerStyles({ ...containerStyles, flexDirection: 'row', alignItems: 'stretch' });
        setItems([
          { id: 1, label: 'Sidebar', styles: { flexGrow: 0, flexShrink: 0, flexBasis: '100px', alignSelf: 'auto' } },
          { id: 2, label: 'Content', styles: { flexGrow: 1, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' } }
        ]);
        break;
      default: break;
    }
  };

  // --- Helpers for Visualization ---
  const isRow = containerStyles.flexDirection.includes('row');
  const isReverse = containerStyles.flexDirection.includes('reverse');

  return (
    <div className="fb-pro-container">
      {/* <FlexboxLauncher/> */}
      <header className="fb-pro-header">
        <div className="header-content">
          <h2>Flexbox Architect</h2>
          <p>Interactive Layout Engine</p>
        </div>
        <div className="header-controls">
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={showGuides} 
              onChange={() => setShowGuides(!showGuides)} 
            />
            <span className="toggle-slider"></span>
            <span className="toggle-label">Show Axis Guides</span>
          </label>
        </div>
      </header>

      {/* --- Quick Presets Bar --- */}
      <div className="fb-presets-bar">
        <span>Quick Layouts:</span>
        <button onClick={() => applyPreset('center')}>🎯 Perfect Center</button>
        <button onClick={() => applyPreset('navbar')}>🧭 Navbar</button>
        <button onClick={() => applyPreset('sidebar')}>📑 Sidebar + Main</button>
        <button className="reset-btn" onClick={() => setItems([{id:1, label:'1', styles:{flexGrow:0, flexShrink:1, flexBasis:'auto', alignSelf:'auto'}}])}>↺ Reset Items</button>
      </div>

      <div className="fb-pro-workspace">
        
        {/* --- LEFT: Controls Panel --- */}
        <aside className="fb-pro-controls">
          <div className="tabs">
            <button 
              className={activeTab === 'container' ? 'active' : ''}
              onClick={() => setActiveTab('container')}
            >
              Container
            </button>
            <button 
              className={activeTab === 'item' ? 'active' : ''}
              onClick={() => setActiveTab('item')}
            >
              Selected Item {selectedItemId ? `#${selectedItemId}` : ''}
            </button>
          </div>

          <div className="controls-scroll-area">
            {activeTab === 'container' ? (
              <div className="control-group-stack">
                <div className="control-card">
                  <h4>Flex Direction (Main Axis)</h4>
                  <div className="icon-select-group">
                    {['row', 'row-reverse', 'column', 'column-reverse'].map(dir => (
                      <button 
                        key={dir}
                        className={containerStyles.flexDirection === dir ? 'selected' : ''}
                        onClick={() => updateContainer('flexDirection', dir)}
                        title={dir}
                      >
                        {dir.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="control-card">
                  <h4>Justify Content (Main Axis)</h4>
                  <select value={containerStyles.justifyContent} onChange={(e) => updateContainer('justifyContent', e.target.value)}>
                    <option value="flex-start">Flex Start</option>
                    <option value="flex-end">Flex End</option>
                    <option value="center">Center</option>
                    <option value="space-between">Space Between</option>
                    <option value="space-around">Space Around</option>
                    <option value="space-evenly">Space Evenly</option>
                  </select>
                </div>

                <div className="control-card">
                  <h4>Align Items (Cross Axis)</h4>
                  <select value={containerStyles.alignItems} onChange={(e) => updateContainer('alignItems', e.target.value)}>
                    <option value="stretch">Stretch</option>
                    <option value="flex-start">Flex Start</option>
                    <option value="flex-end">Flex End</option>
                    <option value="center">Center</option>
                    <option value="baseline">Baseline</option>
                  </select>
                </div>

                <div className="control-card">
                  <h4>Gap: {containerStyles.gap}</h4>
                  <input 
                    type="range" min="0" max="50" 
                    value={parseInt(containerStyles.gap)} 
                    onChange={(e) => updateContainer('gap', `${e.target.value}px`)} 
                  />
                </div>

                <div className="control-card">
                  <h4>Flex Wrap</h4>
                  <div className="radio-group">
                    {['nowrap', 'wrap', 'wrap-reverse'].map(wrap => (
                      <label key={wrap}>
                        <input 
                          type="radio" 
                          name="wrap" 
                          checked={containerStyles.flexWrap === wrap}
                          onChange={() => updateContainer('flexWrap', wrap)}
                        />
                        {wrap}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="item-actions">
                  <button className="add-btn" onClick={addItem}>+ Add Item</button>
                  <button className="remove-btn" onClick={removeItem}>- Remove</button>
                </div>
              </div>
            ) : (
              // ITEM CONTROLS
              <div className="control-group-stack">
                {!selectedItemId ? (
                  <div className="empty-selection">
                    <p>Select an item in the visualization to edit its properties.</p>
                  </div>
                ) : (
                  <>
                    <div className="control-card highlight">
                      <h4>Item #{selectedItemId} Properties</h4>
                    </div>

                    <div className="control-card">
                      <h4>Flex Grow: {items.find(i=>i.id===selectedItemId).styles.flexGrow}</h4>
                      <input 
                        type="range" min="0" max="5" step="1"
                        value={items.find(i=>i.id===selectedItemId).styles.flexGrow}
                        onChange={(e) => updateItem('flexGrow', parseInt(e.target.value))}
                      />
                      <p className="tiny-desc">How much extra space I take</p>
                    </div>

                    <div className="control-card">
                      <h4>Flex Shrink: {items.find(i=>i.id===selectedItemId).styles.flexShrink}</h4>
                      <input 
                        type="range" min="0" max="5" step="1"
                        value={items.find(i=>i.id===selectedItemId).styles.flexShrink}
                        onChange={(e) => updateItem('flexShrink', parseInt(e.target.value))}
                      />
                      <p className="tiny-desc">How much I shrink when crowded</p>
                    </div>

                    <div className="control-card">
                      <h4>Align Self</h4>
                      <select 
                        value={items.find(i=>i.id===selectedItemId).styles.alignSelf} 
                        onChange={(e) => updateItem('alignSelf', e.target.value)}
                      >
                        <option value="auto">Auto</option>
                        <option value="flex-start">Flex Start</option>
                        <option value="flex-end">Flex End</option>
                        <option value="center">Center</option>
                        <option value="stretch">Stretch</option>
                      </select>
                    </div>

                    <div className="control-card">
                       <h4>Flex Basis</h4>
                       <input 
                        type="text" 
                        className="text-input"
                        value={items.find(i=>i.id===selectedItemId).styles.flexBasis}
                        onChange={(e) => updateItem('flexBasis', e.target.value)}
                        placeholder="auto, 200px, 50%..."
                       />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* --- RIGHT: Visualization Stage --- */}
        <main className="fb-pro-stage">
          <div className="stage-wrapper">
            
            {/* Axis Guides Overlay */}
            {showGuides && (
              <div className={`axis-overlay ${containerStyles.flexDirection}`}>
                <div className="main-axis-arrow">
                  <span>Main Axis (Justify)</span>
                </div>
                <div className="cross-axis-arrow">
                  <span>Cross Axis (Align)</span>
                </div>
              </div>
            )}

            {/* Flex Container */}
            <div className="flex-container" style={containerStyles}>
              {items.map((item) => (
                <div 
                  key={item.id}
                  className={`flex-item ${selectedItemId === item.id ? 'selected' : ''}`}
                  style={item.styles}
                  onClick={() => {
                    setSelectedItemId(item.id);
                    setActiveTab('item');
                  }}
                >
                  <span className="item-label">{item.label}</span>
                  <div className="item-details">
                    {item.styles.flexGrow > 0 && <span>G:{item.styles.flexGrow} </span>}
                    {item.styles.flexShrink !== 1 && <span>S:{item.styles.flexShrink}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Output */}
          <div className="code-drawer">
             <code>
               <span className="selector">.container</span> &#123; <br/>
               &nbsp;&nbsp;display: flex; <br/>
               &nbsp;&nbsp;flex-direction: <span className="val">{containerStyles.flexDirection}</span>; <br/>
               &nbsp;&nbsp;justify-content: <span className="val">{containerStyles.justifyContent}</span>; <br/>
               &nbsp;&nbsp;align-items: <span className="val">{containerStyles.alignItems}</span>; <br/>
               &nbsp;&nbsp;gap: <span className="val">{containerStyles.gap}</span>; <br/>
               &#125;
             </code>
          </div>
        </main>

      </div>
    </div>
  );
};

export default FlexboxProVisualizer;