/* Lesson: What Is Recursion? Functions That Call Themselves
 * 2D animated: countdown(3) opens a nested call inside itself until it hits the base case,
 * like Russian dolls. Then control returns back out. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function CrIntroRecursionVisualization() {
  const [depth, setDepth] = useState(0);       // how many nested calls are open (0..4)
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setDepth(d => (d + 1) % 5), 0.9, auto);

  return (
    <Stage2D
      title="What Is Recursion?"
      subtitle="A recursive function solves a problem by calling itself on a smaller version — each call nests inside the last, like opening Russian dolls."
      accent="#a78bfa"
      viewBox="0 0 640 300"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">open calls: {depth}</span><input className="dsa2d-slider" type="range" min="0" max="4" value={depth} onChange={e => setDepth(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>Every recursive call works on a <strong>smaller input</strong> (<code>n → n-1</code>) and nests inside the previous one. When <code>n</code> reaches the <strong>base case</strong> (0), the nesting stops and the calls unwind back out. No smaller step + no base case = infinite recursion.</>}
    >
      {[0, 1, 2, 3, 4].map(k => {
        const open = k <= depth;
        const size = 260 - k * 48;
        const x = 320 - size / 2, y = 20 + k * 26;
        const isBase = k === 4;
        return (
          <g key={k} style={{ opacity: open ? 1 : 0.12, transition: 'opacity .4s' }}>
            <rect x={x} y={y} width={size} height={size * 0.62} rx="10"
              fill={isBase ? 'rgba(86,211,100,.15)' : 'rgba(167,139,250,.10)'}
              stroke={isBase ? '#56d364' : '#a78bfa'} strokeWidth="2"
              className={open && k === depth ? 'dsa2d-pulse' : ''} />
            <text x="330" y={y + 22} fill={isBase ? '#56d364' : '#c9bdf5'} fontSize="14" textAnchor="middle" fontFamily="Consolas">
              {isBase ? 'countdown(0) → base case, stop' : `countdown(${3 - k})`}
            </text>
          </g>
        );
      })}
    </Stage2D>
  );
}
