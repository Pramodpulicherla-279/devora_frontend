/* Lesson: Exporting Cleaned Data — to_csv, to_excel, and Sharing Results
 * Visual type: ILLUSTRATION
 * Three export targets with code, options, and what the output looks like */
import React, { useState } from 'react';
import './visual.css';

const TARGETS = [
  {
    id: 'csv',
    icon: '📄',
    label: 'to_csv()',
    code: `# Basic export
df.to_csv('cleaned_orders.csv', index=False)

# With encoding and separator options
df.to_csv('orders_semicolon.csv',
    sep=';',
    encoding='utf-8-sig',  # Excel-friendly UTF-8
    index=False)`,
    options: [
      { key: 'index=False', why: "Don't write the row numbers as a column — almost always what you want." },
      { key: "sep=';'",     why: 'Use semicolons in locales where , is a decimal separator (e.g. Germany).' },
      { key: "encoding='utf-8-sig'", why: 'Adds BOM byte; makes Excel open the file with correct encoding.' },
    ],
    output: 'city,amount,category,rep\nMumbai,4200,Electronics,Aisha\nPune,1850,Accessories,Ravi\n...',
    note: 'CSV is the universal handoff format. Always pass index=False unless your index contains meaningful data.',
  },
  {
    id: 'excel',
    icon: '📊',
    label: 'to_excel()',
    code: `# Single sheet
df.to_excel('report.xlsx', index=False,
    sheet_name='Cleaned Orders')

# Multiple sheets
with pd.ExcelWriter('full_report.xlsx') as writer:
    df.to_excel(writer, sheet_name='Orders',   index=False)
    summary.to_excel(writer, sheet_name='Summary', index=False)`,
    options: [
      { key: 'sheet_name=', why: 'Name the sheet — default is "Sheet1".' },
      { key: 'ExcelWriter', why: 'Context manager that lets you write multiple sheets to one file.' },
    ],
    output: '[Excel file: Cleaned Orders tab]\nrow 1: city | amount | category | rep\nrow 2: Mumbai | 4200 | Electronics | Aisha\n...',
    note: 'Requires openpyxl. If stakeholders need formatted Excel, consider xlsxwriter for styling.',
  },
  {
    id: 'json',
    icon: '🔗',
    label: 'to_json()',
    code: `# Records format (list of dicts — most useful)
df.to_json('orders.json', orient='records',
    indent=2)

# Read it back
pd.read_json('orders.json')`,
    options: [
      { key: "orient='records'", why: 'Each row becomes a dict. Best for APIs and downstream Python code.' },
      { key: 'indent=2',        why: 'Pretty-prints the JSON — human-readable.' },
    ],
    output: '[\n  {"city":"Mumbai","amount":4200,"category":"Electronics"},\n  {"city":"Pune","amount":1850,...}\n]',
    note: "orient='records' produces a list of dicts — the easiest format to feed into another system or API.",
  },
];

const PdExportVisualization = () => {
  const [sel, setSel] = useState('csv');
  const t = TARGETS.find(x => x.id === sel);

  return (
    <div className="pdexp-wrap">
      <header className="pdexp-head">
        <span className="pdexp-badge">Pandas &amp; NumPy</span>
        <h2>Exporting Cleaned Data</h2>
        <p>Three formats — pick the right one for your audience</p>
      </header>

      <div className="pdexp-tabs">
        {TARGETS.map(tgt => (
          <button key={tgt.id} className={`pdexp-tab ${sel===tgt.id?'pdexp-tab--on':''}`} onClick={()=>setSel(tgt.id)}>
            <span>{tgt.icon}</span> {tgt.label}
          </button>
        ))}
      </div>

      <pre className="pdexp-code"><code>{t.code}</code></pre>

      <div className="pdexp-options">
        <div className="pdexp-opt-label">Key options</div>
        {t.options.map(o => (
          <div key={o.key} className="pdexp-opt">
            <code className="pdexp-opt-key">{o.key}</code>
            <span className="pdexp-opt-why">{o.why}</span>
          </div>
        ))}
      </div>

      <div className="pdexp-output-wrap">
        <div className="pdexp-output-label">File preview</div>
        <pre className="pdexp-output"><code>{t.output}</code></pre>
      </div>

      <div className="pdexp-note">{t.note}</div>
    </div>
  );
};

export default PdExportVisualization;
