/* Lesson: Designing a URL Shortener — A Classic Beginner System Design Problem
 * 2D animated: the two flows — shorten (write) and redirect (read) — through the same small
 * architecture. Toggle between them. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function SysdUrlShortenerVisualization() {
  const [write, setWrite] = useState(true);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setWrite(w => !w), 2.8, auto);
  const B = (x, y, w, h, label, hot, sub) => (
    <g key={label}>
      <rect x={x} y={y} width={w} height={h} rx="11" fill={hot ? 'rgba(88,166,255,.16)' : '#161b22'} stroke={hot ? '#58a6ff' : '#484f58'} strokeWidth={hot ? 2.5 : 2} style={{ transition: 'fill .3s, stroke .3s' }} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 4 : h / 2 + 5)} fill="#e6edf3" fontSize="12.5" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 15} fill="#8b949e" fontSize="9.5" textAnchor="middle" fontFamily="Consolas">{sub}</text>}
    </g>
  );
  return (
    <Stage2D title="URL Shortener (tinyurl)" subtitle="Two asymmetric flows share one design: writes are rare (create a code once), reads are massive (every click redirects). That read-heavy ratio drives every choice — especially the cache."
      accent="#58a6ff" viewBox="0 0 640 290"
      controls={<><button className={`dsa2d-btn ${write ? 'dsa2d-btn--on' : ''}`} onClick={() => setWrite(true)}>✍ shorten (write)</button><button className={`dsa2d-btn ${!write ? 'dsa2d-btn--on' : ''}`} onClick={() => setWrite(false)}>👆 redirect (read)</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={write
        ? <><strong>Write path:</strong> take the long URL, generate a unique ID (counter or hash), <strong>base62-encode</strong> it into a 7-char code, store <code>code → url</code>. Key discussion points: collision handling and whether IDs are guessable.</>
        : <><strong>Read path:</strong> look up the code — cache first (hot links are wildly popular), DB on miss — and reply <code>301/302</code>. At ~100:1 read:write, the cache and read replicas carry the product; this is why interviewers love this question.</>}>
      {B(50, 120, 90, 50, '📱 client', true)}
      {B(180, 120, 100, 50, '🖥 API', true)}
      {write ? B(320, 55, 130, 52, 'ID generator', true, 'base62(counter)') : B(320, 55, 130, 52, '⚡ cache', true, 'code → url')}
      {B(320, 185, 130, 52, '🗄 DB', write || !write, write ? 'insert code→url' : 'on cache miss')}
      {/* arrows */}
      <line x1="140" y1="145" x2="178" y2="145" stroke="#58a6ff" strokeWidth="2.5" className="dsa2d-pulse" />
      <line x1="280" y1="138" x2="318" y2="88" stroke={write ? '#58a6ff' : '#58a6ff'} strokeWidth="2.5" />
      <line x1="280" y1="152" x2="318" y2="204" stroke={write ? '#58a6ff' : '#8b949e'} strokeWidth={write ? 2.5 : 2} strokeDasharray={write ? 'none' : '5 4'} />
      <rect x="500" y="112" width="110" height="66" rx="11" fill="#0b0f15" stroke="#4fce78" strokeWidth="1.5" />
      <text x="555" y="138" fill="#7ee787" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{write ? 'devl.ink/aZ3xK9q' : '301 → long URL'}</text>
      <text x="555" y="158" fill="#8b949e" fontSize="9.5" textAnchor="middle" fontFamily="Consolas">{write ? 'returned to user' : '~1ms from cache'}</text>
      <line x1="452" y1={write ? 82 : 82} x2="498" y2="130" stroke="#4fce78" strokeWidth="2.5" />
      <text x="320" y="278" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{write ? 'write flow: API → ID generator → DB → short code back' : 'read flow: API → cache (hit!) → redirect · DB only on miss'}</text>
    </Stage2D>
  );
}
