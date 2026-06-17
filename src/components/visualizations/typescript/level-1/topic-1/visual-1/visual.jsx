import { useState } from 'react';
import './visual.css';

export default function TsWhyVisualization() {
  const [lang, setLang] = useState('ts');
  const isTs = lang === 'ts';

  return (
    <div className="tswhy-wrap">
      <h3 className="tswhy-title">Why TypeScript?</h3>
      <p className="tswhy-sub">Catch bugs while you type — not when users hit them</p>

      <div className="tswhy-toggle">
        <button className={`tswhy-tog ${lang === 'js' ? 'tswhy-tog-js' : ''}`} onClick={() => setLang('js')}>JavaScript</button>
        <button className={`tswhy-tog ${lang === 'ts' ? 'tswhy-tog-ts' : ''}`} onClick={() => setLang('ts')}>TypeScript</button>
      </div>

      <div className="tswhy-editor">
        <div className="tswhy-line"><span className="tswhy-ln">1</span><span>const user = {'{ name: "Ada" }'};</span></div>
        <div className="tswhy-line tswhy-line-err">
          <span className="tswhy-ln">2</span>
          <span>console.log(user.<span className="tswhy-typo">naem</span>);</span>
          {isTs && <span className="tswhy-squiggle">~~~~</span>}
        </div>
        {isTs && (
          <div className="tswhy-tooltip">⚠️ Property 'naem' does not exist on type '{'{ name: string }'}'. Did you mean 'name'?</div>
        )}
      </div>

      <div className={`tswhy-result ${isTs ? 'tswhy-result-ts' : 'tswhy-result-js'}`}>
        {isTs ? (
          <><strong>✅ Compile-time error</strong> — your editor flags it before the code ever runs.</>
        ) : (
          <><strong>💥 Runtime error</strong> — prints <code>undefined</code>, ships to production, breaks for users.</>
        )}
      </div>

      <div className="tswhy-counter">
        <span className="tswhy-counter-icon">{isTs ? '🛡️' : '🐛'}</span>
        Bugs caught before runtime: <strong>{isTs ? 'many' : '0'}</strong>
      </div>
    </div>
  );
}
