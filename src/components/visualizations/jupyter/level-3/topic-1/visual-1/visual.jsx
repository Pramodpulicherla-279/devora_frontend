import { useState } from 'react';
import './visual.css';

const FORMATS = [
  {
    id: 'html',
    label: 'HTML',
    icon: '🌐',
    cmd: 'jupyter nbconvert --to html notebook.ipynb',
    preview: 'A self-contained webpage with rendered outputs, plots, and syntax-highlighted code. Shareable without Jupyter installed.',
  },
  {
    id: 'pdf',
    label: 'PDF',
    icon: '📄',
    cmd: 'jupyter nbconvert --to pdf notebook.ipynb',
    preview: 'Requires LaTeX (e.g. TeX Live). Produces a printable document — great for reports. Plots and tables rendered as in-page images.',
  },
  {
    id: 'md',
    label: 'Markdown',
    icon: '✏️',
    cmd: 'jupyter nbconvert --to markdown notebook.ipynb',
    preview: 'Outputs a .md file. Images saved alongside as PNGs. Excellent for publishing to GitHub or a static site generator (Jekyll, Hugo).',
  },
  {
    id: 'slides',
    label: 'Slides',
    icon: '🎞️',
    cmd: 'jupyter nbconvert --to slides notebook.ipynb --post serve',
    preview: 'Reveal.js presentation. Tag cells as Slide / Sub-slide / Fragment in View → Cell Toolbar → Slideshow.',
  },
  {
    id: 'script',
    label: '.py Script',
    icon: '🐍',
    cmd: 'jupyter nbconvert --to script notebook.ipynb',
    preview: 'Strips outputs; keeps code and comments. The cleanest path toward a production Python module.',
  },
];

export default function JnbExportVisualization() {
  const [active, setActive] = useState(null);

  return (
    <div className="jnbexport-root">
      <h2 className="jnbexport-title">Exporting Notebooks</h2>
      <p className="jnbexport-sub">Click a format to see the nbconvert command and a preview description.</p>
      <div className="jnbexport-grid">
        {FORMATS.map(f => (
          <button
            key={f.id}
            className={`jnbexport-card ${active === f.id ? 'jnbexport-card--active' : ''}`}
            onClick={() => setActive(active === f.id ? null : f.id)}
          >
            <span className="jnbexport-icon">{f.icon}</span>
            <span className="jnbexport-label">{f.label}</span>
          </button>
        ))}
      </div>

      {active && (() => {
        const f = FORMATS.find(x => x.id === active);
        return (
          <div className="jnbexport-detail">
            <code className="jnbexport-cmd">{f.cmd}</code>
            <p className="jnbexport-preview">{f.preview}</p>
          </div>
        );
      })()}

      {!active && (
        <div className="jnbexport-placeholder">Select a format above to see details.</div>
      )}
    </div>
  );
}
