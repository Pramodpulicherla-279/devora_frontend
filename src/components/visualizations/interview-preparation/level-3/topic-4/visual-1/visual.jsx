/* Lesson: Vertical vs Horizontal Scaling
 * 2D animated: scale UP (one bigger machine) vs scale OUT (more machines). Toggle to compare
 * limits, cost curves, and failure behaviour. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function SysdScalingVisualization() {
  const [horizontal, setHorizontal] = useState(false);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setHorizontal(h => !h), 2.6, auto);
  return (
    <Stage2D title="Scale Up vs Scale Out" subtitle="Vertical: buy a bigger box — simple, no code changes, but there's a biggest box and it's exponentially priced. Horizontal: add more boxes — near-unlimited, but now you need load balancing and shared state."
      accent={horizontal ? '#58a6ff' : '#f0a35e'} viewBox="0 0 640 270"
      controls={<><button className={`dsa2d-btn ${!horizontal ? 'dsa2d-btn--on' : ''}`} onClick={() => setHorizontal(false)}>vertical (up)</button><button className={`dsa2d-btn ${horizontal ? 'dsa2d-btn--on' : ''}`} onClick={() => setHorizontal(true)}>horizontal (out)</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={horizontal
        ? <>Ten commodity servers behind a balancer: lose one and you keep 90% capacity (<strong>graceful failure</strong>), and you can keep adding. The tax: sessions, caches and databases must cope with many writers — the hard problems of the rest of this part.</>
        : <>One mighty machine: zero architectural change, great for early stages and databases. But cost grows faster than capacity, and it's a <strong>single point of failure</strong> — when the big box dies, everything dies with it.</>}>
      {horizontal ? (
        <>
          <rect x="250" y="42" width="140" height="36" rx="9" fill="#161b22" stroke="#58a6ff" strokeWidth="2" />
          <text x="320" y="66" fill="#79c0ff" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="system-ui">⚖ load balancer</text>
          {[0, 1, 2, 3, 4].map(k => (
            <g key={k} className="dsa2d-fade">
              <line x1="320" y1="78" x2={110 + k * 105} y2="120" stroke="#3d5b8c" strokeWidth="2" />
              <rect x={70 + k * 105} y="120" width="80" height="70" rx="10" fill="rgba(88,166,255,.12)" stroke="#58a6ff" strokeWidth="2" />
              <text x={110 + k * 105} y="152" fill="#e6edf3" fontSize="18" textAnchor="middle">🖥</text>
              <text x={110 + k * 105} y="176" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">server {k + 1}</text>
            </g>
          ))}
          <text x="320" y="232" fill="#79c0ff" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">5 × commodity boxes · lose one, lose 20%</text>
        </>
      ) : (
        <>
          <rect x="230" y="52" width="180" height="150" rx="16" fill="rgba(240,163,94,.12)" stroke="#f0a35e" strokeWidth="3" />
          <text x="320" y="105" fill="#e6edf3" fontSize="38" textAnchor="middle">🖥</text>
          <text x="320" y="140" fill="#f8c088" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">128 cores · 2TB RAM</text>
          <text x="320" y="162" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">$$$$$ and rising steeply</text>
          <text x="320" y="232" fill="#f8c088" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">one giant box · one giant point of failure</text>
        </>
      )}
    </Stage2D>
  );
}
