import { useState } from 'react';
import './visual.css';

const PLATFORMS = [
  {
    id: 'jupyterhub',
    name: 'JupyterHub',
    icon: '🏢',
    free: 'Self-hosted',
    gpu: '✅ (if provisioned)',
    collab: '⚠️ Via extensions',
    storage: 'Persistent',
    sharing: 'Internal',
    useCase: 'Best for: Teams and universities needing full control of their environment. Run on your own server or cloud VM.',
  },
  {
    id: 'colab',
    name: 'Google Colab',
    icon: '🔵',
    free: '✅ Free tier',
    gpu: '✅ T4 GPU free',
    collab: '✅ Google Docs-style',
    storage: 'Google Drive',
    sharing: 'Public / link',
    useCase: 'Best for: Quick ML experiments, teaching, and sharing results publicly. Zero setup required.',
  },
  {
    id: 'deepnote',
    name: 'Deepnote',
    icon: '🟣',
    free: '✅ Free tier',
    gpu: '⚠️ Paid only',
    collab: '✅ Real-time',
    storage: 'Cloud',
    sharing: 'Public / team',
    useCase: 'Best for: Data teams wanting Notion-like collaboration on notebooks with version history and comments.',
  },
  {
    id: 'kaggle',
    name: 'Kaggle Kernels',
    icon: '🏆',
    free: '✅ Free',
    gpu: '✅ P100 GPU free',
    collab: '❌ Limited',
    storage: 'Datasets',
    sharing: 'Public',
    useCase: 'Best for: Competitions, learning from public notebooks, and accessing curated datasets directly.',
  },
];

const FEAT_KEYS = ['free', 'gpu', 'collab', 'storage', 'sharing'];
const FEAT_LABELS = ['Free tier', 'GPU', 'Real-time collab', 'Storage', 'Sharing'];

export default function JnbCollabVisualization() {
  const [active, setActive] = useState('colab');
  const platform = PLATFORMS.find(p => p.id === active);

  return (
    <div className="jnbcollab-root">
      <h2 className="jnbcollab-title">Collaborative Notebooks</h2>
      <p className="jnbcollab-sub">Click a platform to compare features and see its best use case.</p>

      <div className="jnbcollab-cards">
        {PLATFORMS.map(p => (
          <button
            key={p.id}
            className={`jnbcollab-card ${active === p.id ? 'jnbcollab-card--active' : ''}`}
            onClick={() => setActive(p.id)}
          >
            <span className="jnbcollab-card-icon">{p.icon}</span>
            <span className="jnbcollab-card-name">{p.name}</span>
          </button>
        ))}
      </div>

      {platform && (
        <div className="jnbcollab-detail">
          <div className="jnbcollab-feat-grid">
            {FEAT_KEYS.map((k, i) => (
              <div key={k} className="jnbcollab-feat">
                <span className="jnbcollab-feat-label">{FEAT_LABELS[i]}</span>
                <span className="jnbcollab-feat-val">{platform[k]}</span>
              </div>
            ))}
          </div>
          <div className="jnbcollab-usecase">
            <span className="jnbcollab-usecase-icon">💡</span>
            <span>{platform.useCase}</span>
          </div>
        </div>
      )}
    </div>
  );
}
