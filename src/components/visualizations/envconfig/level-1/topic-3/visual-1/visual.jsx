import React, { useState } from 'react';
import './visual.css';

const EnvSpecificConfigVisualization = () => {
  const [env, setEnv] = useState('development');

  const configs = {
    development: {
      DB_URL: 'mongodb://localhost:27017/myapp_dev',
      LOG_LEVEL: 'debug',
      CACHE_TTL: '0',
      DEBUG: 'true',
      API_URL: 'http://localhost:3000',
      NODE_ENV: 'development',
    },
    staging: {
      DB_URL: 'mongodb+srv://user:pass@staging-cluster.mongodb.net/myapp_stg',
      LOG_LEVEL: 'info',
      CACHE_TTL: '300',
      DEBUG: 'false',
      API_URL: 'https://api-staging.myapp.com',
      NODE_ENV: 'staging',
    },
    production: {
      DB_URL: 'mongodb+srv://user:pass@prod-cluster.mongodb.net/myapp_prod',
      LOG_LEVEL: 'error',
      CACHE_TTL: '3600',
      DEBUG: 'false',
      API_URL: 'https://api.myapp.com',
      NODE_ENV: 'production',
    },
  };

  const envColors = {
    development: '#56d364',
    staging: '#f0a832',
    production: '#58a6ff',
  };

  const varDescriptions = {
    DB_URL: 'Database connection string',
    LOG_LEVEL: 'Verbosity of logs',
    CACHE_TTL: 'Cache duration in seconds',
    DEBUG: 'Enable debug output',
    API_URL: 'Base URL for API calls',
    NODE_ENV: 'Node environment identifier',
  };

  const current = configs[env];
  const color = envColors[env];

  const codeSnippet = `// config/index.js
const env = process.env.NODE_ENV || 'development';

const configs = {
  development: require('./development'),
  staging:     require('./staging'),
  production:  require('./production'),
};

module.exports = configs[env];`;

  return (
    <div className="envspec-container">
      <div className="envspec-env-tabs">
        {Object.keys(configs).map(e => (
          <button
            key={e}
            className={`envspec-env-tab ${env === e ? 'envspec-env-tab--active' : ''}`}
            style={env === e ? { borderColor: envColors[e], color: envColors[e], background: envColors[e] + '18' } : {}}
            onClick={() => setEnv(e)}
          >
            {e.charAt(0).toUpperCase() + e.slice(1)}
          </button>
        ))}
      </div>

      <div className="envspec-node-env-row">
        <span className="envspec-label">NODE_ENV</span>
        <span className="envspec-eq">=</span>
        <span className="envspec-node-env-val" style={{ color }}>"{env}"</span>
        <span className="envspec-arrow">&#8594;</span>
        <span className="envspec-loads">loads</span>
        <span className="envspec-filename" style={{ color }}>.env.{env}</span>
      </div>

      <div className="envspec-table">
        <div className="envspec-table-header">
          <span className="envspec-col-key">Variable</span>
          <span className="envspec-col-val">Value</span>
          <span className="envspec-col-desc">Purpose</span>
        </div>
        {Object.entries(current).map(([key, value]) => (
          <div key={key} className="envspec-table-row">
            <span className="envspec-col-key envspec-var-key">{key}</span>
            <span className="envspec-col-val envspec-var-val" style={{ color }}>
              {value}
            </span>
            <span className="envspec-col-desc envspec-var-desc">{varDescriptions[key]}</span>
          </div>
        ))}
      </div>

      <div className="envspec-code-panel">
        <div className="envspec-code-header">NODE_ENV check pattern</div>
        <pre className="envspec-code">{codeSnippet}</pre>
      </div>
    </div>
  );
};

export default EnvSpecificConfigVisualization;
