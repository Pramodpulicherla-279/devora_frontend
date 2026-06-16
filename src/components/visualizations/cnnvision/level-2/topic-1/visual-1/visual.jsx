import { useState } from 'react';
import './visual.css';

const ARCHS = [
  {
    name: 'LeNet', year: 1998, params: '0.06M', depth: 5, acc: '99.2%',
    color: '#6b7785',
    innovation: 'First practical CNN. Used conv+pool stacks for digit recognition (MNIST).',
    code: `# LeNet-5 kernel sizes\nconv1: 5×5 → pool\nconv2: 5×5 → pool\nfc: 120→84→10`
  },
  {
    name: 'AlexNet', year: 2012, params: '61M', depth: 8, acc: '63.3%',
    color: '#58a6ff',
    innovation: 'Won ImageNet 2012. Introduced ReLU, Dropout, GPU training at scale.',
    code: `# AlexNet key layers\nconv1: 11×11, stride 4\nDropout(0.5) before FC\nReLU everywhere`
  },
  {
    name: 'VGG-16', year: 2014, params: '138M', depth: 16, acc: '71.5%',
    color: '#a78bfa',
    innovation: 'Showed depth matters. All 3×3 kernels, very deep and regular structure.',
    code: `# VGG block pattern\nfor _ in range(n):\n  nn.Conv2d(c, c, 3, padding=1)\n  nn.ReLU()\nnn.MaxPool2d(2, 2)`
  },
  {
    name: 'ResNet-50', year: 2015, params: '25M', depth: 50, acc: '76.1%',
    color: '#56d364',
    innovation: 'Skip connections solved vanishing gradients, enabling 100s of layers.',
    code: `# Residual block\ndef forward(self, x):\n  out = self.layers(x)\n  return F.relu(out + x)`
  },
  {
    name: 'EfficientNet', year: 2019, params: '5.3M', depth: 82, acc: '84.4%',
    color: '#f97316',
    innovation: 'Compound scaling of width, depth, resolution for maximum efficiency.',
    code: `# EfficientNet-B0\nMBConv blocks + SE\nscale: φ = 1.2^depth\n        × 1.1^width`
  },
];

export default function CnnArchitecturesVisualization() {
  const [active, setActive] = useState(1);
  const a = ARCHS[active];

  return (
    <div className="cnnarch-wrap">
      <h3 className="cnnarch-title">Classic CNN Architectures</h3>

      <div className="cnnarch-timeline">
        {ARCHS.map((arch, i) => (
          <button key={arch.name}
            className={`cnnarch-node ${active===i?'cnnarch-node--active':''}`}
            style={{ '--ac': arch.color }}
            onClick={() => setActive(i)}>
            <div className="cnnarch-node-dot" />
            <div className="cnnarch-node-name">{arch.name}</div>
            <div className="cnnarch-node-year">{arch.year}</div>
            {i < ARCHS.length-1 && <div className="cnnarch-line" />}
          </button>
        ))}
      </div>

      <div className="cnnarch-detail" style={{ '--ac': a.color }}>
        <div className="cnnarch-detail-header">
          <span className="cnnarch-detail-name">{a.name}</span>
          <span className="cnnarch-detail-year">{a.year}</span>
        </div>

        <div className="cnnarch-stats">
          <div className="cnnarch-stat">
            <div className="cnnarch-stat-val">{a.params}</div>
            <div className="cnnarch-stat-key">Parameters</div>
          </div>
          <div className="cnnarch-stat">
            <div className="cnnarch-stat-val">{a.depth}</div>
            <div className="cnnarch-stat-key">Layers</div>
          </div>
          <div className="cnnarch-stat">
            <div className="cnnarch-stat-val">{a.acc}</div>
            <div className="cnnarch-stat-key">Top-1 Acc</div>
          </div>
        </div>

        <div className="cnnarch-badge">Key Innovation</div>
        <p className="cnnarch-innovation">{a.innovation}</p>
        <pre className="cnnarch-code">{a.code}</pre>
      </div>
    </div>
  );
}
