import { useState } from 'react';
import './visual.css';

const SIMPLE = [
  { id: 'prompt', label: 'PromptTemplate', desc: 'Fills variables into a reusable prompt.', code: "PromptTemplate.fromTemplate('Summarize: {text}')" },
  { id: 'llm', label: 'LLM', desc: 'The model that generates the completion.', code: "new ChatAnthropic({ model: 'claude-opus-4-8' })" },
  { id: 'parser', label: 'OutputParser', desc: 'Turns the raw text into structured data.', code: 'new StringOutputParser()' },
];

const RAG_EXTRA = [
  { id: 'retriever', label: 'Retriever', desc: 'Fetches relevant docs from a vector store.', code: 'vectorStore.asRetriever()' },
  { id: 'store', label: 'VectorStore', desc: 'Holds embedded document chunks.', code: 'await MemoryVectorStore.fromDocuments(...)' },
];

export default function BaiLangchainVisualization() {
  const [mode, setMode] = useState('simple');
  const [sel, setSel] = useState('prompt');
  const blocks = mode === 'simple' ? SIMPLE : [...RAG_EXTRA, ...SIMPLE];
  const active = blocks.find(b => b.id === sel) || blocks[0];

  return (
    <div className="bailc-wrap">
      <h3 className="bailc-title">Intro to LangChain</h3>
      <p className="bailc-sub">Compose AI building blocks into a chain</p>

      <div className="bailc-toggle">
        <button className={`bailc-tog ${mode === 'simple' ? 'bailc-tog-active' : ''}`} onClick={() => { setMode('simple'); setSel('prompt'); }}>Simple LLMChain</button>
        <button className={`bailc-tog ${mode === 'rag' ? 'bailc-tog-active' : ''}`} onClick={() => { setMode('rag'); setSel('retriever'); }}>RetrievalQA</button>
      </div>

      <div className="bailc-chain">
        {blocks.map((b, i) => (
          <div key={b.id} className="bailc-block-wrap">
            <button className={`bailc-block ${sel === b.id ? 'bailc-block-active' : ''}`} onClick={() => setSel(b.id)}>{b.label}</button>
            {i < blocks.length - 1 && <span className="bailc-arrow">→</span>}
          </div>
        ))}
      </div>

      <div className="bailc-detail">
        <div className="bailc-detail-name">{active.label}</div>
        <div className="bailc-detail-desc">{active.desc}</div>
        <pre className="bailc-code">{active.code}</pre>
      </div>

      <pre className="bailc-invoke">{`const chain = prompt.pipe(llm).pipe(parser);
const result = await chain.invoke({ text: '...' });`}</pre>
    </div>
  );
}
