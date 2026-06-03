/* Lesson: Document Loaders, Vector Stores & Memory
 * Visual type: ILLUSTRATION
 * Reason: These are the building blocks of a RAG app pipeline. A labeled
 * ingestion-to-retrieval diagram with each component's job is the clearest aid. */
import React, { useState } from 'react';
import './visual.css';

const COMPONENTS = {
  loader: { icon: '📄', label: 'Document Loaders', d: 'Read PDFs, web pages, Notion, CSVs… into a common Document format.', stage: 'Ingest' },
  splitter: { icon: '✂️', label: 'Text Splitters', d: 'Chunk documents into overlapping pieces small enough to embed.', stage: 'Ingest' },
  vector: { icon: '🗄️', label: 'Vector Stores', d: 'Embed chunks & store them (Pinecone, Chroma, pgvector) for semantic search.', stage: 'Store' },
  memory: { icon: '🧠', label: 'Memory', d: 'Persist conversation history so the chain remembers earlier turns.', stage: 'Runtime' },
};

const AiAppDocsVisualization = () => {
  const [c, setC] = useState('loader');
  return (
    <div className="aidocs-wrap">
      <header className="aidocs-head">
        <span className="aidocs-badge">LangChain</span>
        <h2>Loaders, Vector Stores &amp; Memory</h2>
        <p>The plumbing behind a RAG app</p>
      </header>
      <div className="aidocs-pipe">
        {Object.entries(COMPONENTS).map(([k, v], i) => (
          <React.Fragment key={k}>
            {i > 0 && <div className="aidocs-arrow">→</div>}
            <button className={`aidocs-node ${c === k ? 'aidocs-node--on' : ''}`} onClick={() => setC(k)}>
              <span className="aidocs-icon">{v.icon}</span>
              <span className="aidocs-label">{v.label.split(' ')[0]}</span>
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="aidocs-detail">
        <div className="aidocs-stage">{COMPONENTS[c].stage}</div>
        <strong>{COMPONENTS[c].icon} {COMPONENTS[c].label}</strong>
        <p>{COMPONENTS[c].d}</p>
      </div>
      <pre className="aidocs-code"><code>{`docs = PyPDFLoader("manual.pdf").load()
chunks = splitter.split_documents(docs)
store = Chroma.from_documents(chunks, embeddings)
retriever = store.as_retriever()`}</code></pre>
      <div className="aidocs-note">Loaders + splitters build the index once; the vector store + retriever serve it at query time; memory keeps the conversation coherent across turns.</div>
    </div>
  );
};
export default AiAppDocsVisualization;
