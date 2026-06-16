import { useState } from "react";
import "./visual.css";

const treeData = {
  id: 0,
  feature: "Petal Length",
  threshold: "≤ 2.45",
  gini: 0.67,
  children: [
    {
      id: 1,
      label: "Setosa",
      gini: 0.0,
      color: "#56d364",
      leaf: true,
    },
    {
      id: 2,
      feature: "Petal Width",
      threshold: "≤ 1.75",
      gini: 0.5,
      children: [
        { id: 3, label: "Versicolor", gini: 0.05, color: "#58a6ff", leaf: true },
        { id: 4, label: "Virginica", gini: 0.04, color: "#a78bfa", leaf: true },
      ],
    },
  ],
};

function TreeNode({ node, depth = 0 }) {
  const [open, setOpen] = useState(true);

  if (node.leaf) {
    return (
      <div className="svdtree-leaf" style={{ borderColor: node.color }}>
        <span className="svdtree-leaf-icon">🍃</span>
        <span className="svdtree-leaf-label" style={{ color: node.color }}>{node.label}</span>
        <span className="svdtree-gini">Gini: {node.gini.toFixed(2)}</span>
      </div>
    );
  }

  return (
    <div className="svdtree-node-wrap">
      <button className="svdtree-node" onClick={() => setOpen(!open)}>
        <div className="svdtree-node-feature">{node.feature}</div>
        <div className="svdtree-node-threshold">{node.threshold}</div>
        <div className="svdtree-node-gini">Gini: {node.gini.toFixed(2)}</div>
        <div className="svdtree-toggle">{open ? "▼" : "▶"}</div>
      </button>
      {open && node.children && (
        <div className="svdtree-children">
          {node.children.map((child, i) => (
            <div key={child.id} className="svdtree-branch">
              <div className="svdtree-branch-label">{i === 0 ? "True" : "False"}</div>
              <TreeNode node={child} depth={depth + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SvDecisionTreeVisualization() {
  return (
    <div className="svdtree-wrap">
      <h2 className="svdtree-title">Decision Tree — Iris Dataset</h2>
      <p className="svdtree-hint">Click any node to expand or collapse that branch.</p>
      <div className="svdtree-container">
        <TreeNode node={treeData} />
      </div>
      <div className="svdtree-legend">
        <div className="svdtree-legend-item"><span style={{color:"#56d364"}}>●</span> Setosa</div>
        <div className="svdtree-legend-item"><span style={{color:"#58a6ff"}}>●</span> Versicolor</div>
        <div className="svdtree-legend-item"><span style={{color:"#a78bfa"}}>●</span> Virginica</div>
        <div className="svdtree-legend-item svdtree-legend-gini">Gini: 0 = pure node</div>
      </div>
    </div>
  );
}
