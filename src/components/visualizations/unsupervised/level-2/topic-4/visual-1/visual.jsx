import { useState } from "react";
import "./visual.css";

// Pre-computed t-SNE positions (3 beautiful clusters)
const TSNE = [
  // Cluster A - indigo
  {x:65,y:80,c:0},{x:78,y:65,c:0},{x:55,y:92,c:0},{x:82,y:78,c:0},{x:70,y:58,c:0},
  {x:60,y:70,c:0},{x:88,y:68,c:0},{x:72,y:90,c:0},
  // Cluster B - green
  {x:190,y:70,c:1},{x:205,y:55,c:1},{x:180,y:60,c:1},{x:215,y:78,c:1},{x:198,y:85,c:1},
  {x:185,y:45,c:1},{x:220,y:62,c:1},{x:207,y:90,c:1},
  // Cluster C - orange
  {x:130,y:165,c:2},{x:145,y:178,c:2},{x:118,y:158,c:2},{x:155,y:168,c:2},{x:138,y:185,c:2},
  {x:122,y:172,c:2},{x:150,y:155,c:2},{x:140,y:175,c:2},
];
// PCA on same data (less separated)
const PCA = [
  {x:90,y:90,c:0},{x:105,y:78,c:0},{x:80,y:100,c:0},{x:110,y:92,c:0},{x:98,y:75,c:0},
  {x:85,y:85,c:0},{x:115,y:82,c:0},{x:100,y:105,c:0},
  {x:160,y:100,c:1},{x:175,y:88,c:1},{x:148,y:93,c:1},{x:183,y:108,c:1},{x:167,y:115,c:1},
  {x:152,y:80,c:1},{x:188,y:94,c:1},{x:172,y:120,c:1},
  {x:125,y:145,c:2},{x:138,y:130,c:2},{x:112,y:152,c:2},{x:145,y:140,c:2},{x:130,y:162,c:2},
  {x:118,y:140,c:2},{x:148,y:128,c:2},{x:136,y:158,c:2},
];
const COLORS = ["#818cf8","#56d364","#f97316"];
const PERP_OPTS = [5,30,50];

export default function UnsupTsneVisualization() {
  const [view, setView] = useState("tsne");
  const [perp, setPerp] = useState(30);
  const pts = view==="tsne" ? TSNE : PCA;

  return (
    <div className="unsuptsne-wrap">
      <div className="unsuptsne-header">
        <h3 className="unsuptsne-title">t-SNE — Non-linear Dimensionality Reduction</h3>
      </div>

      <div className="unsuptsne-controls">
        <div className="unsuptsne-view-btns">
          <button className={`unsuptsne-btn ${view==="tsne"?"unsuptsne-btn--on":""}`} onClick={()=>setView("tsne")}>t-SNE</button>
          <button className={`unsuptsne-btn ${view==="pca"?"unsuptsne-btn--on":""}`} onClick={()=>setView("pca")}>PCA (same data)</button>
        </div>
        {view==="tsne" && (
          <div className="unsuptsne-perp">
            <span className="unsuptsne-perp-label">Perplexity:</span>
            {PERP_OPTS.map(p=>(
              <button key={p} className={`unsuptsne-perp-btn ${perp===p?"unsuptsne-perp-btn--on":""}`} onClick={()=>setPerp(p)}>{p}</button>
            ))}
          </div>
        )}
      </div>

      <svg viewBox="0 0 280 220" className="unsuptsne-svg">
        {/* Cluster halos */}
        {view==="tsne" && [
          {cx:72,cy:74,r:42,c:0},{cx:198,cy:68,r:42,c:1},{cx:137,cy:170,r:40,c:2}
        ].map((h,i)=>(
          <circle key={i} cx={h.cx} cy={h.cy} r={h.r} fill={COLORS[h.c]} opacity={0.07}/>
        ))}
        {pts.map((p,i)=>(
          <circle key={i} cx={p.x} cy={p.y} r={5.5} fill={COLORS[p.c]} opacity={0.85}/>
        ))}
        <line x1={10} y1={205} x2={270} y2={205} stroke="#30363d" strokeWidth={1}/>
        <line x1={10} y1={10} x2={10} y2={205} stroke="#30363d" strokeWidth={1}/>
        {COLORS.map((c,i)=>(
          <g key={i}>
            <circle cx={30+i*78} cy={215} r={4} fill={c}/>
            <text x={38+i*78} y={218} fill="#a3adbb" fontSize={7}>Cluster {i+1}</text>
          </g>
        ))}
      </svg>

      <div className="unsuptsne-compare">
        <div className={`unsuptsne-badge ${view==="tsne"?"unsuptsne-badge--tsne":"unsuptsne-badge--pca"}`}>
          {view==="tsne"
            ? `t-SNE (perplexity=${perp}): Clusters are beautifully separated — reveals local structure.`
            : "PCA: Linear projection — clusters overlap more, harder to distinguish."}
        </div>
      </div>

      <div className="unsuptsne-params">
        <div className="unsuptsne-param"><span>Algorithm</span><span>{view==="tsne"?"t-SNE (non-linear)":"PCA (linear)"}</span></div>
        <div className="unsuptsne-param"><span>Preserves</span><span>{view==="tsne"?"Local distances":"Global variance"}</span></div>
        <div className="unsuptsne-param"><span>Best for</span><span>{view==="tsne"?"Visualization":"Feature reduction"}</span></div>
      </div>
    </div>
  );
}
