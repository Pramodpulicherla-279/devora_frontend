import { useState } from 'react';
import './visual.css';

const METRICS = [
  {
    key: 'bleu',
    label: 'BLEU / ROUGE',
    color: '#818cf8',
    formula: 'BLEU = BP × exp(Σ wₙ log pₙ)',
    intuition: 'Counts n-gram overlaps between generated and reference text.',
    example: {
      ref: 'The cat sat on the mat',
      gen: 'The cat sat on a mat',
      score: 'BLEU-4 ≈ 0.71',
      note: 'Loses 1 point for "a" vs "the"',
    },
    pros: 'Fast, deterministic, widely used in MT benchmarks.',
    cons: 'Ignores semantics — "vehicle" vs "car" scores 0.',
  },
  {
    key: 'bert',
    label: 'BERTScore',
    color: '#56d364',
    formula: 'F₁ = 2 × P_BERT × R_BERT / (P_BERT + R_BERT)',
    intuition: 'Compares BERT token embeddings with cosine similarity.',
    example: {
      ref: 'The vehicle crashed',
      gen: 'The car collided',
      score: 'F₁ ≈ 0.94',
      note: '"car"/"vehicle" are semantically close → high score',
    },
    pros: 'Captures semantic equivalence, correlates with human judgements.',
    cons: 'Slower; requires a pretrained BERT model.',
  },
  {
    key: 'human',
    label: 'Human Eval',
    color: '#f97316',
    formula: 'Win Rate = wins / (wins + ties + losses)',
    intuition: 'Annotators compare model A vs model B and pick a winner.',
    example: {
      ref: 'Model A response',
      gen: 'Model B response',
      score: 'A wins 63% of evals',
      note: 'Crowdsourced or expert raters; treated as ground truth',
    },
    pros: 'Gold standard — captures fluency, coherence, accuracy holistically.',
    cons: 'Expensive, slow, not reproducible.',
  },
];

const HALLUCINATION = [
  { label: 'Factual accuracy', q: 'Are all stated facts verifiable?' },
  { label: 'Citation', q: 'Does the output cite its source?' },
  { label: 'Self-consistency', q: 'Does the model contradict itself across turns?' },
  { label: 'Refusal rate', q: 'Does the model refuse unanswerable questions?' },
  { label: 'Calibration', q: 'Does confidence match actual correctness?' },
];

export default function TrEvalVisualization() {
  const [tab, setTab] = useState('bleu');
  const [checks, setChecks] = useState({});
  const m = METRICS.find(x => x.key === tab);

  return (
    <div className="treval-wrap">
      <h3 className="treval-title">Evaluating & Debugging LLM Outputs</h3>
      <p className="treval-sub">Automated metrics and hallucination checklists</p>
      <div className="treval-tabs">
        {METRICS.map(me => (
          <button key={me.key}
            className={`treval-tab ${tab === me.key ? 'treval-tab-active' : ''}`}
            style={tab === me.key ? { borderColor: me.color, color: me.color, background: me.color + '15' } : {}}
            onClick={() => setTab(me.key)}>{me.label}</button>
        ))}
      </div>
      <div className="treval-metric-card" style={{ borderTopColor: m.color }}>
        <div className="treval-formula" style={{ color: m.color }}>{m.formula}</div>
        <div className="treval-intuition">{m.intuition}</div>
        <div className="treval-example">
          <div className="treval-ex-row"><span className="treval-ex-label">Reference:</span><span>{m.example.ref}</span></div>
          <div className="treval-ex-row"><span className="treval-ex-label">Generated:</span><span>{m.example.gen}</span></div>
          <div className="treval-ex-row"><span className="treval-ex-label">Score:</span><span style={{ color: m.color, fontWeight: 700 }}>{m.example.score}</span></div>
          <div className="treval-ex-note">{m.example.note}</div>
        </div>
        <div className="treval-pros-cons">
          <div><span className="treval-label-g">Pros:</span> {m.pros}</div>
          <div><span className="treval-label-r">Cons:</span> {m.cons}</div>
        </div>
      </div>
      <div className="treval-halluc">
        <div className="treval-halluc-title">Hallucination Checklist</div>
        {HALLUCINATION.map((item, i) => (
          <label key={i} className="treval-check-row">
            <input type="checkbox" checked={!!checks[i]} onChange={() => setChecks(c => ({ ...c, [i]: !c[i] }))} className="treval-checkbox" />
            <div>
              <div className="treval-check-label" style={checks[i] ? { color: '#56d364' } : {}}>{item.label}</div>
              <div className="treval-check-q">{item.q}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
