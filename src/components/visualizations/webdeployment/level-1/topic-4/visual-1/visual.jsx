import { useState } from 'react';
import './visual.css';

const TREE = {
  split: [
    { file: 'dist/index.html', size: '0.5 KB', desc: 'Entry HTML, references hashed assets', type: 'html' },
    { file: 'assets/index-a1b2.js', size: '48 KB', desc: 'Main app bundle', type: 'js' },
    { file: 'assets/vendor-c3d4.js', size: '142 KB', desc: 'React + libraries (cached separately)', type: 'js' },
    { file: 'assets/Dashboard-e5f6.js', size: '22 KB', desc: 'Lazy-loaded route chunk', type: 'js' },
    { file: 'assets/index-7g8h.css', size: '12 KB', desc: 'Extracted, minified styles', type: 'css' },
  ],
  nosplit: [
    { file: 'dist/index.html', size: '0.5 KB', desc: 'Entry HTML', type: 'html' },
    { file: 'assets/index-a1b2.js', size: '212 KB', desc: 'Everything in one big bundle', type: 'js' },
    { file: 'assets/index-7g8h.css', size: '12 KB', desc: 'Extracted, minified styles', type: 'css' },
  ],
};

export default function DepViteBuildVisualization() {
  const [split, setSplit] = useState(true);
  const [sel, setSel] = useState(0);
  const files = split ? TREE.split : TREE.nosplit;
  const active = files[Math.min(sel, files.length - 1)];

  return (
    <div className="depvite-wrap">
      <h3 className="depvite-title">Vite Production Build</h3>
      <p className="depvite-sub">npm run build → an optimised dist/ folder</p>

      <div className="depvite-cmd">
        <span className="depvite-cmd-prompt">$</span> vite build
        <span className="depvite-cmd-out">  ✓ built in 3.21s</span>
      </div>

      <div className="depvite-toggle">
        <span className="depvite-toggle-label">Code splitting</span>
        <button className={`depvite-tog ${split ? 'depvite-tog-on' : ''}`} onClick={() => { setSplit(s => !s); setSel(0); }}>
          {split ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="depvite-body">
        <div className="depvite-tree">
          {files.map((f, i) => (
            <button key={i} className={`depvite-file ${sel === i ? 'depvite-file-sel' : ''} depvite-${f.type}`}
              onClick={() => setSel(i)}>
              <span className="depvite-file-name">{f.file}</span>
              <span className="depvite-file-size">{f.size}</span>
            </button>
          ))}
        </div>
        <div className="depvite-detail">
          <div className="depvite-detail-name">{active.file}</div>
          <div className="depvite-detail-desc">{active.desc}</div>
        </div>
      </div>

      <pre className="depvite-code">{`// vite.config.js
export default {
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: { manualChunks: { vendor: ['react', 'react-dom'] } },
    },
  },
};`}</pre>
    </div>
  );
}
