import { useState } from 'react';
import './visual.css';

const STAGES = [
  {
    id: 'query', label: 'User Query', icon: '💬',
    input: null,
    output: '"What is the capital of France?"',
    outputType: 'string',
    desc: 'Raw text question from the user.',
  },
  {
    id: 'embed', label: 'Embedder', icon: '🔢',
    input: '"What is the capital of France?"',
    output: '[0.23, -0.41, 0.87, ..., 0.12]  (dim=1536)',
    outputType: 'vector',
    desc: 'Text is converted to a dense vector using a sentence encoder (e.g. text-embedding-3-small).',
  },
  {
    id: 'vdb', label: 'Vector DB Search', icon: '🗄️',
    input: '[0.23, -0.41, 0.87, ...]',
    output: 'Top-k similar documents by cosine distance',
    outputType: 'search',
    desc: 'Vector DB (Pinecone / Weaviate) finds the k nearest neighbours by cosine similarity.',
  },
  {
    id: 'docs', label: 'Retrieved Docs', icon: '📄',
    input: 'k nearest vectors',
    output: '["Paris is the capital...", "France is a country...", "The Eiffel Tower is in Paris..."]',
    outputType: 'list',
    desc: 'Top-3 relevant text chunks fetched from the document store.',
  },
  {
    id: 'prompt', label: 'Augmented Prompt', icon: '📝',
    input: 'query + retrieved docs',
    output: 'System: Use the context below...\nContext: Paris is the capital...\nQuestion: What is the capital of France?',
    outputType: 'prompt',
    desc: 'Retrieved chunks are injected into the LLM prompt as context.',
  },
  {
    id: 'llm', label: 'LLM', icon: '🤖',
    input: 'Augmented prompt',
    output: '"The capital of France is Paris."',
    outputType: 'string',
    desc: 'The LLM generates an answer grounded in retrieved context rather than hallucinating.',
  },
  {
    id: 'answer', label: 'Answer', icon: '✅',
    input: 'LLM output',
    output: '"The capital of France is Paris."',
    outputType: 'string',
    desc: 'Final grounded answer returned to the user.',
  },
];

const TYPE_COLOR = {
  string: '#818cf8', vector: '#f97316', search: '#56d364', list: '#f59e0b', prompt: '#ec4899',
};

export default function TrRagVisualization() {
  const [active, setActive] = useState(0);
  const s = STAGES[active];

  return (
    <div className="trrag-wrap">
      <h3 className="trrag-title">RAG Pipeline</h3>
      <p className="trrag-sub">Click each stage to see what data flows through it</p>

      <div className="trrag-pipeline">
        {STAGES.map((stage, i) => (
          <div key={stage.id} className="trrag-step-wrap">
            <button
              className={`trrag-step ${active === i ? 'trrag-step-active' : ''}`}
              onClick={() => setActive(i)}>
              <span className="trrag-step-icon">{stage.icon}</span>
              <span className="trrag-step-label">{stage.label}</span>
            </button>
            {i < STAGES.length - 1 && <div className="trrag-arrow">→</div>}
          </div>
        ))}
      </div>

      <div className="trrag-detail">
        <div className="trrag-detail-header">
          <span className="trrag-detail-icon">{s.icon}</span>
          <span className="trrag-detail-name">{s.label}</span>
        </div>
        {s.input && (
          <div className="trrag-io">
            <span className="trrag-io-label">Input</span>
            <code className="trrag-code">{s.input}</code>
          </div>
        )}
        <div className="trrag-io">
          <span className="trrag-io-label">Output</span>
          <code className="trrag-code trrag-output" style={{ borderLeftColor: TYPE_COLOR[s.outputType], color: TYPE_COLOR[s.outputType] }}>{s.output}</code>
        </div>
        <div className="trrag-badge" style={{ background: TYPE_COLOR[s.outputType] + '22', color: TYPE_COLOR[s.outputType], borderColor: TYPE_COLOR[s.outputType] }}>
          type: {s.outputType}
        </div>
        <div className="trrag-desc">{s.desc}</div>
      </div>
    </div>
  );
}
