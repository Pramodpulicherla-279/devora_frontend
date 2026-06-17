import { useState } from 'react';
import './visual.css';

const STAGES = [
  { label: 'User picks file', icon: '📂', detail: 'Browser sends multipart form to your server', code: `<input type="file" name="image" />` },
  { label: 'Express server', icon: '🖥️', detail: 'multer parses the file into a buffer', code: `upload.single('image')` },
  { label: 'Cloudinary API', icon: '☁️', detail: 'Stream the buffer up to Cloudinary', code: `cloudinary.uploader.upload_stream(\n  { folder: 'avatars' },\n  (err, result) => { /* ... */ }\n)` },
  { label: 'Returns secure_url', icon: '🔗', detail: 'Cloudinary returns a CDN URL', code: `result.secure_url\n// https://res.cloudinary.com/.../v1/avatars/abc.jpg` },
  { label: 'Save URL in MongoDB', icon: '🗄️', detail: 'Store only the URL string, not the file', code: `await User.updateOne(\n  { _id }, { avatar: result.secure_url }\n);` },
];

export default function FuCloudinaryVisualization() {
  const [active, setActive] = useState(0);
  const s = STAGES[active];

  return (
    <div className="fucld-wrap">
      <h3 className="fucld-title">Uploading to Cloudinary</h3>
      <p className="fucld-sub">Click through the pipeline from file picker to stored URL</p>

      <div className="fucld-flow">
        {STAGES.map((st, i) => (
          <div key={i} className="fucld-stage-wrap">
            <button className={`fucld-stage ${active === i ? 'fucld-stage-active' : ''} ${i < active ? 'fucld-stage-done' : ''}`}
              onClick={() => setActive(i)}>
              <span className="fucld-stage-icon">{st.icon}</span>
              <span className="fucld-stage-label">{st.label}</span>
            </button>
            {i < STAGES.length - 1 && <span className="fucld-arrow">↓</span>}
          </div>
        ))}
      </div>

      <div className="fucld-detail">
        <div className="fucld-detail-head">{s.icon} {s.label}</div>
        <div className="fucld-detail-desc">{s.detail}</div>
        <pre className="fucld-code">{s.code}</pre>
      </div>

      <div className="fucld-transform">
        <div className="fucld-transform-h">🎨 On-the-fly transformations (in the URL)</div>
        <code className="fucld-transform-url">res.cloudinary.com/demo/image/upload/<span className="fucld-hl">w_300,h_200,c_fill,q_auto</span>/sample.jpg</code>
        <div className="fucld-transform-note">Resize, crop, and auto-optimise just by changing the URL — no re-upload.</div>
      </div>
    </div>
  );
}
