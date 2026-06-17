import { useState } from 'react';
import './visual.css';

const FRAMEWORKS = [
  { name: 'LangChain', learn: 2, flex: 5, debug: 3, best: 'Agents, tools, complex multi-step chains' },
  { name: 'LlamaIndex', learn: 4, flex: 3, debug: 4, best: 'RAG over your own documents' },
  { name: 'Raw API', learn: 5, flex: 5, debug: 5, best: 'Full control, minimal dependencies' },
  { name: 'LangGraph', learn: 2, flex: 5, debug: 3, best: 'Stateful, cyclic agent workflows' },
];

const COLS = [['learn', 'Learning ease'], ['flex', 'Flexibility'], ['debug', 'Debugging ease']];

export default function BaiFrameworkChoiceVisualization() {
  const [sel, setSel] = useState(0);
  const f = FRAMEWORKS[sel];

  return (
    <div className="baifw-wrap">
      <h3 className="baifw-title">Choosing Between Frameworks</h3>
      <p className="baifw-sub">There's no single winner — match the tool to the job</p>

      <div className="baifw-matrix">
        <div className="baifw-row baifw-head">
          <span className="baifw-cell-name"></span>
          {COLS.map(([k, label]) => <span key={k} className="baifw-cell">{label}</span>)}
        </div>
        {FRAMEWORKS.map((fw, i) => (
          <button key={i} className={`baifw-row ${sel === i ? 'baifw-row-active' : ''}`} onClick={() => setSel(i)}>
            <span className="baifw-cell-name">{fw.name}</span>
            {COLS.map(([k]) => (
              <span key={k} className="baifw-cell">
                {Array.from({ length: 5 }).map((_, d) => (
                  <span key={d} className={`baifw-dot ${d < fw[k] ? 'baifw-dot-on' : ''}`} />
                ))}
              </span>
            ))}
          </button>
        ))}
      </div>

      <div className="baifw-best">
        <span className="baifw-best-name">{f.name}</span> — use when: {f.best}
      </div>

      <div className="baifw-flow">
        <div className="baifw-flow-h">Quick decision</div>
        <div className="baifw-flow-row">Need agents &amp; tools? → <strong>LangChain / LangGraph</strong></div>
        <div className="baifw-flow-row">Focused on RAG? → <strong>LlamaIndex</strong></div>
        <div className="baifw-flow-row">Want minimal deps &amp; control? → <strong>Raw API</strong></div>
      </div>
    </div>
  );
}
