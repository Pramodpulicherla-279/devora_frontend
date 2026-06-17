import { useState } from 'react';
import './visual.css';

const TRACE = [
  { id: 'root', label: 'RAG chain', depth: 0, latency: 1840, tokens: 1200, slow: false },
  { id: 'retrieve', label: 'Retriever', depth: 1, latency: 1200, tokens: 0, slow: true },
  { id: 'embed', label: 'Embed query', depth: 2, latency: 1100, tokens: 0, slow: true },
  { id: 'llm', label: 'LLM call', depth: 1, latency: 580, tokens: 1200, slow: false },
  { id: 'parse', label: 'Output parser', depth: 1, latency: 12, tokens: 0, slow: false },
];

export default function BaiLangsmithVisualization() {
  const [sel, setSel] = useState('retrieve');
  const node = TRACE.find(t => t.id === sel);

  return (
    <div className="bailan-wrap">
      <h3 className="bailan-title">Tracing & Debugging with LangSmith</h3>
      <p className="bailan-sub">See every step of a chain — latency, tokens, inputs, outputs</p>

      <div className="bailan-trace">
        {TRACE.map(t => (
          <button key={t.id} className={`bailan-node ${sel === t.id ? 'bailan-node-active' : ''} ${t.slow ? 'bailan-node-slow' : ''}`}
            style={{ marginLeft: t.depth * 18 + 'px' }} onClick={() => setSel(t.id)}>
            <span className="bailan-node-label">{t.depth > 0 ? '└ ' : ''}{t.label}</span>
            <span className="bailan-node-lat">{t.latency}ms</span>
            {t.slow && <span className="bailan-node-flag">🐌</span>}
          </button>
        ))}
      </div>

      <div className="bailan-detail">
        <div className="bailan-detail-name">{node.label}</div>
        <div className="bailan-row"><span>Latency</span><span className={node.slow ? 'bailan-slow-val' : ''}>{node.latency}ms</span></div>
        <div className="bailan-row"><span>Tokens</span><span>{node.tokens || '—'}</span></div>
        <div className="bailan-row"><span>Cost</span><span>${((node.tokens / 1e6) * 15).toFixed(4)}</span></div>
        {node.slow && <div className="bailan-hint">⚠️ This step dominates total latency — cache embeddings or use a faster embed model.</div>}
      </div>

      <pre className="bailan-code">{`// Enable tracing — one env var
process.env.LANGCHAIN_TRACING_V2 = 'true';
process.env.LANGCHAIN_API_KEY = '...';
// Every chain.invoke() now appears in the LangSmith UI`}</pre>
    </div>
  );
}
