import { useState } from 'react';
import './visual.css';

const LAYERS = [
  {
    label: 'Early Layers', sublabel: 'Edges & Gradients',
    desc: 'First conv layers detect low-level features: edges, colors, and simple gradients.',
    features: [
      { label: 'Horizontal edge', gradient: 'linear-gradient(to bottom, #e6edf3 50%, #0d1117 50%)' },
      { label: 'Vertical edge', gradient: 'linear-gradient(to right, #0d1117 50%, #58a6ff 50%)' },
      { label: 'Diagonal', gradient: 'linear-gradient(135deg, #a78bfa 40%, #0d1117 60%)' },
      { label: 'Color blob', gradient: 'radial-gradient(circle, #f97316 40%, #0d1117 70%)' },
    ]
  },
  {
    label: 'Middle Layers', sublabel: 'Textures & Shapes',
    desc: 'Middle layers combine edges into textures, curves, and simple object parts.',
    features: [
      { label: 'Grid texture', gradient: 'repeating-linear-gradient(45deg, #30363d 0 4px, #161b22 4px 8px)' },
      { label: 'Curve', gradient: 'radial-gradient(ellipse 60% 30% at 50% 100%, #56d364 40%, #161b22 60%)' },
      { label: 'Corner', gradient: 'linear-gradient(135deg, #58a6ff 30%, #161b22 30%)' },
      { label: 'Stripe', gradient: 'repeating-linear-gradient(0deg, #a78bfa 0 5px, #0d1117 5px 10px)' },
    ]
  },
  {
    label: 'Deep Layers', sublabel: 'Semantic Features',
    desc: 'Deep layers encode high-level semantics — eyes, wheels, fur — recognizable object parts.',
    features: [
      { label: 'Eye-like', gradient: 'radial-gradient(circle at 50% 50%, #e6edf3 15%, #0d1117 16%, #0d1117 35%, #58a6ff 36%, #58a6ff 45%, #161b22 46%)' },
      { label: 'Wheel', gradient: 'conic-gradient(from 0deg, #30363d 0deg 40deg, #58a6ff 40deg 80deg, #30363d 80deg 120deg, #58a6ff 120deg 160deg, #30363d 160deg 200deg, #58a6ff 200deg 240deg, #30363d 240deg 280deg, #58a6ff 280deg 320deg, #30363d 320deg 360deg)' },
      { label: 'Fur-like', gradient: 'repeating-radial-gradient(circle at 30% 70%, #f97316 0 2px, transparent 2px 8px)' },
      { label: 'Face region', gradient: 'radial-gradient(ellipse 70% 90% at 50% 40%, #a78bfa 30%, #161b22 70%)' },
    ]
  },
];

export default function CnnVisualizingVisualization() {
  const [active, setActive] = useState(0);
  const layer = LAYERS[active];

  return (
    <div className="cnnviz-wrap">
      <h3 className="cnnviz-title">What CNNs Learn at Each Layer</h3>

      <div className="cnnviz-tabs">
        {LAYERS.map((l, i) => (
          <button key={i} className={`cnnviz-tab ${active===i?'cnnviz-tab--active':''}`} onClick={() => setActive(i)}>
            {l.label}
          </button>
        ))}
      </div>

      <div className="cnnviz-sublabel">{layer.sublabel}</div>
      <p className="cnnviz-desc">{layer.desc}</p>

      <div className="cnnviz-features">
        {layer.features.map((f, i) => (
          <div key={i} className="cnnviz-feature">
            <div className="cnnviz-feature-map" style={{ background: f.gradient }} />
            <div className="cnnviz-feature-label">{f.label}</div>
          </div>
        ))}
      </div>

      <div className="cnnviz-depth">
        {LAYERS.map((l, i) => (
          <div key={i} className={`cnnviz-depth-bar ${active===i?'cnnviz-depth-bar--active':''}`}>
            <div className="cnnviz-depth-fill" style={{width: `${(i+1)/LAYERS.length*100}%`}} />
            <span className="cnnviz-depth-name">{l.label}</span>
          </div>
        ))}
        <div className="cnnviz-depth-axis"><span>Input</span><span>Abstract →</span></div>
      </div>
    </div>
  );
}
