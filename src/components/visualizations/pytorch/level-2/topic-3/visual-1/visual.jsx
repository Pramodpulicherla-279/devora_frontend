import { useState } from 'react';
import './visual.css';

const LOSS_CODE = `class FocalLoss(nn.Module):
  def __init__(self, gamma=2):
    super().__init__()
    self.gamma = gamma

  def forward(self, pred, target):
    ce = F.cross_entropy(pred, target, reduction='none')
    pt = torch.exp(-ce)
    return ((1 - pt) ** self.gamma * ce).mean()`;

const LAYER_CODE = `class WeightedLayer(nn.Module):
  def __init__(self, in_f, out_f):
    super().__init__()
    self.linear = nn.Linear(in_f, out_f)
    self.scale  = nn.Parameter(torch.ones(out_f))

  def forward(self, x):
    return self.scale * self.linear(x)`;

const STD_LOSS = `# Standard cross-entropy
criterion = nn.CrossEntropyLoss()
loss = criterion(pred, target)`;

const STD_LAYER = `# Standard linear layer
layer = nn.Linear(in_features, out_features)
out   = layer(x)`;

export default function PtCustomLayersVisualization() {
  const [showCustom, setShowCustom] = useState(true);

  return (
    <div className="ptcustlay-root">
      <h3 className="ptcustlay-title">Custom Loss Functions &amp; Custom Layers</h3>

      <div className="ptcustlay-tabs">
        <button className={`ptcustlay-tab ${showCustom ? 'ptcustlay-tab--active' : ''}`} onClick={() => setShowCustom(true)}>Custom</button>
        <button className={`ptcustlay-tab ${!showCustom ? 'ptcustlay-tab--active' : ''}`} onClick={() => setShowCustom(false)}>Standard</button>
      </div>

      <div className="ptcustlay-cards">
        <div className="ptcustlay-card">
          <div className="ptcustlay-card-header">
            <span className="ptcustlay-badge ptcustlay-badge--orange">Loss</span>
            <span className="ptcustlay-card-name">{showCustom ? 'FocalLoss' : 'CrossEntropyLoss'}</span>
          </div>
          <pre className="ptcustlay-code">{showCustom ? LOSS_CODE : STD_LOSS}</pre>
          {showCustom && (
            <div className="ptcustlay-note">Focal loss down-weights easy examples via (1-pt)^gamma factor — great for class imbalance.</div>
          )}
        </div>

        <div className="ptcustlay-card">
          <div className="ptcustlay-card-header">
            <span className="ptcustlay-badge ptcustlay-badge--violet">Layer</span>
            <span className="ptcustlay-card-name">{showCustom ? 'WeightedLayer' : 'nn.Linear'}</span>
          </div>
          <pre className="ptcustlay-code">{showCustom ? LAYER_CODE : STD_LAYER}</pre>
          {showCustom && (
            <div className="ptcustlay-note">nn.Parameter makes scale a learnable tensor registered to the module.</div>
          )}
        </div>
      </div>

      <div className="ptcustlay-rule">
        <span className="ptcustlay-rule-icon">&#x2713;</span>
        Both extend <code>nn.Module</code> and implement <code>forward()</code> — PyTorch handles the rest.
      </div>
    </div>
  );
}
