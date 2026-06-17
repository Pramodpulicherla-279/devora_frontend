import { useState } from 'react';
import './visual.css';

export default function BaiPromptCachingVisualization() {
  const [req, setReq] = useState(1);

  const sysTokens = 8000;
  const userTokens = 50;
  const isCacheHit = req > 1;
  const processed = isCacheHit ? userTokens : sysTokens + userTokens;
  const saved = isCacheHit ? sysTokens : 0;

  return (
    <div className="baicache-wrap">
      <h3 className="baicache-title">Prompt Caching</h3>
      <p className="baicache-sub">Reuse a large, stable prefix across requests — pay for it once</p>

      <div className="baicache-reqs">
        <span className="baicache-reqs-label">Request #:</span>
        {[1, 2, 3].map(n => (
          <button key={n} className={`baicache-req ${req === n ? 'baicache-req-active' : ''}`} onClick={() => setReq(n)}>{n}</button>
        ))}
      </div>

      <div className="baicache-blocks">
        <div className={`baicache-block baicache-sys ${isCacheHit ? 'baicache-cached' : 'baicache-fresh'}`}>
          <div className="baicache-block-h">System prompt (large doc)</div>
          <div className="baicache-block-tokens">{sysTokens.toLocaleString()} tokens</div>
          <div className="baicache-block-tag">{isCacheHit ? '⚡ CACHE HIT — not reprocessed' : '🔵 processed & cached'}</div>
        </div>
        <div className="baicache-block baicache-user baicache-fresh">
          <div className="baicache-block-h">User message</div>
          <div className="baicache-block-tokens">{userTokens} tokens</div>
          <div className="baicache-block-tag">🔵 always processed</div>
        </div>
      </div>

      <div className="baicache-stats">
        <div className="baicache-stat"><div className="baicache-stat-num">{processed.toLocaleString()}</div><div className="baicache-stat-cap">tokens processed</div></div>
        <div className="baicache-stat"><div className="baicache-stat-num baicache-saved">{saved.toLocaleString()}</div><div className="baicache-stat-cap">tokens saved</div></div>
        <div className="baicache-stat"><div className="baicache-stat-num">{isCacheHit ? '~90%' : '0%'}</div><div className="baicache-stat-cap">cost cut on prefix</div></div>
      </div>

      <pre className="baicache-code">{`messages: [{
  role: 'system',
  content: [{
    type: 'text', text: longDocument,
    cache_control: { type: 'ephemeral' }   // <- cache this block
  }]
}]`}</pre>
    </div>
  );
}
