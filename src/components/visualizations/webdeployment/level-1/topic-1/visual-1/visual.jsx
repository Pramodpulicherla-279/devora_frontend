import { useState } from 'react';
import './visual.css';

const steps = [
  {
    id: 1,
    label: 'Create Cluster',
    icon: '🗄️',
    title: 'Create Your Atlas Cluster',
    description: 'Choose a cloud provider, region, and cluster tier. M0 is free forever — perfect for learning and small projects.',
    ui: (
      <div className="depatlas-ui-block">
        <div className="depatlas-field-row">
          <span className="depatlas-field-label">Provider</span>
          <span className="depatlas-field-value depatlas-badge">AWS</span>
          <span className="depatlas-field-value depatlas-badge">GCP</span>
          <span className="depatlas-field-value depatlas-badge depatlas-selected">Azure</span>
        </div>
        <div className="depatlas-field-row">
          <span className="depatlas-field-label">Region</span>
          <span className="depatlas-field-value">US East (N. Virginia)</span>
        </div>
        <div className="depatlas-field-row">
          <span className="depatlas-field-label">Tier</span>
          <span className="depatlas-field-value depatlas-accent">M0 Sandbox (Free)</span>
        </div>
        <div className="depatlas-field-row">
          <span className="depatlas-field-label">Cluster Name</span>
          <span className="depatlas-field-value">Cluster0</span>
        </div>
      </div>
    ),
    config: null,
  },
  {
    id: 2,
    label: 'Add DB User',
    icon: '👤',
    title: 'Add a Database User',
    description: 'Create a username and password for your app to authenticate with MongoDB. Never use your Atlas login credentials here.',
    ui: (
      <div className="depatlas-ui-block">
        <div className="depatlas-field-row">
          <span className="depatlas-field-label">Username</span>
          <span className="depatlas-field-value">appuser</span>
        </div>
        <div className="depatlas-field-row">
          <span className="depatlas-field-label">Password</span>
          <span className="depatlas-field-value depatlas-masked">••••••••••••</span>
        </div>
        <div className="depatlas-field-row">
          <span className="depatlas-field-label">Role</span>
          <span className="depatlas-field-value depatlas-accent">Read and Write to any database</span>
        </div>
        <div className="depatlas-tip">Tip: Use "Autogenerate Secure Password" and store it safely</div>
      </div>
    ),
    config: null,
  },
  {
    id: 3,
    label: 'Whitelist IP',
    icon: '🔒',
    title: 'Whitelist IP Address',
    description: 'Atlas blocks all connections by default. Add your server IP, or use 0.0.0.0/0 to allow access from anywhere (dev only).',
    ui: (
      <div className="depatlas-ui-block">
        <div className="depatlas-field-row">
          <span className="depatlas-field-label">IP Address</span>
          <span className="depatlas-field-value">0.0.0.0/0</span>
          <span className="depatlas-badge depatlas-warn">All Traffic</span>
        </div>
        <div className="depatlas-field-row">
          <span className="depatlas-field-label">Comment</span>
          <span className="depatlas-field-value">Allow from anywhere (dev only)</span>
        </div>
        <div className="depatlas-tip depatlas-tip-warn">Production: use your Render server's static IP instead</div>
      </div>
    ),
    config: null,
  },
  {
    id: 4,
    label: 'Connection String',
    icon: '🔗',
    title: 'Get Connection String',
    description: 'Copy the connection string and paste it into your app\'s environment variables. Replace &lt;password&gt; with your actual password.',
    ui: (
      <div className="depatlas-ui-block">
        <div className="depatlas-field-row">
          <span className="depatlas-field-label">Driver</span>
          <span className="depatlas-field-value depatlas-accent">Node.js / Mongoose</span>
        </div>
        <div className="depatlas-conn-string">
          <span className="depatlas-conn-scheme">mongodb+srv://</span>
          <span className="depatlas-conn-user">appuser</span>
          <span className="depatlas-conn-sep">:</span>
          <span className="depatlas-conn-pass">&lt;password&gt;</span>
          <span className="depatlas-conn-sep">@</span>
          <span className="depatlas-conn-host">cluster0.abc12.mongodb.net</span>
          <span className="depatlas-conn-sep">/</span>
          <span className="depatlas-conn-db">devora</span>
        </div>
        <div className="depatlas-tip">Add this as MONGODB_URI in your .env file</div>
      </div>
    ),
    config: 'MONGODB_URI=mongodb+srv://appuser:<password>@cluster0.abc12.mongodb.net/devora',
  },
];

export default function DepAtlasVisualization() {
  const [activeStep, setActiveStep] = useState(0);

  const step = steps[activeStep];

  return (
    <div className="depatlas-root">
      <div className="depatlas-header">
        <span className="depatlas-logo">MongoDB Atlas</span>
        <span className="depatlas-subtitle">Cluster Setup Wizard</span>
      </div>

      <div className="depatlas-stepper">
        {steps.map((s, i) => (
          <button
            key={s.id}
            className={`depatlas-step-btn${i === activeStep ? ' depatlas-step-active' : ''}${i < activeStep ? ' depatlas-step-done' : ''}`}
            onClick={() => setActiveStep(i)}
          >
            <span className="depatlas-step-num">{i < activeStep ? '✓' : s.id}</span>
            <span className="depatlas-step-label">{s.label}</span>
          </button>
        ))}
        <div className="depatlas-step-line" />
      </div>

      <div className="depatlas-panel">
        <div className="depatlas-panel-header">
          <span className="depatlas-panel-icon">{step.icon}</span>
          <span className="depatlas-panel-title">{step.title}</span>
        </div>
        <p className="depatlas-panel-desc">{step.description}</p>
        {step.ui}
        {step.config && (
          <div className="depatlas-config-block">
            <span className="depatlas-config-label">.env</span>
            <code className="depatlas-config-code">{step.config}</code>
          </div>
        )}
      </div>

      <div className="depatlas-nav">
        <button
          className="depatlas-nav-btn"
          disabled={activeStep === 0}
          onClick={() => setActiveStep(s => s - 1)}
        >
          ← Back
        </button>
        <span className="depatlas-progress">{activeStep + 1} / {steps.length}</span>
        <button
          className="depatlas-nav-btn depatlas-nav-primary"
          disabled={activeStep === steps.length - 1}
          onClick={() => setActiveStep(s => s + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
