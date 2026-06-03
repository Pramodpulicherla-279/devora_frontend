/* Lesson: Webpack Core Concepts (entry/output/loaders/plugins)
 * Visual type: ILLUSTRATION
 * Reason: Webpack's mental model is 4 concepts wired in a flow — an annotated
 * entry → loaders → plugins → output diagram is the canonical way to teach it. */
import React, { useState } from 'react';
import './visual.css';

const CONCEPTS = {
  entry: { icon: '🚪', label: 'Entry', d: 'The starting file(s). Webpack walks the import graph from here.', code: "entry: './src/index.js'" },
  loaders: { icon: '🔧', label: 'Loaders', d: 'Transform non-JS files (CSS, images, TS) into modules webpack understands.', code: "module: { rules: [{ test: /\\.css$/, use: ['style-loader','css-loader'] }] }" },
  plugins: { icon: '🔌', label: 'Plugins', d: 'Hook into the build for broader tasks: HTML generation, minify, define env.', code: "plugins: [new HtmlWebpackPlugin()]" },
  output: { icon: '📤', label: 'Output', d: 'Where & how to write the bundled files.', code: "output: { path: __dirname + '/dist', filename: '[name].[contenthash].js' }" },
};
const ORDER = ['entry', 'loaders', 'plugins', 'output'];

const BtWebpackVisualization = () => {
  const [c, setC] = useState('entry');
  return (
    <div className="btwp-wrap">
      <header className="btwp-head">
        <span className="btwp-badge">Webpack</span>
        <h2>Webpack Core Concepts</h2>
        <p>Entry · Loaders · Plugins · Output</p>
      </header>
      <div className="btwp-flow">
        {ORDER.map((k, i) => (
          <React.Fragment key={k}>
            {i > 0 && <div className="btwp-arrow">→</div>}
            <button className={`btwp-node ${c === k ? 'btwp-node--on' : ''}`} onClick={() => setC(k)}>
              <span className="btwp-icon">{CONCEPTS[k].icon}</span>
              <span className="btwp-label">{CONCEPTS[k].label}</span>
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="btwp-detail"><strong>{CONCEPTS[c].icon} {CONCEPTS[c].label}</strong><p>{CONCEPTS[c].d}</p></div>
      <pre className="btwp-code"><code>{CONCEPTS[c].code}</code></pre>
      <div className="btwp-note">Mental model: webpack starts at the <strong>entry</strong>, uses <strong>loaders</strong> to understand every file type, runs <strong>plugins</strong> for build-wide tasks, and writes the <strong>output</strong>.</div>
    </div>
  );
};
export default BtWebpackVisualization;
