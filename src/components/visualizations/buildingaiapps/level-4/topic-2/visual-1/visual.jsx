import { useState } from 'react';
import './visual.css';

const LOGS = [
  { t: '12:01', model: 'opus-4.8', tok: 1240, ms: 820, ok: true },
  { t: '12:01', model: 'haiku', tok: 320, ms: 190, ok: true },
  { t: '12:02', model: 'opus-4.8', tok: 0, ms: 5000, ok: false },
  { t: '12:02', model: 'opus-4.8', tok: 980, ms: 760, ok: true },
];

const BARS = [40, 65, 52, 78, 60, 88, 45];

export default function BaiMonitoringVisualization() {
  const [tab, setTab] = useState('logs');
  const [alerts, setAlerts] = useState({ latency: true, error: true, cost: false });

  return (
    <div className="baimon-wrap">
      <h3 className="baimon-title">Logging, Monitoring & Alerting</h3>
      <p className="baimon-sub">Observability for every AI call in production</p>

      <div className="baimon-tabs">
        {['logs', 'metrics', 'alerts'].map(t => (
          <button key={t} className={`baimon-tab ${tab === t ? 'baimon-tab-active' : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === 'logs' && (
        <div className="baimon-logs">
          {LOGS.map((l, i) => (
            <div key={i} className={`baimon-log ${l.ok ? '' : 'baimon-log-err'}`}>
              <span className="baimon-log-t">{l.t}</span>
              <span className="baimon-log-model">{l.model}</span>
              <span className="baimon-log-tok">{l.tok} tok</span>
              <span className="baimon-log-ms">{l.ms}ms</span>
              <span className="baimon-log-status">{l.ok ? '✓' : '✗ timeout'}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'metrics' && (
        <div className="baimon-metrics">
          <div className="baimon-chart-h">Requests / min (last 7)</div>
          <div className="baimon-chart">
            {BARS.map((b, i) => (
              <div key={i} className="baimon-bar" style={{ height: `${b}%` }} title={`${b} req`} />
            ))}
          </div>
          <div className="baimon-metric-row">
            <span>Avg latency: <strong>720ms</strong></span>
            <span>Error rate: <strong className="baimon-err-rate">2.1%</strong></span>
            <span>Cost/day: <strong>$8.40</strong></span>
          </div>
        </div>
      )}

      {tab === 'alerts' && (
        <div className="baimon-alerts">
          {[['latency', 'Latency > 5s'], ['error', 'Error rate > 5%'], ['cost', 'Cost > $10/day']].map(([k, label]) => (
            <div key={k} className="baimon-alert">
              <span>{label}</span>
              <button className={`baimon-alert-tog ${alerts[k] ? 'baimon-alert-on' : ''}`} onClick={() => setAlerts(a => ({ ...a, [k]: !a[k] }))}>
                {alerts[k] ? 'ON' : 'OFF'}
              </button>
            </div>
          ))}
        </div>
      )}

      <pre className="baimon-code">{`logger.info({ model, inputTokens, outputTokens,
  latencyMs, cost, success });   // log every call`}</pre>
    </div>
  );
}
