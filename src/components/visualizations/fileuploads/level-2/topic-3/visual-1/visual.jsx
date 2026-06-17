import { useState } from 'react';
import './visual.css';

const THREATS = [
  {
    name: 'File Type Spoofing',
    icon: '🎭',
    attack: 'Rename malware.exe → photo.jpg. The extension lies; the bytes are still an executable.',
    defence: `// Check the magic number, not the name
import { fileTypeFromBuffer } from 'file-type';
const type = await fileTypeFromBuffer(req.file.buffer);
if (!['image/jpeg','image/png'].includes(type?.mime)) {
  throw new Error('Real type does not match');
}`,
  },
  {
    name: 'Zip Bombs',
    icon: '💣',
    attack: 'A 1KB zip that decompresses to 10GB, exhausting disk and memory.',
    defence: `// Cap size BEFORE processing
multer({ limits: { fileSize: 5 * 1024 * 1024 } });
// And never auto-extract archives from users.`,
  },
  {
    name: 'Path Traversal',
    icon: '🗂️',
    attack: "Filename '../../etc/passwd' writes outside your uploads folder.",
    defence: `// Never trust the original filename
import { randomUUID } from 'crypto';
import path from 'path';
const safe = randomUUID() + path.extname(file.originalname);
// store as 'safe', ignore user-supplied path`,
  },
  {
    name: 'Malicious SVG',
    icon: '🖼️',
    attack: 'SVG can embed <script> — stored XSS when rendered in a browser.',
    defence: `// Sanitise or disallow SVG
import DOMPurify from 'isomorphic-dompurify';
const clean = DOMPurify.sanitize(svgString);
// Or serve uploads with Content-Disposition: attachment`,
  },
];

export default function FuUploadSecurityVisualization() {
  const [idx, setIdx] = useState(0);
  const t = THREATS[idx];

  return (
    <div className="fusec-wrap">
      <h3 className="fusec-title">Upload Security Threats</h3>
      <p className="fusec-sub">Click a threat to see the attack and the defence</p>

      <div className="fusec-cards">
        {THREATS.map((th, i) => (
          <button key={i} className={`fusec-card ${idx === i ? 'fusec-card-active' : ''}`}
            onClick={() => setIdx(i)}>
            <span className="fusec-card-icon">{th.icon}</span>
            <span className="fusec-card-name">{th.name}</span>
          </button>
        ))}
      </div>

      <div className="fusec-detail">
        <div className="fusec-attack">
          <div className="fusec-block-h fusec-h-attack">⚔️ Attack</div>
          <div className="fusec-attack-text">{t.attack}</div>
        </div>
        <div className="fusec-defence">
          <div className="fusec-block-h fusec-h-defence">🛡️ Defence</div>
          <pre className="fusec-code">{t.defence}</pre>
        </div>
      </div>
    </div>
  );
}
