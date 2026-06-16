import React, { useState, useMemo } from 'react';
import './visual.css';

const STEPS = [
  {
    id: 'browser',
    label: 'Browser',
    icon: '🌐',
    subtitle: 'Form + File Input',
    detail: {
      title: 'Browser — HTML Form',
      description:
        'The user selects a file via <input type="file">. The browser reads the file from disk into memory and packages it into a multipart/form-data HTTP request.',
      code: `<form action="/upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="avatar" accept="image/*" />
  <button type="submit">Upload</button>
</form>`,
    },
  },
  {
    id: 'http',
    label: 'HTTP Request',
    icon: '📡',
    subtitle: 'multipart/form-data',
    detail: {
      title: 'HTTP — multipart/form-data',
      description:
        'The browser encodes the file as a multipart request. Each "part" is separated by a boundary string. The Content-Disposition header names the field, and Content-Type describes the file.',
      code: `POST /upload HTTP/1.1
Host: api.example.com
Content-Type: multipart/form-data; boundary=----FormBoundaryXyZ123

------FormBoundaryXyZ123
Content-Disposition: form-data; name="avatar"; filename="photo.jpg"
Content-Type: image/jpeg

<binary file data here>
------FormBoundaryXyZ123--`,
    },
  },
  {
    id: 'express',
    label: 'Express Route',
    icon: '🛤️',
    subtitle: 'POST /upload',
    detail: {
      title: 'Express — Route Handler',
      description:
        'Express receives the HTTP request. Without middleware, req.body is empty and the file data is inaccessible. The route passes the request to the multer middleware next.',
      code: `// routes/upload.js
const express = require('express');
const router = express.Router();
const { upload, handleUpload } = require('../controllers/upload');

// multer runs BEFORE handleUpload
router.post('/upload', upload.single('avatar'), handleUpload);

module.exports = router;`,
    },
  },
  {
    id: 'multer',
    label: 'Multer',
    icon: '⚙️',
    subtitle: 'Middleware',
    detail: {
      title: 'Multer — Multipart Parser',
      description:
        'Multer parses the multipart stream. It reads the binary data, validates it against your storage configuration, and attaches the result to req.file (single) or req.files (multiple).',
      code: `// controllers/upload.js
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
});

const handleUpload = (req, res) => {
  // req.file is now populated by multer
  console.log(req.file);
  res.json({ path: req.file.path });
};`,
    },
  },
  {
    id: 'saved',
    label: 'File Saved',
    icon: '💾',
    subtitle: 'uploads/ folder',
    detail: {
      title: 'File Saved — req.file Object',
      description:
        'Multer writes the file to disk (or holds it in memory). Your handler receives a populated req.file object with all metadata. You can now store the path in MongoDB or return a URL.',
      code: `// req.file object from multer
{
  fieldname:    'avatar',
  originalname: 'photo.jpg',
  encoding:     '7bit',
  mimetype:     'image/jpeg',
  destination:  'uploads/',
  filename:     '1718000000000-photo.jpg',
  path:         'uploads/1718000000000-photo.jpg',
  size:         245760   // bytes
}`,
    },
  },
];

export default function FuHowUploadsVisualization() {
  const [activeStep, setActiveStep] = useState(0);

  const detail = useMemo(() => STEPS[activeStep].detail, [activeStep]);

  return (
    <div className="fuhow-root">
      <div className="fuhow-header">
        <span className="fuhow-header-title">How File Uploads Work</span>
        <span className="fuhow-header-sub">Click each step to explore</span>
      </div>

      {/* Flow diagram */}
      <div className="fuhow-flow">
        {STEPS.map((step, i) => (
          <React.Fragment key={step.id}>
            <button
              className={'fuhow-step' + (activeStep === i ? ' fuhow-step--active' : '')}
              onClick={() => setActiveStep(i)}
            >
              <span className="fuhow-step-icon">{step.icon}</span>
              <span className="fuhow-step-label">{step.label}</span>
              <span className="fuhow-step-sub">{step.subtitle}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={'fuhow-arrow' + (activeStep > i ? ' fuhow-arrow--done' : '')}>
                <svg viewBox="0 0 24 10" xmlns="http://www.w3.org/2000/svg" className="fuhow-arrow-svg">
                  <line x1="0" y1="5" x2="18" y2="5" stroke="currentColor" strokeWidth="1.5" />
                  <polyline points="14,1 18,5 14,9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step counter */}
      <div className="fuhow-stepper">
        {STEPS.map((_, i) => (
          <button
            key={i}
            className={'fuhow-pip' + (i === activeStep ? ' fuhow-pip--active' : '') + (i < activeStep ? ' fuhow-pip--done' : '')}
            onClick={() => setActiveStep(i)}
            aria-label={'Step ' + (i + 1)}
          />
        ))}
      </div>

      {/* Detail panel */}
      <div className="fuhow-detail">
        <div className="fuhow-detail-title">{detail.title}</div>
        <p className="fuhow-detail-desc">{detail.description}</p>
        <div className="fuhow-code-wrap">
          <div className="fuhow-code-label">Code</div>
          <pre className="fuhow-pre"><code>{detail.code}</code></pre>
        </div>
      </div>

      {/* Navigation */}
      <div className="fuhow-nav">
        <button
          className="fuhow-nav-btn"
          disabled={activeStep === 0}
          onClick={() => setActiveStep((s) => s - 1)}
        >
          ← Previous
        </button>
        <span className="fuhow-nav-count">{activeStep + 1} / {STEPS.length}</span>
        <button
          className="fuhow-nav-btn"
          disabled={activeStep === STEPS.length - 1}
          onClick={() => setActiveStep((s) => s + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
