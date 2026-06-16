import { useState } from 'react';
import './visual.css';

const INPUT = [
  [1,0,1,0,1],
  [0,1,0,1,0],
  [1,0,1,0,1],
  [0,1,0,1,0],
  [1,0,1,0,1],
];
const KERNEL = [
  [1,0,-1],
  [1,0,-1],
  [1,0,-1],
];

function convolve(r, c) {
  let sum = 0;
  for (let kr = 0; kr < 3; kr++)
    for (let kc = 0; kc < 3; kc++)
      sum += INPUT[r + kr][c + kc] * KERNEL[kr][kc];
  return sum;
}

const OUT_SIZE = 3;
const OUTPUT = Array.from({ length: OUT_SIZE }, (_, r) =>
  Array.from({ length: OUT_SIZE }, (_, c) => convolve(r, c))
);

const totalSteps = OUT_SIZE * OUT_SIZE;

export default function CnnConvLayersVisualization() {
  const [step, setStep] = useState(0);
  const row = Math.floor(step / OUT_SIZE);
  const col = step % OUT_SIZE;
  const val = OUTPUT[row][col];

  return (
    <div className="cnnconv-wrap">
      <h3 className="cnnconv-title">Convolutional Layers</h3>
      <div className="cnnconv-layout">
        <div className="cnnconv-panel">
          <div className="cnnconv-label">5×5 Input</div>
          <svg viewBox="0 0 130 130" className="cnnconv-svg">
            {INPUT.map((rowArr, r) =>
              rowArr.map((v, c) => {
                const inRF = r >= row && r < row + 3 && c >= col && c < col + 3;
                return (
                  <g key={`${r}-${c}`}>
                    <rect x={c*25+2} y={r*25+2} width={23} height={23} rx={3}
                      fill={inRF ? '#1d3a5c' : '#161b22'}
                      stroke={inRF ? '#58a6ff' : '#30363d'} strokeWidth={inRF?2:1}/>
                    <text x={c*25+13} y={r*25+16} textAnchor="middle" fontSize={10}
                      fill={inRF ? '#58a6ff' : '#6b7785'}>{v}</text>
                  </g>
                );
              })
            )}
            <rect x={col*25+2} y={row*25+2} width={75} height={75}
              fill="none" stroke="#58a6ff" strokeWidth={2.5} rx={4}/>
          </svg>
        </div>

        <div className="cnnconv-panel">
          <div className="cnnconv-label">3×3 Kernel</div>
          <svg viewBox="0 0 80 80" className="cnnconv-svg-sm">
            {KERNEL.map((rowArr, r) =>
              rowArr.map((v, c) => (
                <g key={`${r}-${c}`}>
                  <rect x={c*25+2} y={r*25+2} width={22} height={22} rx={3}
                    fill="#1a2744" stroke="#58a6ff" strokeWidth={1.5}/>
                  <text x={c*25+13} y={r*25+15} textAnchor="middle" fontSize={10}
                    fill="#a78bfa">{v}</text>
                </g>
              ))
            )}
          </svg>
        </div>

        <div className="cnnconv-panel">
          <div className="cnnconv-label">3×3 Output</div>
          <svg viewBox="0 0 80 80" className="cnnconv-svg-sm">
            {Array.from({ length: OUT_SIZE }, (_, r) =>
              Array.from({ length: OUT_SIZE }, (_, c) => {
                const done = r < row || (r === row && c <= col);
                const isCurrent = r === row && c === col;
                return (
                  <g key={`${r}-${c}`}>
                    <rect x={c*25+2} y={r*25+2} width={22} height={22} rx={3}
                      fill={isCurrent ? '#1d3a5c' : done ? '#0d2d0d' : '#161b22'}
                      stroke={isCurrent ? '#58a6ff' : done ? '#56d364' : '#30363d'}
                      strokeWidth={isCurrent ? 2 : 1}/>
                    {done && <text x={c*25+13} y={r*25+15} textAnchor="middle" fontSize={9}
                      fill={isCurrent ? '#58a6ff' : '#56d364'}>{OUTPUT[r][c]}</text>}
                  </g>
                );
              })
            )}
          </svg>
        </div>
      </div>

      <div className="cnnconv-info">
        <span className="cnnconv-step-label">Step {step + 1}/{totalSteps}</span>
        <span className="cnnconv-computation">
          Receptive field @ ({row},{col}) → sum = <strong style={{color:'#56d364'}}>{val}</strong>
        </span>
      </div>

      <div className="cnnconv-controls">
        <button className="cnnconv-btn" onClick={() => setStep(s => Math.max(0, s-1))} disabled={step===0}>← Back</button>
        <button className="cnnconv-btn cnnconv-btn--primary" onClick={() => setStep(s => (s+1) % totalSteps)}>Next Step →</button>
        <button className="cnnconv-btn" onClick={() => setStep(0)}>Reset</button>
      </div>
    </div>
  );
}
