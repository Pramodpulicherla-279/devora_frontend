import { useState, useMemo } from 'react';
import './visual.css';

const FINETUNE = [
  'Collect 1,000+ high-quality examples',
  'Format as JSONL (prompt → completion)',
  'Upload to provider / training job',
  'Train (minutes to hours, costs $)',
  'Deploy your fine-tuned model',
];

const PROMPTING = [
  'Write a clear system prompt',
  'Add 2–5 examples (few-shot)',
  'Test and iterate in minutes',
  'Ship — no training needed',
];

export default function RagFineTuneBasicsVisualization() {
  const [tab, setTab] = useState('compare');
  const [dataset, setDataset] = useState(1000);

  const cost = useMemo(() => {
    // rough illustrative estimate: $0.008 per 1k examples-epoch * 3 epochs
    const est = (dataset / 1000) * 0.008 * 3 * 1000;
    return est.toFixed(2);
  }, [dataset]);

  return (
    <div className="ragftb-wrap">
      <h3 className="ragftb-title">Fine-Tuning Basics</h3>
      <p className="ragftb-sub">When should you fine-tune vs just engineer a better prompt?</p>

      <div className="ragftb-tabs">
        <button className={`ragftb-tab ${tab === 'compare' ? 'ragftb-tab-active' : ''}`}
          onClick={() => setTab('compare')}>Compare</button>
        <button className={`ragftb-tab ${tab === 'cost' ? 'ragftb-tab-active' : ''}`}
          onClick={() => setTab('cost')}>Cost Estimator</button>
        <button className={`ragftb-tab ${tab === 'decide' ? 'ragftb-tab-active' : ''}`}
          onClick={() => setTab('decide')}>Which to use?</button>
      </div>

      {tab === 'compare' && (
        <div className="ragftb-compare">
          <div className="ragftb-col">
            <div className="ragftb-col-h ragftb-col-ft">🔧 Fine-Tuning</div>
            <ol className="ragftb-steps">
              {FINETUNE.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
            <div className="ragftb-when">
              <strong>Use when:</strong> consistent format/style, domain vocabulary, shortening long prompts, high request volume.
            </div>
          </div>
          <div className="ragftb-col">
            <div className="ragftb-col-h ragftb-col-pe">✍️ Prompt Engineering</div>
            <ol className="ragftb-steps">
              {PROMPTING.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
            <div className="ragftb-when">
              <strong>Use when:</strong> you need flexibility, have few examples, want fast iteration, or the task changes often.
            </div>
          </div>
        </div>
      )}

      {tab === 'cost' && (
        <div className="ragftb-cost">
          <label className="ragftb-cost-label">Dataset size: <strong>{dataset.toLocaleString()}</strong> examples</label>
          <input className="ragftb-slider" type="range" min="100" max="50000" step="100"
            value={dataset} onChange={e => setDataset(+e.target.value)} />
          <div className="ragftb-cost-out">
            <div className="ragftb-cost-card">
              <div className="ragftb-cost-num">~${cost}</div>
              <div className="ragftb-cost-cap">estimated training cost (3 epochs)</div>
            </div>
            <div className="ragftb-cost-card">
              <div className="ragftb-cost-num">{dataset < 500 ? '⚠️ Low' : dataset < 1000 ? 'Borderline' : '✅ Good'}</div>
              <div className="ragftb-cost-cap">dataset quality signal</div>
            </div>
          </div>
          <p className="ragftb-cost-note">Below ~500 examples, fine-tuning rarely beats good few-shot prompting. Illustrative numbers — check your provider's pricing.</p>
        </div>
      )}

      {tab === 'decide' && (
        <div className="ragftb-decide">
          <div className="ragftb-q">Do you have 1,000+ quality examples?</div>
          <div className="ragftb-branch">
            <div className="ragftb-branch-no">❌ No → <span>Prompt engineering / RAG</span></div>
            <div className="ragftb-branch-yes">✅ Yes ↓</div>
          </div>
          <div className="ragftb-q">Is the behaviour hard to express in a prompt?</div>
          <div className="ragftb-branch">
            <div className="ragftb-branch-no">❌ No → <span>Prompt engineering</span></div>
            <div className="ragftb-branch-yes">✅ Yes ↓</div>
          </div>
          <div className="ragftb-q">Need it consistent at high volume / low latency?</div>
          <div className="ragftb-branch">
            <div className="ragftb-branch-final">✅ Yes → <span>Fine-tune 🔧</span></div>
          </div>
          <p className="ragftb-decide-note">💡 Many production systems combine both: RAG for knowledge + light fine-tuning for format/tone.</p>
        </div>
      )}
    </div>
  );
}
