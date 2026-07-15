/* Lesson: Common Mistakes When Calculating Big O
 * 2D animated: flip through the four classic errors, each showing the WRONG guess vs the
 * RIGHT answer with a one-line reason. Auto-advances. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const MISTAKES = [
  { code: 'for x in a:  # 2 passes', wrong: 'O(2n)', right: 'O(n)', why: 'Drop constant factors — 2n, 5n and n all scale the same way.' },
  { code: 'for x in a:\n  for y in b:', wrong: 'O(n²)', right: 'O(n·m)', why: 'Two DIFFERENT arrays → n×m, not n². Only same-size loops give n².' },
  { code: 'if x in my_list:', wrong: 'O(1)', right: 'O(n)', why: '"in" on a list scans every item. Use a set/dict for O(1) lookups.' },
  { code: 'sort(a)\nfor x in a:', wrong: 'O(n) + O(n log n)', right: 'O(n log n)', why: 'Sequential steps → keep only the DOMINANT term (add, don\'t multiply).' },
];

export default function CaCommonMistakesVisualization() {
  const [i, setI] = useState(0);
  const [reveal, setReveal] = useState(true);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => { setReveal(false); setTimeout(() => { setI(v => (v + 1) % MISTAKES.length); setReveal(true); }, 350); }, 2.6, auto);
  const m = MISTAKES[i];

  return (
    <Stage2D
      title="Common Big-O Mistakes"
      subtitle="Four traps that turn a correct analysis into a wrong one. The guess feels right — the answer is what actually scales."
      accent="#f0883e"
      viewBox="0 0 640 300"
      controls={
        <>
          {MISTAKES.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => { setI(k); setReveal(true); }}>{k + 1}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>Rules of thumb: <strong>drop constants</strong>, <strong>keep the dominant term</strong>, <strong>multiply</strong> for nested loops but <strong>add</strong> for sequential steps, and never forget the <strong>hidden cost</strong> of <code>in</code>, slicing, or <code>sorted()</code>.</>}
    >
      {/* code card */}
      <rect x="40" y="30" width="560" height="86" rx="10" fill="#0b0f15" stroke="#30363d" />
      {m.code.split('\n').map((ln, k) => <text key={k} x="60" y={60 + k * 24} fill="#c9d1d9" fontSize="16" fontFamily="Consolas">{ln}</text>)}
      {/* wrong vs right */}
      <g style={{ opacity: reveal ? 1 : 0, transition: 'opacity .35s' }}>
        <rect x="40" y="134" width="272" height="60" rx="10" fill="rgba(248,81,73,.12)" stroke="#f85149" />
        <text x="60" y="160" fill="#f85149" fontSize="13" fontFamily="system-ui">❌ common guess</text>
        <text x="60" y="184" fill="#ff9d95" fontSize="18" fontFamily="Consolas" fontWeight="700">{m.wrong}</text>
        <g style={{ transform: `translateX(0px)` }}>
          <rect x="328" y="134" width="272" height="60" rx="10" fill="rgba(86,211,100,.12)" stroke="#56d364" />
          <text x="348" y="160" fill="#56d364" fontSize="13" fontFamily="system-ui">✅ correct answer</text>
          <text x="348" y="184" fill="#7ee787" fontSize="18" fontFamily="Consolas" fontWeight="700">{m.right}</text>
        </g>
        <text x="320" y="230" fill="#e6edf3" fontSize="14" textAnchor="middle" fontFamily="system-ui">{m.why}</text>
      </g>
      <text x="320" y="270" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">mistake {i + 1} of {MISTAKES.length}</text>
    </Stage2D>
  );
}
