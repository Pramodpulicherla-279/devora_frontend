/* Lesson: Designing a Rate Limiter Using What You Already Know
 * 2D animated: the token bucket — tokens refill at a steady rate; each request spends one;
 * an empty bucket means 429. Fire requests and watch the bucket drain and refill. */
import { useState, useRef } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const CAP = 6;
export default function SysdRateLimiterVisualization() {
  const [tokens, setTokens] = useState(4);
  const [last, setLast] = useState('—');
  const [auto, setAuto] = useState(true);
  const flip = useRef(0);
  // auto: alternate bursts of requests and refills
  useAutoPlay(() => {
    flip.current++;
    if (flip.current % 3 === 0) setTokens(t => Math.min(CAP, t + 1));
    else setTokens(t => { if (t > 0) { setLast('200 OK'); return t - 1; } setLast('429 Too Many'); return t; });
  }, 0.8, auto);
  const fire = () => setTokens(t => { if (t > 0) { setLast('200 OK'); return t - 1; } setLast('429 Too Many'); return t; });
  const ok = last === '200 OK';
  return (
    <Stage2D title="Rate Limiter — Token Bucket" subtitle="A counter with a refill schedule: the bucket holds up to N tokens, gains one every interval, and each request spends one. Empty bucket → reject with 429. Bursts allowed, sustained abuse throttled."
      accent={ok ? '#56d364' : '#f0a35e'} viewBox="0 0 640 260"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={fire}>send request</button><button className="dsa2d-btn" onClick={() => setTokens(CAP)}>refill</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">tokens: {tokens}/{CAP} · last: {last}</span></>}
      legend={<>Implementation is pleasingly small: per user, store <code>(tokens, last_refill_ts)</code> in a hash map (Redis in production) and lazily top-up on each request. Alternatives — fixed window (bursty edges), sliding log (memory-hungry) — make great follow-up discussion in the interview.</>}>
      {/* bucket */}
      <path d="M 250 60 L 265 190 L 375 190 L 390 60" fill="none" stroke="#8b949e" strokeWidth="3" />
      {Array.from({ length: tokens }).map((_, k) => (
        <circle key={k} cx={290 + (k % 3) * 30} cy={172 - Math.floor(k / 3) * 30} r="12" fill="rgba(86,211,100,.35)" stroke="#56d364" strokeWidth="2" className="dsa2d-fade" />
      ))}
      <text x="320" y="215" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">+1 token / interval, cap {CAP}</text>
      {/* request + verdict */}
      <text x="120" y="115" fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700">📱 requests</text>
      <line x1="160" y1="125" x2="245" y2="125" stroke={ok ? '#56d364' : '#f0a35e'} strokeWidth="3" className="dsa2d-pulse" />
      <rect x="440" y="95" width="140" height="56" rx="11" fill={last === '—' ? '#161b22' : ok ? 'rgba(86,211,100,.15)' : 'rgba(240,136,62,.14)'} stroke={last === '—' ? '#484f58' : ok ? '#56d364' : '#f0a35e'} strokeWidth="2.5" style={{ transition: 'fill .3s' }} />
      <text x="510" y="120" fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{last === '—' ? 'awaiting…' : last}</text>
      <text x="510" y="140" fill="#8b949e" fontSize="10" textAnchor="middle" fontFamily="Consolas">{ok ? 'token spent → allow' : last === '—' ? '' : 'bucket empty → reject'}</text>
      <line x1="392" y1="125" x2="438" y2="125" stroke={ok ? '#56d364' : '#f0a35e'} strokeWidth="2.5" />
    </Stage2D>
  );
}
