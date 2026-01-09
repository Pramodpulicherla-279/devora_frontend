import React, { useState } from 'react';
import './visual.css';

const HtmlListsVisualizer = () => {
    const [activeTab, setActiveTab] = useState('ul');

    // State for Ordered List controls
    const [olType, setOlType] = useState('1');
    const [olStart, setOlStart] = useState(1);

    // State for Unordered List controls (CSS style)
    const [ulStyle, setUlStyle] = useState('disc');

    // Helper to generate the code string based on current state
    const getCodeSnippet = () => {
        if (activeTab === 'ul') {
            const styleAttr = ulStyle !== 'disc' ? ` style="list-style-type: ${ulStyle};"` : '';
            return `<ul${styleAttr}>
  <li>Bread</li>
  <li>Butter</li>
  <li>Jam</li>
</ul>`;
        } else {
            const typeAttr = olType !== '1' ? ` type="${olType}"` : '';
            const startAttr = olStart !== 1 ? ` start="${olStart}"` : '';
            return `<ol${typeAttr}${startAttr}>
  <li>Bread</li>
  <li>Butter</li>
  <li>Jam</li>
</ol>`;
        }
    };

    return (
        <div className="hlv-container">
            <header className="hlv-header">
                <h2>HTML Lists Visualization</h2>
                <p>HTML provides two main ways to organize content: <strong>Unordered</strong> (bullets) and <strong>Ordered</strong> (numbered) lists.</p>
            </header>

            {/* --- Tab Navigation --- */}
            <div className="hlv-tabs">
                <button
                    className={`hlv-tab-btn ${activeTab === 'ul' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ul')}
                >
                    Unordered List (&lt;ul&gt;)
                </button>
                <button
                    className={`hlv-tab-btn ${activeTab === 'ol' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ol')}
                >
                    Ordered List (&lt;ol&gt;)
                </button>
            </div>

            {/* --- Main Content Area --- */}
            <div className="hlv-content-area">

                {/* --- Controls Section --- */}
                <div className="hlv-controls-panel">
                    <div className="hlv-description">
                        {activeTab === 'ul' ? (
                            <>
                                <p><strong>Unordered Lists</strong> use bullets. The order doesn't matter (like ingredients).</p>
                                <p className="hlv-note">💡 Try changing the bullet style (CSS):</p>
                                <div className="hlv-input-group">
                                    <label>List Style:</label>
                                    <select value={ulStyle} onChange={(e) => setUlStyle(e.target.value)}>
                                        <option value="disc">Disc (Default)</option>
                                        <option value="circle">Circle</option>
                                        <option value="square">Square</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </>
                        ) : (
                            <>
                                <p><strong>Ordered Lists</strong> use numbers or letters. The sequence matters (like steps in a recipe).</p>
                                <div className="hlv-control-row">
                                    <div className="hlv-input-group">
                                        <label>Type Attribute:</label>
                                        <select value={olType} onChange={(e) => setOlType(e.target.value)}>
                                            <option value="1">1, 2, 3 (Default)</option>
                                            <option value="a">a, b, c</option>
                                            <option value="A">A, B, C</option>
                                            <option value="i">i, ii, iii</option>
                                            <option value="I">I, II, III</option>
                                        </select>
                                    </div>
                                    <div className="hlv-input-group">
                                        <label>Start Attribute:</label>
                                        <input
                                            type="number"
                                            value={olStart}
                                            onChange={(e) => setOlStart(parseInt(e.target.value) || 1)}
                                            min="1"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* --- Visualization Split View --- */}
                <div className="hlv-visual-split">

                    {/* Code Panel */}
                    <div className="hlv-panel hlv-code-panel">
                        <div className="hlv-panel-header">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                            <span>HTML Code</span>
                        </div>
                        <pre><code>{getCodeSnippet()}</code></pre>
                    </div>

                    {/* Preview Panel */}
                    <div className="hlv-panel hlv-preview-panel">
                        <div className="hlv-panel-header">
                            <span>Browser Output</span>
                        </div>
                        <div className="hlv-preview-content">
                            {activeTab === 'ul' ? (
                                <ul style={{ listStyleType: ulStyle }}>
                                    <li>Bread</li>
                                    <li>Butter</li>
                                    <li>Jam</li>
                                </ul>
                            ) : (
                                <ol type={olType} start={olStart}>
                                    <li>Bread</li>
                                    <li>Butter</li>
                                    <li>Jam</li>
                                </ol>
                            )}
                        </div>
                    </div>

                </div>

                {/* --- Educational Note Footer --- */}
                <div className="hlv-footer-note">
                    {activeTab === 'ul' ? (
                        <p>ℹ️ Inside <code>&lt;li&gt;</code> tags, you can also put images, links, or even other lists!</p>
                    ) : (
                        <p>ℹ️ The <code>start</code> attribute is great for continuing a list that was interrupted by other content.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default HtmlListsVisualizer;