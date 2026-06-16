/* Lesson: Building a Statistical Summary Report in Python
 * Visual type: ILLUSTRATION
 * Reason: The lesson is about workflow — a reusable 5-phase function that runs
 * automatically on every new dataset. A clickable phase-by-phase checklist maps
 * each phase to its Python functions, making the workflow memorable as a mental
 * scaffold rather than a list of code snippets. */
import React, { useState } from 'react';
import './visual.css';

const PHASES = [
  {
    id: 'overview',
    num: '01',
    title: 'Dataset Overview',
    icon: '⬛',
    fn: 'dataset_overview(df)',
    items: ['Shape: rows × columns', 'Memory usage', 'Duplicate count', 'Column dtypes + unique counts', 'Missing value flags ⚠'],
    note: 'The first thing any analyst runs on a new dataset.'
  },
  {
    id: 'numeric',
    num: '02',
    title: 'Numeric Analysis',
    icon: '📊',
    fn: 'numeric_summary(series)',
    items: ['Mean, median, std, CV', 'Five-number summary (Q1→Q3)', 'Skew + kurtosis', 'Normality test (Shapiro / D\'Agostino)', 'Shape label → right statistic to report'],
    note: 'Returns the recommended statistic automatically based on skew level.'
  },
  {
    id: 'categorical',
    num: '03',
    title: 'Categorical Analysis',
    icon: '🏷',
    fn: 'categorical_summary(series)',
    items: ['Mode + top-N value counts', 'Frequency table with %', 'Cardinality check', 'Rare-category flag (<1%)'],
    note: 'Never average a categorical column — frequency is the right statistic.'
  },
  {
    id: 'relationships',
    num: '04',
    title: 'Relationship Check',
    icon: '🔗',
    fn: 'correlation_matrix(df)',
    items: ['Pearson r for numeric pairs', 'Cramér\'s V for categorical pairs', 'Flag |r| > 0.7 (multicollinearity)', 'Simpson\'s paradox: segment by key groups'],
    note: 'High correlation ≠ causation — always check segment breakdown.'
  },
  {
    id: 'reportcard',
    num: '05',
    title: 'Report Card',
    icon: '📋',
    fn: 'full_report(df)',
    items: ['Calls all four phases in sequence', 'Prints action items: clean X, investigate Y', 'Saves charts to /output/stat_report/', 'One function call — run on every new dataset'],
    note: 'Build it once, run it forever. It earns back its writing time on the second dataset.'
  },
];

const DescStatsReportVisualization = () => {
  const [active, setActive] = useState('numeric');
  const phase = PHASES.find(p => p.id === active);

  return (
    <div className="dsrpt-wrap">
      <header className="dsrpt-head">
        <span className="dsrpt-badge">Statistics</span>
        <h2>Statistical Summary Report</h2>
        <p>Five phases — one reusable function</p>
      </header>

      <div className="dsrpt-phases">
        {PHASES.map(p => (
          <button
            key={p.id}
            className={`dsrpt-phase ${active === p.id ? 'dsrpt-phase--on' : ''}`}
            onClick={() => setActive(p.id)}
          >
            <span className="dsrpt-num">{p.num}</span>
            <span className="dsrpt-phase-title">{p.title}</span>
          </button>
        ))}
      </div>

      <div className="dsrpt-detail">
        <div className="dsrpt-fn"><code>{phase.fn}</code></div>
        <ul className="dsrpt-list">
          {phase.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p className="dsrpt-tip">{phase.note}</p>
      </div>

      <div className="dsrpt-pipeline">
        {PHASES.map((p, i) => (
          <React.Fragment key={p.id}>
            <span className={`dsrpt-pip ${active === p.id ? 'dsrpt-pip--on' : ''}`}>{p.num}</span>
            {i < PHASES.length - 1 && <span className="dsrpt-arrow">→</span>}
          </React.Fragment>
        ))}
      </div>

      <div className="dsrpt-note">
        Build <strong>full_report(df)</strong> once. It calls all five phases in sequence and prints a prioritised action list: what to clean, what to investigate, which columns need extra care before analysis begins.
      </div>
    </div>
  );
};

export default DescStatsReportVisualization;
