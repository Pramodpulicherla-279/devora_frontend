import { useState } from 'react';
import './visual.css';

const FC_PARAMS = 224 * 224 * 3 * 512;
const CONV_PARAMS = 3 * 3 * 3 * 32;

export default function CnnWhyConvVisualization() {
  const [step, setStep] = useState(0);
  const [kernelPos, setKernelPos] = useState(0);

  const CELLS = 6;
  const KERNEL = 3;
  const totalSteps = (CELLS - KERNEL + 1) * (CELLS - KERNEL + 1);

  const kRow = Math.floor(kernelPos / (CELLS - KERNEL + 1));
  const kCol = kernelPos % (CELLS - KERNEL + 1);

  const handleSlide = () => {
    setKernelPos(p => (p + 1) % totalSteps);
  };

  return (
    <div className="cnnwhy-wrap">
      <h3 className="cnnwhy-title">Why Convolutions?</h3>

      <div className="cnnwhy-cards">
        <div className="cnnwhy-card cnnwhy-card--fc">
          <div className="cnnwhy-card-label">Fully-Connected Layer</div>
          <div className="cnnwhy-stat">{(FC_PARAMS / 1e6).toFixed(1)}M</div>
          <div className="cnnwhy-stat-label">parameters for 224×224×3 → 512</div>
          <div className="cnnwhy-badge cnnwhy-badge--warn">Each pixel connects to every neuron</div>
          <div className="cnnwhy-detail">224 × 224 × 3 × 512 = {FC_PARAMS.toLocaleString()}</div>
        </div>
        <div className="cnnwhy-card cnnwhy-card--conv">
          <div className="cnnwhy-card-label">Convolutional Layer</div>
          <div className="cnnwhy-stat">{CONV_PARAMS.toLocaleString()}</div>
          <div className="cnnwhy-stat-label">parameters for 3×3 kernel × 32 filters</div>
          <div className="cnnwhy-badge cnnwhy-badge--good">Weights shared across all positions</div>
          <div className="cnnwhy-detail">3 × 3 × 3 × 32 = {CONV_PARAMS} only!</div>
        </div>
      </div>

      <div className="cnnwhy-section">
        <div className="cnnwhy-section-title">Kernel Sliding (Weight Sharing)</div>
        <div className="cnnwhy-grid-wrap">
          <svg viewBox="0 0 160 160" className="cnnwhy-svg">
            {Array.from({ length: CELLS }).map((_, r) =>
              Array.from({ length: CELLS }).map((_, c) => {
                const inKernel = r >= kRow && r < kRow + KERNEL && c >= kCol && c < kCol + KERNEL;
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={c * 26 + 2} y={r * 26 + 2}
                    width={24} height={24} rx={3}
                    fill={inKernel ? '#1d3a5c' : '#161b22'}
                    stroke={inKernel ? '#58a6ff' : '#30363d'}
                    strokeWidth={inKernel ? 2 : 1}
                  />
                );
              })
            )}
            <rect
              x={kCol * 26 + 2} y={kRow * 26 + 2}
              width={KERNEL * 26} height={KERNEL * 26}
              fill="none" stroke="#58a6ff" strokeWidth={2.5} rx={4}
            />
            <text x={kCol * 26 + KERNEL * 13 + 2} y={kRow * 26 + KERNEL * 13 + 5}
              textAnchor="middle" fill="#58a6ff" fontSize={11} fontWeight="bold">3×3</text>
          </svg>
          <div className="cnnwhy-slide-info">
            <div className="cnnwhy-pos">Position {kernelPos + 1} / {totalSteps}</div>
            <div className="cnnwhy-hint">Same {CONV_PARAMS} weights reused at every position</div>
            <button className="cnnwhy-btn" onClick={handleSlide}>Slide Kernel →</button>
          </div>
        </div>
      </div>

      <div className="cnnwhy-savings">
        Parameter reduction: <span className="cnnwhy-highlight">{Math.round(FC_PARAMS / CONV_PARAMS).toLocaleString()}×</span> fewer parameters
      </div>
    </div>
  );
}
