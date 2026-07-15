/* Lesson: Counting Frequencies With a Hash Map  [AlgoStage framework]
 * Scan a list once, bumping each item's count in a dict. Fully stepped with synced code, live
 * frequency-map inspector, and console. The bread-and-butter hash-map pattern. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const ITEMS = ['a', 'b', 'a', 'c', 'b', 'a'];
const CW = 66, gap = 10, startX = (640 - (ITEMS.length * (CW + gap) - gap)) / 2, Y = 66;

function buildFrames() {
  const f = [], freq = {};
  const snap = o => f.push(Object.assign({ freq: { ...freq } }, o));
  snap({ line: 2, i: -1, log: 'freq = {}' });
  for (let i = 0; i < ITEMS.length; i++) {
    const x = ITEMS[i];
    const before = freq[x] || 0;
    snap({ line: 3, i, log: `x = '${x}'  (currently ${before})` });
    freq[x] = before + 1;
    snap({ line: 4, i, key: x, log: `freq['${x}'] = ${before} + 1 = ${freq[x]}` });
  }
  snap({ line: 5, i: ITEMS.length, log: `done → ${Object.entries(freq).map(([k, v]) => k + ':' + v).join(', ')}`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">counts</span>(items):' },
  { n: 2, t: '    freq = {}' },
  { n: 3, t: '    <span class="kw">for</span> x <span class="kw">in</span> items:' },
  { n: 4, t: '        freq[x] = freq.get(x, 0) + 1' },
  { n: 5, t: '    <span class="kw">return</span> freq' },
];

export default function HtFrequencyVisualization() {
  return (
    <AlgoStage
      title="Counting Frequencies With a Hash Map"
      subtitle="One pass, one dictionary: for each item, look up its current count in O(1) and add one. This 'tally in a map' pattern underlies anagrams, majority element, mode, and more."
      accent="#4fce78"
      viewBox="0 0 640 150"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'x', type: 'str', prev: prev && prev.i >= 0 && prev.i < ITEMS.length ? `'${ITEMS[prev.i]}'` : '—', cur: fr.i >= 0 && fr.i < ITEMS.length ? `'${ITEMS[fr.i]}'` : '—' },
        { name: 'freq[x]', type: 'int', prev: prev && prev.key ? String((prev.freq[prev.key] || 0)) : '—', cur: fr.key ? String(fr.freq[fr.key]) : '—' },
        { name: 'distinct keys', type: 'int', prev: prev ? String(Object.keys(prev.freq).length) : '0', cur: String(Object.keys(fr.freq).length) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(done →.*)$/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Each lookup-and-increment is <strong>O(1)</strong>, so tallying <code>n</code> items is <strong>O(n)</strong> time and <strong>O(k)</strong> space (k = distinct items). <code>dict.get(x, 0)</code> (or <code>collections.Counter</code>) handles the "first time seen" case cleanly.</>}
      aside={fr => (
        <div>
          <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 6 }}>freq  {'{ key: count }'}</div>
          <div style={{ display: 'flex', gap: 8, minHeight: 34, alignItems: 'center', flexWrap: 'wrap' }}>
            {Object.keys(fr.freq).length ? Object.entries(fr.freq).map(([k, v]) => {
              const hot = fr.key === k;
              return (
                <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 8, background: hot ? 'var(--a-visited-soft)' : 'var(--a-surface-2)', border: '1px solid ' + (hot ? 'var(--a-visited)' : 'var(--a-faint)'), font: '700 14px ui-monospace, monospace' }}>
                  <span style={{ color: 'var(--a-ink)' }}>{k}</span>
                  <span style={{ color: hot ? 'var(--a-visited)' : 'var(--a-muted)' }}>: {v}</span>
                </span>
              );
            }) : <span style={{ color: 'var(--a-faint)', fontStyle: 'italic', fontSize: 13 }}>empty</span>}
          </div>
        </div>
      )}
      renderCanvas={fr => (
        <>
          {ITEMS.map((v, i) => {
            const cur = i === fr.i, done = i < fr.i;
            return (
              <g key={i}>
                <rect x={startX + i * (CW + gap)} y={Y} width={CW} height="50" rx="8" fill={cur ? 'var(--a-current-soft)' : done ? 'var(--a-surface-2)' : 'var(--a-code)'} stroke={cur ? 'var(--a-current)' : done ? 'var(--a-faint)' : 'var(--a-border)'} strokeWidth={cur ? 3 : 2} className={cur ? 'algo-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s' }} />
                <text x={startX + i * (CW + gap) + CW / 2} y={Y + 32} textAnchor="middle" style={{ font: '700 20px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                <text x={startX + i * (CW + gap) + CW / 2} y={Y + 66} textAnchor="middle" style={{ font: '10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>{i}</text>
              </g>
            );
          })}
        </>
      )}
    />
  );
}
