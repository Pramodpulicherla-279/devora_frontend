import { useState } from 'react';
import './visual.css';

const PHASES = [
  {
    id: 'ask',
    label: 'Ask Questions',
    color: '#58a6ff',
    angle: 0,
    tools: ['Stakeholder interviews', 'Problem framing', 'KPI definition'],
    example: 'Why did sales drop 12% in Q3? What metrics should we track?',
  },
  {
    id: 'collect',
    label: 'Collect Data',
    color: '#79c0ff',
    angle: 60,
    tools: ['SQL', 'APIs', 'Web scraping', 'CSV exports'],
    example: 'Pull transactions from the database: SELECT * FROM sales WHERE date > …',
  },
  {
    id: 'clean',
    label: 'Clean Data',
    color: '#ffa657',
    angle: 120,
    tools: ['Python (pandas)', 'Excel', 'OpenRefine'],
    example: 'Drop nulls, fix date formats, remove duplicates, normalise column names.',
  },
  {
    id: 'analyze',
    label: 'Analyze',
    color: '#f97316',
    angle: 180,
    tools: ['Python', 'R', 'Excel', 'SQL aggregations'],
    example: 'Group sales by region and product; compute month-over-month growth.',
  },
  {
    id: 'visualize',
    label: 'Visualize',
    color: '#d2a8ff',
    angle: 240,
    tools: ['Tableau', 'Power BI', 'Matplotlib', 'Seaborn', 'Plotly'],
    example: 'Build a bar chart of revenue by region; add trend line for the quarter.',
  },
  {
    id: 'present',
    label: 'Present Findings',
    color: '#7ee787',
    angle: 300,
    tools: ['PowerPoint', 'Google Slides', 'Notion', 'Jupyter'],
    example: 'Slide deck: key insight first, supporting data, recommended action.',
  },
];

const CX = 160, CY = 160, R_OUTER = 130, R_INNER = 60, FONT_R = 105;

function polarToXY(angleDeg, r) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function segmentPath(angleDeg, spread = 58) {
  const a1 = angleDeg - spread / 2;
  const a2 = angleDeg + spread / 2;
  const toRad = d => ((d - 90) * Math.PI) / 180;
  const x1o = CX + R_OUTER * Math.cos(toRad(a1)), y1o = CY + R_OUTER * Math.sin(toRad(a1));
  const x2o = CX + R_OUTER * Math.cos(toRad(a2)), y2o = CY + R_OUTER * Math.sin(toRad(a2));
  const x1i = CX + R_INNER * Math.cos(toRad(a2)), y1i = CY + R_INNER * Math.sin(toRad(a2));
  const x2i = CX + R_INNER * Math.cos(toRad(a1)), y2i = CY + R_INNER * Math.sin(toRad(a1));
  return `M${x1o},${y1o} A${R_OUTER},${R_OUTER} 0 0,1 ${x2o},${y2o} L${x1i},${y1i} A${R_INNER},${R_INNER} 0 0,0 ${x2i},${y2i} Z`;
}

export default function DaiWhatIsVisualization() {
  const [active, setActive] = useState('ask');
  const phase = PHASES.find(p => p.id === active);

  return (
    <div className="daiwhat-root">
      <h2 className="daiwhat-title">What Does a Data Analyst Do?</h2>
      <p className="daiwhat-sub">Click a segment to explore each phase of the analyst workflow.</p>
      <div className="daiwhat-layout">
        <svg viewBox="0 0 320 320" className="daiwhat-wheel">
          {PHASES.map(p => {
            const labelPt = polarToXY(p.angle, FONT_R);
            const isActive = active === p.id;
            return (
              <g key={p.id} onClick={() => setActive(p.id)} style={{ cursor: 'pointer' }}>
                <path
                  d={segmentPath(p.angle)}
                  fill={isActive ? p.color : p.color + '33'}
                  stroke="#0d1117"
                  strokeWidth="3"
                  style={{ transition: 'fill 0.2s' }}
                />
                <text
                  x={labelPt.x}
                  y={labelPt.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="9.5"
                  fill={isActive ? '#0d1117' : p.color}
                  fontWeight={isActive ? '700' : '500'}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {p.label.split(' ').map((word, i, arr) => (
                    <tspan key={i} x={labelPt.x} dy={i === 0 ? (arr.length > 1 ? '-5' : '0') : '12'}>{word}</tspan>
                  ))}
                </text>
              </g>
            );
          })}
          <circle cx={CX} cy={CY} r={R_INNER - 2} fill="#161b22" stroke="#21262d" strokeWidth="1.5" />
          <text x={CX} y={CY - 6} textAnchor="middle" fontSize="10" fill="#58a6ff" fontWeight="700">Analyst</text>
          <text x={CX} y={CY + 8} textAnchor="middle" fontSize="9" fill="#6b7785">Workflow</text>
        </svg>

        <div className="daiwhat-info">
          {phase && (
            <>
              <div className="daiwhat-phase-name" style={{ color: phase.color }}>{phase.label}</div>
              <div className="daiwhat-info-section">
                <div className="daiwhat-info-label">Tools used</div>
                <div className="daiwhat-tools">
                  {phase.tools.map(t => <span key={t} className="daiwhat-tool" style={{ borderColor: phase.color + '60', color: phase.color }}>{t}</span>)}
                </div>
              </div>
              <div className="daiwhat-info-section">
                <div className="daiwhat-info-label">Real-world example</div>
                <div className="daiwhat-example">{phase.example}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
