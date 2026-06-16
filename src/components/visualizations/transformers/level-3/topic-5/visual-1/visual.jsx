import { useState } from 'react';
import './visual.css';

const COMPONENTS = [
  {
    id: 'user', label: 'User', icon: '👤',
    lib: 'Web / Mobile client',
    snippet: 'fetch("/api/chat", { method: "POST", body: JSON.stringify({ query }) })',
    latency: '—', cost: '—', color: '#818cf8',
  },
  {
    id: 'gateway', label: 'API Gateway', icon: '🔀',
    lib: 'FastAPI + Auth middleware',
    snippet: 'app = FastAPI()\n@app.post("/chat")\nasync def chat(req: ChatRequest, user=Depends(verify_jwt)):',
    latency: '5ms', cost: '$0', color: '#a78bfa',
  },
  {
    id: 'rag', label: 'RAG Pipeline', icon: '🔍',
    lib: 'LangChain / LlamaIndex + Pinecone',
    snippet: 'docs = vectorstore.similarity_search(query, k=3)\ncontext = "\\n".join([d.page_content for d in docs])',
    latency: '80ms', cost: '$0.0004/query', color: '#56d364',
  },
  {
    id: 'llm', label: 'LLM', icon: '🤖',
    lib: 'anthropic SDK (Claude)',
    snippet: 'client = anthropic.Anthropic()\nresp = client.messages.create(\n  model="claude-opus-4-5", max_tokens=1024,\n  messages=[{"role":"user","content":prompt}])',
    latency: '800ms', cost: '$0.015/1K tokens', color: '#f97316',
  },
  {
    id: 'post', label: 'Post-processing', icon: '✂️',
    lib: 'Custom Python',
    snippet: 'def clean(text):\n    text = strip_thinking_tags(text)\n    return validate_json_if_needed(text)',
    latency: '2ms', cost: '$0', color: '#f59e0b',
  },
  {
    id: 'guard', label: 'Guardrails', icon: '🛡️',
    lib: 'Guardrails AI / custom',
    snippet: 'if contains_pii(output) or is_harmful(output):\n    return SAFE_FALLBACK_RESPONSE',
    latency: '15ms', cost: '$0.001/call', color: '#ec4899',
  },
  {
    id: 'resp', label: 'Response', icon: '💬',
    lib: 'Streaming SSE',
    snippet: 'async for chunk in stream:\n    yield f"data: {chunk}\\n\\n"',
    latency: '<total 900ms', cost: '~$0.02/request', color: '#818cf8',
  },
];

export default function TrEndToEndVisualization() {
  const [active, setActive] = useState('llm');
  const c = COMPONENTS.find(x => x.id === active);

  return (
    <div className="trend-wrap">
      <h3 className="trend-title">End-to-End LLM Application Architecture</h3>
      <p className="trend-sub">Click any component to see its library, code, and cost</p>

      <div className="trend-stack">
        {COMPONENTS.map((comp, i) => (
          <div key={comp.id} className="trend-layer-wrap">
            <button
              className={`trend-layer ${active === comp.id ? 'trend-layer-active' : ''}`}
              style={active === comp.id ? { borderColor: comp.color, background: comp.color + '15' } : {}}
              onClick={() => setActive(comp.id)}>
              <span className="trend-icon">{comp.icon}</span>
              <span className="trend-layer-label" style={active === comp.id ? { color: comp.color } : {}}>{comp.label}</span>
            </button>
            {i < COMPONENTS.length - 1 && <div className="trend-connector">↓</div>}
          </div>
        ))}
      </div>

      <div className="trend-detail" style={{ borderTopColor: c.color }}>
        <div className="trend-detail-header">
          <span className="trend-detail-icon">{c.icon}</span>
          <span className="trend-detail-name" style={{ color: c.color }}>{c.label}</span>
          <span className="trend-lib">{c.lib}</span>
        </div>
        <pre className="trend-snippet">{c.snippet}</pre>
        <div className="trend-metrics">
          <div className="trend-metric"><span className="trend-metric-label">Latency</span><span className="trend-metric-val" style={{ color: c.color }}>{c.latency}</span></div>
          <div className="trend-metric"><span className="trend-metric-label">Cost</span><span className="trend-metric-val" style={{ color: c.color }}>{c.cost}</span></div>
        </div>
      </div>
    </div>
  );
}
