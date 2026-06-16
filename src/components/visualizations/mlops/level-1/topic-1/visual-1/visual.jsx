import { useState } from 'react';
import './visual.css';

export default function MlopsApiVisualization() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      label: 'Notebook predict()',
      code: `def predict(input_data):\n    features = preprocess(input_data)\n    return model.predict(features)`,
      desc: 'Raw function in a Jupyter notebook cell — not accessible from outside.',
    },
    {
      label: 'Wrap in FastAPI route',
      code: `from fastapi import FastAPI\napp = FastAPI()\n\n@app.post("/predict")\ndef predict(payload: InputSchema):\n    features = preprocess(payload.data)\n    return {"result": model.predict(features)}`,
      desc: 'The same logic wrapped in a POST endpoint. FastAPI adds validation + docs.',
    },
    {
      label: 'Send a request',
      code: `# Client sends JSON\ncurl -X POST https://api.example.com/predict \\\n  -H "Content-Type: application/json" \\\n  -d '{"data": [1.2, 3.4, 5.6]}'`,
      desc: 'Any HTTP client can now call the model — browser, app, or another service.',
    },
    {
      label: 'Receive response',
      code: `// JSON response\n{\n  "result": 0.87,\n  "label": "positive",\n  "latency_ms": 24\n}`,
      desc: 'Structured JSON response. The model is now a production API.',
    },
  ];

  return (
    <div className="mlopsapi-container">
      <h3 className="mlopsapi-title">Notebook → FastAPI Endpoint</h3>

      <div className="mlopsapi-flow">
        {steps.map((s, i) => (
          <button
            key={i}
            className={`mlopsapi-step ${i === step ? 'mlopsapi-step--active' : ''} ${i < step ? 'mlopsapi-step--done' : ''}`}
            onClick={() => setStep(i)}
          >
            <span className="mlopsapi-step-num">{i + 1}</span>
            <span className="mlopsapi-step-label">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="mlopsapi-panel">
        <pre className="mlopsapi-code">{steps[step].code}</pre>
        <p className="mlopsapi-desc">{steps[step].desc}</p>
      </div>

      <div className="mlopsapi-diagram">
        <div className="mlopsapi-box">Client</div>
        <div className="mlopsapi-arrow">
          <svg width="60" height="20" viewBox="0 0 60 20">
            <line x1="0" y1="10" x2="50" y2="10" stroke="#56d364" strokeWidth="2"/>
            <polygon points="50,5 60,10 50,15" fill="#56d364"/>
          </svg>
          <span>JSON</span>
        </div>
        <div className="mlopsapi-box mlopsapi-box--accent">FastAPI</div>
        <div className="mlopsapi-arrow">
          <svg width="60" height="20" viewBox="0 0 60 20">
            <line x1="0" y1="10" x2="50" y2="10" stroke="#56d364" strokeWidth="2"/>
            <polygon points="50,5 60,10 50,15" fill="#56d364"/>
          </svg>
          <span>call</span>
        </div>
        <div className="mlopsapi-box">Model</div>
      </div>
    </div>
  );
}
