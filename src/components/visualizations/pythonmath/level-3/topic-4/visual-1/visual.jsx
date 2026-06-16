import { useState } from 'react';
import './visual.css';

const libs = [
  {
    name: 'numpy',
    color: '#f97316',
    tagline: 'N-dimensional arrays & math',
    install: 'pip install numpy',
    snippet: `import numpy as np\narr = np.array([1, 2, 3, 4])\nprint(arr * 2)       # [2 4 6 8]\nprint(arr.mean())    # 2.5`,
    use: 'Matrix ops, linear algebra, vectorised computation.',
  },
  {
    name: 'pandas',
    color: '#58a6ff',
    tagline: 'DataFrames for tabular data',
    install: 'pip install pandas',
    snippet: `import pandas as pd\ndf = pd.read_csv("data.csv")\ndf.head()\ndf["col"].value_counts()`,
    use: 'Load, clean, filter, and explore tabular datasets.',
  },
  {
    name: 'matplotlib',
    color: '#56d364',
    tagline: 'Plotting & visualisation',
    install: 'pip install matplotlib',
    snippet: `import matplotlib.pyplot as plt\nplt.plot([1, 2, 3], [4, 1, 9])\nplt.xlabel("x")\nplt.show()`,
    use: 'Charts, scatter plots, histograms, training curves.',
  },
  {
    name: 'scikit-learn',
    color: '#a78bfa',
    tagline: 'Classical ML algorithms',
    install: 'pip install scikit-learn',
    snippet: `from sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)\nmodel.predict(X_test)`,
    use: 'Train/test/evaluate classical ML models quickly.',
  },
  {
    name: 'torch',
    color: '#f85149',
    tagline: 'Deep learning framework',
    install: 'pip install torch',
    snippet: `import torch\nimport torch.nn as nn\nmodel = nn.Linear(10, 1)\noutput = model(torch.randn(5, 10))`,
    use: 'Build and train neural networks with autograd & GPU.',
  },
];

export default function PyMathLibsVisualization() {
  const [sel, setSel] = useState(null);
  const s = libs.find(l => l.name === sel);

  return (
    <div className="pymlibs-root">
      <h3 className="pymlibs-title">Python AI/ML Library Map</h3>
      <div className="pymlibs-body">
        <div className="pymlibs-nodes">
          {libs.map(l => (
            <button key={l.name} className={`pymlibs-node ${sel === l.name ? 'pymlibs-node--active' : ''}`}
              style={{ '--lc': l.color }} onClick={() => setSel(sel === l.name ? null : l.name)}>
              <span className="pymlibs-node-name">{l.name}</span>
              <span className="pymlibs-node-tag">{l.tagline}</span>
            </button>
          ))}
        </div>
        {s ? (
          <div className="pymlibs-detail">
            <div className="pymlibs-install"><code>{s.install}</code></div>
            <pre className="pymlibs-snippet" style={{ borderColor: s.color }}>{s.snippet}</pre>
            <p className="pymlibs-use">{s.use}</p>
          </div>
        ) : (
          <div className="pymlibs-detail"><p className="pymlibs-hint">← Click a library</p></div>
        )}
      </div>
    </div>
  );
}
