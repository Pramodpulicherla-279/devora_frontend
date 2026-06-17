import { useState, useMemo } from 'react';
import './visual.css';

const ORIGINAL = { format: 'PNG', w: 3000, h: 2000, kb: 5000 };

export default function FuImageOptimizationVisualization() {
  const [ops, setOps] = useState({ resize: false, compress: false, webp: false, strip: false });

  const result = useMemo(() => {
    let { format, w, h, kb } = ORIGINAL;
    if (ops.resize) { w = 800; h = 600; kb = kb * 0.18; }
    if (ops.compress) kb = kb * 0.45;
    if (ops.webp) { format = 'WebP'; kb = kb * 0.6; }
    if (ops.strip) kb = kb * 0.95;
    return { format, w, h, kb: Math.max(8, Math.round(kb)) };
  }, [ops]);

  const saved = Math.round((1 - result.kb / ORIGINAL.kb) * 100);

  const sharpCode = useMemo(() => {
    const lines = ['sharp(input)'];
    if (ops.resize) lines.push("  .resize(800, 600, { fit: 'inside' })");
    if (ops.strip) lines.push('  .rotate() // auto-orient, strips EXIF');
    if (ops.webp) lines.push('  .webp({ quality: 80 })');
    else if (ops.compress) lines.push('  .png({ compressionLevel: 9 })');
    lines.push('  .toBuffer();');
    return lines.join('\n');
  }, [ops]);

  return (
    <div className="fuopt-wrap">
      <h3 className="fuopt-title">Image Optimization</h3>
      <p className="fuopt-sub">Apply transformations and watch the file shrink</p>

      <div className="fuopt-compare">
        <div className="fuopt-card">
          <div className="fuopt-card-tag fuopt-before">BEFORE</div>
          <div className="fuopt-stat">{ORIGINAL.format}</div>
          <div className="fuopt-dim">{ORIGINAL.w}×{ORIGINAL.h}px</div>
          <div className="fuopt-size">{(ORIGINAL.kb / 1000).toFixed(1)} MB</div>
        </div>
        <div className="fuopt-arrow">→</div>
        <div className="fuopt-card">
          <div className="fuopt-card-tag fuopt-after">AFTER</div>
          <div className="fuopt-stat">{result.format}</div>
          <div className="fuopt-dim">{result.w}×{result.h}px</div>
          <div className="fuopt-size">{result.kb >= 1000 ? (result.kb / 1000).toFixed(1) + ' MB' : result.kb + ' KB'}</div>
        </div>
      </div>

      <div className="fuopt-saved" style={{ opacity: saved > 0 ? 1 : 0.3 }}>
        💾 {saved}% smaller
      </div>

      <div className="fuopt-ops">
        {[
          { key: 'resize', label: 'Resize to 800×600' },
          { key: 'compress', label: 'Compress quality' },
          { key: 'webp', label: 'Convert to WebP' },
          { key: 'strip', label: 'Strip EXIF metadata' },
        ].map(o => (
          <button key={o.key} className={`fuopt-op ${ops[o.key] ? 'fuopt-op-on' : ''}`}
            onClick={() => setOps(s => ({ ...s, [o.key]: !s[o.key] }))}>
            <span className="fuopt-op-check">{ops[o.key] ? '✓' : '+'}</span> {o.label}
          </button>
        ))}
      </div>

      <pre className="fuopt-code">{sharpCode}</pre>
    </div>
  );
}
