import { useState } from 'react';
import './visual.css';

const MODES = {
  vision: { label: 'Vision', icon: '🖼️', task: 'Describe this image', content: 'image', models: ['Claude 3+', 'GPT-4V', 'Gemini Pro Vision'] },
  document: { label: 'Document', icon: '📄', task: 'Extract the invoice total from this PDF', content: 'document', models: ['Claude 3+', 'GPT-4o', 'Gemini 1.5'] },
  audio: { label: 'Audio', icon: '🔊', task: 'Transcribe and summarize this clip', content: 'audio', models: ['Gemini', 'Whisper + LLM'] },
};

export default function CptMultimodalVisualization() {
  const [mode, setMode] = useState('vision');
  const m = MODES[mode];

  const json = `{
  "role": "user",
  "content": [
    { "type": "text", "text": "${m.task}" },
    { "type": "${m.content}",
      "source": { "type": "base64", "data": "..." } }
  ]
}`;

  return (
    <div className="cptmm-root">
      <h3 className="cptmm-title">Multimodal Prompting</h3>
      <p className="cptmm-subtitle">Mix text with images, documents, or audio in a single message</p>

      <div className="cptmm-tabs">
        {Object.entries(MODES).map(([k, v]) => (
          <button key={k} className={`cptmm-tab ${mode === k ? 'cptmm-tab-active' : ''}`} onClick={() => setMode(k)}>
            {v.icon} {v.label}
          </button>
        ))}
      </div>

      <div className="cptmm-builder">
        <div className="cptmm-block cptmm-block-text">📝 text: "{m.task}"</div>
        <div className="cptmm-block cptmm-block-media">{m.icon} {m.content}: &lt;binary data&gt;</div>
      </div>

      <div className="cptmm-json-label">Message structure (API)</div>
      <pre className="cptmm-json">{json}</pre>

      <div className="cptmm-models">
        <span className="cptmm-models-label">Supported by:</span>
        {m.models.map(model => <span key={model} className="cptmm-model">{model}</span>)}
      </div>
    </div>
  );
}
