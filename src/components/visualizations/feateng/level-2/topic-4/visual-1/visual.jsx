import { useState } from "react";
import "./visual.css";

const docs = [
  "the cat sat on the mat",
  "the dog sat on the log",
  "the cat and the dog",
];

const vocab = ["and","cat","dog","log","mat","on","sat","the"];

function countVec(doc) {
  const words = doc.split(" ");
  return vocab.map(w => words.filter(x => x === w).length);
}

function tfidf(docs) {
  const counts = docs.map(countVec);
  const N = docs.length;
  return counts.map(row =>
    row.map((c, j) => {
      const df = counts.filter(r => r[j] > 0).length;
      const idf = Math.log(N / df + 1);
      return c > 0 ? +(c * idf).toFixed(2) : 0;
    })
  );
}

export default function FeTextVisualization() {
  const [tab, setTab] = useState("bow");
  const matrix = tab === "bow" ? docs.map(countVec) : tfidf(docs);
  const maxVal = Math.max(...matrix.flat());

  return (
    <div className="fetext-wrap">
      <h3 className="fetext-title">Text Feature Extraction</h3>

      <div className="fetext-tabs">
        <button className={`fetext-tab ${tab === "bow" ? "fetext-tab--on" : ""}`} onClick={() => setTab("bow")}>CountVectorizer</button>
        <button className={`fetext-tab ${tab === "tfidf" ? "fetext-tab--on" : ""}`} onClick={() => setTab("tfidf")}>TfidfVectorizer</button>
      </div>

      <div className="fetext-docs">
        {docs.map((d, i) => <div key={i} className="fetext-doc"><span className="fetext-doc-id">doc_{i}</span> {d}</div>)}
      </div>

      <div className="fetext-matrix-wrap">
        <table className="fetext-matrix">
          <thead>
            <tr><th className="fetext-th-doc">doc</th>{vocab.map(w => <th key={w}>{w}</th>)}</tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                <td className="fetext-td-doc">doc_{i}</td>
                {row.map((v, j) => (
                  <td key={j} className="fetext-cell" style={{
                    background: v > 0 ? `rgba(249,115,22,${0.12 + (v / maxVal) * 0.5})` : "transparent",
                    color: v > 0 ? "#f97316" : "#21262d",
                  }}>{v || 0}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="fetext-note">
        {tab === "bow" ? "CountVectorizer: raw term frequencies. Common words like 'the' dominate." : "TF-IDF down-weights common words, up-weights informative terms."}
      </p>
    </div>
  );
}
