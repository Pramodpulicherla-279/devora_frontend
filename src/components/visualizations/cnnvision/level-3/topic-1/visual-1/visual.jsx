import { useState } from 'react';
import './visual.css';

const GRADCAM = [
  [0.1,0.2,0.3,0.4,0.5,0.6,0.4,0.2],
  [0.2,0.5,0.7,0.8,0.9,0.8,0.6,0.3],
  [0.3,0.7,0.9,1.0,1.0,0.9,0.7,0.4],
  [0.3,0.7,1.0,1.0,1.0,1.0,0.7,0.4],
  [0.2,0.5,0.8,0.9,0.9,0.8,0.5,0.3],
  [0.1,0.3,0.5,0.6,0.6,0.5,0.3,0.2],
  [0.1,0.2,0.3,0.4,0.4,0.3,0.2,0.1],
  [0.0,0.1,0.1,0.2,0.2,0.1,0.1,0.0],
];

const LIME_IMPORTANT = new Set([10,11,12,17,18,19,20,26,27,28,29,34,35,36,37]);

function heatColor(v) {
  const r = Math.round(v * 200 + 20);
  const g = Math.round((1 - v) * 80);
  return `rgb(${r},${g},20)`;
}

function salColor(v) {
  if (v > 0.7) return '#58a6ff';
  if (v > 0.4) return '#a78bfa';
  return '#161b22';
}

const CODES = {
  gradcam: `from pytorch_grad_cam import GradCAM
cam = GradCAM(model, target_layers=[model.layer4])
mask = cam(input_tensor=img)`,
  lime: `from lime import lime_image
explainer = lime_image.LimeImageExplainer()
exp = explainer.explain_instance(img, model.predict)`,
  saliency: `img.requires_grad_(True)
out = model(img)
out[0, cls].backward()
saliency = img.grad.abs()`,
};

const NOTES = {
  gradcam: 'Grad-CAM uses gradients of the target class flowing into the last conv layer to produce a coarse localization map.',
  lime: 'LIME perturbs superpixel regions and trains a local linear model to identify which regions matter most.',
  saliency: 'Saliency maps compute the gradient of the output w.r.t. the input pixels — bright = high impact.',
};

export default function CnnInterpretVisualization() {
  const [tab, setTab] = useState('gradcam');
  const CELL = 34;

  return (
    <div className="cnninterp-wrap">
      <h3 className="cnninterp-title">Model Interpretability</h3>
      <div className="cnninterp-tabs">
        {['gradcam', 'lime', 'saliency'].map(t => (
          <button key={t} className={`cnninterp-tab${tab === t ? ' cnninterp-tab--active' : ''}`}
            onClick={() => setTab(t)}>
            {t === 'gradcam' ? 'Grad-CAM' : t === 'lime' ? 'LIME' : 'Saliency Maps'}
          </button>
        ))}
      </div>

      <div className="cnninterp-layout">
        <svg width={CELL * 8} height={CELL * 8} className="cnninterp-svg">
          {GRADCAM.map((row, r) => row.map((v, c) => {
            const idx = r * 8 + c;
            let fill;
            if (tab === 'gradcam') fill = heatColor(v);
            else if (tab === 'lime') fill = LIME_IMPORTANT.has(idx) ? '#1d3a5c' : '#161b22';
            else fill = salColor(v);
            return <rect key={idx} x={c * CELL} y={r * CELL} width={CELL} height={CELL}
              fill={fill} stroke="#0d1117" strokeWidth={1} />;
          }))}
          {tab === 'lime' && [...LIME_IMPORTANT].map(idx => {
            const r = Math.floor(idx / 8), c = idx % 8;
            return <rect key={`h-${idx}`} x={c * CELL} y={r * CELL} width={CELL} height={CELL}
              fill="none" stroke="#58a6ff" strokeWidth={2} />;
          })}
        </svg>

        <div className="cnninterp-info">
          <p className="cnninterp-note">{NOTES[tab]}</p>
          <pre className="cnninterp-code">{CODES[tab]}</pre>
        </div>
      </div>
    </div>
  );
}
