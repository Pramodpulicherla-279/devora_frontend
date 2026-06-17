import { useState } from 'react';
import './visual.css';

const TABS = {
  presigned: {
    label: 'Direct Upload (presigned URL)',
    steps: [
      'Client asks your server for a presigned URL',
      'Server generates it with AWS SDK (signed, expires)',
      'Client uploads the file DIRECTLY to S3',
      'S3 stores it — your server never touches the bytes',
    ],
    code: `// Server: generate presigned URL
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const cmd = new PutObjectCommand({
  Bucket: 'my-bucket', Key: 'uploads/' + filename,
});
const url = await getSignedUrl(s3, cmd, { expiresIn: 60 });
res.json({ url }); // client PUTs the file to this url`,
    best: 'Best for: large files, high traffic — offloads bandwidth from your server.',
  },
  server: {
    label: 'Server Upload (proxy)',
    steps: [
      'Client uploads file to your Express server',
      'multer parses it into a buffer',
      'Server forwards the buffer to S3',
      'S3 stores it — server is in the middle',
    ],
    code: `// Server: upload through your backend
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

app.post('/upload', upload.single('file'), async (req, res) => {
  await s3.send(new PutObjectCommand({
    Bucket: 'my-bucket',
    Key: 'uploads/' + req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  }));
  res.json({ ok: true });
});`,
    best: 'Best for: small files, when you must validate/transform before storing.',
  },
};

export default function FuAwsS3Visualization() {
  const [tab, setTab] = useState('presigned');
  const t = TABS[tab];

  return (
    <div className="fus3-wrap">
      <h3 className="fus3-title">Uploading to AWS S3</h3>
      <p className="fus3-sub">Two patterns — which one fits your use case?</p>

      <div className="fus3-tabs">
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} className={`fus3-tab ${tab === k ? 'fus3-tab-active' : ''}`}
            onClick={() => setTab(k)}>{v.label}</button>
        ))}
      </div>

      <div className="fus3-flow">
        {t.steps.map((s, i) => (
          <div key={i} className="fus3-step">
            <span className="fus3-step-num">{i + 1}</span>
            <span className="fus3-step-text">{s}</span>
          </div>
        ))}
      </div>

      <pre className="fus3-code">{t.code}</pre>
      <div className="fus3-best">{t.best}</div>
    </div>
  );
}
