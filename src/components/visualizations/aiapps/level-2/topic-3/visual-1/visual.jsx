/* Lesson: LlamaIndex
 * Visual type: ILLUSTRATION
 * Reason: LlamaIndex's value is its index → query-engine abstraction. A diagram
 * of the data → index → query engine → response flow communicates it best. */
import React, { useState } from 'react';
import './visual.css';

const STAGES = [
  { icon: '📚', label: 'Data', d: 'Your documents, APIs, databases — connected via LlamaIndex data connectors.' },
  { icon: '🏗️', label: 'Index', d: 'Build an index (vector, tree, keyword) over the data for efficient lookup.' },
  { icon: '⚙️', label: 'Query Engine', d: 'A high-level interface: ask a question, it retrieves + synthesizes an answer.' },
  { icon: '💬', label: 'Response', d: 'Grounded answer with source nodes you can cite.' },
];

const AiAppLlamaIndexVisualization = () => {
  const [s, setS] = useState(0);
  return (
    <div className="aillama-wrap">
      <header className="aillama-head">
        <span className="aillama-badge">LlamaIndex</span>
        <h2>LlamaIndex</h2>
        <p>A data framework for LLM apps — data in, answers out</p>
      </header>
      <div className="aillama-flow">
        {STAGES.map((st, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className="aillama-arrow">→</div>}
            <button className={`aillama-node ${s === i ? 'aillama-node--on' : ''}`} onClick={() => setS(i)}>
              <span className="aillama-icon">{st.icon}</span>
              <span className="aillama-label">{st.label}</span>
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="aillama-detail"><strong>{STAGES[s].icon} {STAGES[s].label}</strong><p>{STAGES[s].d}</p></div>
      <pre className="aillama-code"><code>{`from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
docs = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(docs)
engine = index.as_query_engine()
print(engine.query("What does the contract say about refunds?"))`}</code></pre>
      <div className="aillama-note">LangChain vs LlamaIndex: both build RAG apps. LlamaIndex specializes in <strong>indexing &amp; retrieval</strong> over your data; LangChain is broader orchestration. They're often used together.</div>
    </div>
  );
};
export default AiAppLlamaIndexVisualization;
