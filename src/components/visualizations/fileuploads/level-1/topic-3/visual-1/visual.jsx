import { useState } from 'react';
import './visual.css';

export default function FuMemoryStorageVisualization() {
  const [mode, setMode] = useState('memory');

  const data = {
    memory: {
      title: 'memoryStorage',
      where: 'RAM (req.file.buffer)',
      lifetime: 'Gone after the response is sent',
      code: `const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('file'),
  (req, res) => {
    // req.file.buffer  → raw bytes in RAM
    await uploadToS3(req.file.buffer);
  });`,
      pros: ['Fast — no disk I/O', 'Great for piping to cloud (S3/Cloudinary)', 'No temp files to clean up'],
      cons: ['Large files eat RAM', 'Risky for big/many uploads', 'Lost if you forget to persist'],
    },
    disk: {
      title: 'diskStorage',
      where: 'uploads/ folder (req.file.path)',
      lifetime: 'Persists on disk until you delete it',
      code: `const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

app.post('/upload', upload.single('file'),
  (req, res) => {
    // req.file.path → 'uploads/162...-photo.jpg'
  });`,
      pros: ['Handles large files safely', 'Survives across requests', 'Low memory footprint'],
      cons: ['Slower (disk writes)', 'Must manage / clean files', 'Not ideal for cloud-only flows'],
    },
  };

  const d = data[mode];

  return (
    <div className="fumem-wrap">
      <h3 className="fumem-title">Memory vs Disk Storage</h3>
      <p className="fumem-sub">Where does multer put the uploaded file?</p>

      <div className="fumem-toggle">
        <button className={`fumem-tog ${mode === 'memory' ? 'fumem-tog-active' : ''}`}
          onClick={() => setMode('memory')}>🧠 memoryStorage</button>
        <button className={`fumem-tog ${mode === 'disk' ? 'fumem-tog-active' : ''}`}
          onClick={() => setMode('disk')}>💾 diskStorage</button>
      </div>

      <div className="fumem-info">
        <div className="fumem-info-row"><span className="fumem-k">Stored in</span><span className="fumem-v">{d.where}</span></div>
        <div className="fumem-info-row"><span className="fumem-k">Lifetime</span><span className="fumem-v">{d.lifetime}</span></div>
      </div>

      <pre className="fumem-code">{d.code}</pre>

      <div className="fumem-pc">
        <div className="fumem-pc-col fumem-pros">
          <div className="fumem-pc-h">✅ Pros</div>
          {d.pros.map((p, i) => <div key={i} className="fumem-pc-item">{p}</div>)}
        </div>
        <div className="fumem-pc-col fumem-cons">
          <div className="fumem-pc-h">⚠️ Cons</div>
          {d.cons.map((c, i) => <div key={i} className="fumem-pc-item">{c}</div>)}
        </div>
      </div>
    </div>
  );
}
