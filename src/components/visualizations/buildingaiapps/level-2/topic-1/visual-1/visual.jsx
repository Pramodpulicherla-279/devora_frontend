import { useState } from 'react';
import './visual.css';

const STAGES = [
  { id: 'load', label: 'Load', icon: '📥', desc: 'Read raw documents from disk, URLs, or a DB.', code: "const docs = new SimpleDirectoryReader('./data').loadData();" },
  { id: 'index', label: 'Index', icon: '🧩', desc: 'Chunk docs, embed them, build a searchable index.', code: 'const index = await VectorStoreIndex.fromDocuments(docs);' },
  { id: 'query', label: 'Query', icon: '🔍', desc: 'Retrieve relevant chunks + generate an answer.', code: "const engine = index.asQueryEngine();\nconst res = await engine.query('What is...?');" },
];

export default function BaiLlamaindexVisualization() {
  const [sel, setSel] = useState('load');
  const s = STAGES.find(x => x.id === sel);

  return (
    <div className="baili-wrap">
      <h3 className="baili-title">Intro to LlamaIndex</h3>
      <p className="baili-sub">A data framework built for RAG: Load → Index → Query</p>

      <div className="baili-pipeline">
        {STAGES.map((st, i) => (
          <div key={st.id} className="baili-stage-wrap">
            <button className={`baili-stage ${sel === st.id ? 'baili-stage-active' : ''}`} onClick={() => setSel(st.id)}>
              <span className="baili-stage-icon">{st.icon}</span>
              <span className="baili-stage-label">{st.label}</span>
            </button>
            {i < STAGES.length - 1 && <span className="baili-arrow">→</span>}
          </div>
        ))}
      </div>

      <div className="baili-detail">
        <div className="baili-detail-head">{s.icon} {s.label}</div>
        <div className="baili-detail-desc">{s.desc}</div>
        <pre className="baili-code">{s.code}</pre>
      </div>

      <div className="baili-graph">
        <div className="baili-graph-h">The index = a graph of embedded nodes</div>
        <div className="baili-nodes">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`baili-node ${sel === 'query' && i < 2 ? 'baili-node-hit' : ''}`}>
              {sel === 'query' && i < 2 ? '★' : '•'}
            </div>
          ))}
        </div>
        {sel === 'query' && <div className="baili-graph-note">★ = top-k relevant chunks fed to the LLM</div>}
      </div>
    </div>
  );
}
