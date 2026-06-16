/* Lesson: Data Cleaning and Validation — Full Pipeline
 * Visual: 5-stage pipeline with issue counter */
import React, { useState } from 'react';
import './visual.css';

const STAGES = [
  {
    id:'raw', label:'Raw data', issues:23,
    checks:['✗ 12 duplicate rows','✗ 4 columns with >20% NaN','✗ Dates in 3 different formats','✗ Negative amounts present','✗ Category column has typos'],
    code:'df.shape  # (1847, 14)',
  },
  {
    id:'dedup', label:'Deduplication', issues:11,
    checks:['✓ 12 duplicate rows removed','✗ 4 columns with >20% NaN','✗ Dates in 3 different formats','✗ Negative amounts present','✗ Category column has typos'],
    code:`df = df.drop_duplicates()\n# (1835, 14)`,
  },
  {
    id:'nulls', label:'Handle NaN', issues:7,
    checks:['✓ Duplicates removed','✓ 2 columns dropped (>50% NaN)','✓ 2 columns filled with median','✗ Dates in 3 different formats','✗ Negative amounts present'],
    code:`df = df.dropna(thresh=len(df)*0.5, axis=1)\ndf['revenue'].fillna(df['revenue'].median(), inplace=True)`,
  },
  {
    id:'types', label:'Fix types', issues:3,
    checks:['✓ Duplicates removed','✓ NaN handled','✓ Dates standardised to datetime','✓ Negatives removed','✗ Category typos remain'],
    code:`df['date'] = pd.to_datetime(df['date'], dayfirst=True)\ndf = df[df['amount'] > 0]`,
  },
  {
    id:'clean', label:'Validated', issues:0,
    checks:['✓ No duplicates','✓ NaN handled','✓ Consistent date format','✓ Valid amounts only','✓ Categories normalised'],
    code:`df['category'] = df['category'].str.strip().str.title()\n# Final shape: (1791, 12) — ready for analysis`,
  },
];

const CapCleanVisualization = () => {
  const [sel, setSel] = useState('raw');
  const s = STAGES.find(x=>x.id===sel);
  return (
    <div className="capclean-wrap">
      <header className="capclean-head">
        <span className="capclean-badge">Capstone</span>
        <h2>Data Cleaning Pipeline</h2>
        <p>Each stage reduces issues — track the count</p>
      </header>
      <div className="capclean-pipeline">
        {STAGES.map((st,i)=>(
          <React.Fragment key={st.id}>
            <button className={`capclean-stage ${sel===st.id?'capclean-stage--on':''} ${st.issues===0?'capclean-stage--done':''}`} onClick={()=>setSel(st.id)}>
              <span className="capclean-stage-label">{st.label}</span>
              <span className={`capclean-count ${st.issues===0?'capclean-count--zero':''}`}>{st.issues} issues</span>
            </button>
            {i<STAGES.length-1 && <span className="capclean-arr">→</span>}
          </React.Fragment>
        ))}
      </div>
      <pre className="capclean-code"><code>{s.code}</code></pre>
      <div className="capclean-checks">
        {s.checks.map((c,i)=><div key={i} className={`capclean-check ${c.startsWith('✓')?'capclean-check--ok':'capclean-check--err'}`}>{c}</div>)}
      </div>
    </div>
  );
};
export default CapCleanVisualization;
