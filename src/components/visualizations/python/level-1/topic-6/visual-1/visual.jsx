/* Lesson: Reading and Writing Files with Python
 * Visual type: ILLUSTRATION
 * Shows the open/read/write cycle with CSV parsing step-by-step */
import React, { useState } from 'react';
import './visual.css';

const STEPS = [
  {
    id: 'open',
    label: '1. open()',
    code: `with open('orders.csv', 'r', encoding='utf-8') as f:
    # f is a file object — not yet read
    # 'r' = read mode, 'w' = write, 'a' = append`,
    note: "Always use 'with open(...)' — it closes the file automatically even if your code crashes.",
  },
  {
    id: 'read',
    label: '2. csv.reader()',
    code: `import csv
with open('orders.csv', 'r') as f:
    reader = csv.reader(f)
    header = next(reader)      # ['order_id','city','amount']
    for row in reader:
        print(row)             # ['1001', 'Mumbai', '4200']`,
    note: "csv.reader() gives you each row as a list. next() consumes the header without looping over it.",
  },
  {
    id: 'dict',
    label: '3. DictReader',
    code: `import csv
orders = []
with open('orders.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        orders.append(row)
# row = {'order_id':'1001','city':'Mumbai','amount':'4200'}`,
    note: "DictReader uses the header row as keys — more readable than indexing by position.",
  },
  {
    id: 'write',
    label: '4. Write CSV',
    code: `with open('cleaned.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f,
        fieldnames=['city','amount','tier'])
    writer.writeheader()
    for order in results:
        writer.writerow(order)`,
    note: "newline='' prevents extra blank lines on Windows. Always writeheader() first.",
  },
];

const PyFileIOVisualization = () => {
  const [sel, setSel] = useState('open');
  const s = STEPS.find(x=>x.id===sel);

  return (
    <div className="pyfio-wrap">
      <header className="pyfio-head">
        <span className="pyfio-badge">Python Basics</span>
        <h2>File I/O</h2>
        <p>Reading and writing CSV files with Python builtins</p>
      </header>

      <div className="pyfio-flow">
        {STEPS.map((st, i) => (
          <div key={st.id} className="pyfio-flow-item">
            <button className={`pyfio-flow-btn ${sel===st.id?'pyfio-flow-btn--on':''}`} onClick={()=>setSel(st.id)}>{st.label}</button>
            {i < STEPS.length-1 && <span className="pyfio-flow-arr">→</span>}
          </div>
        ))}
      </div>

      <pre className="pyfio-code"><code>{s.code}</code></pre>
      <div className="pyfio-note">{s.note}</div>

      <div className="pyfio-tip">
        <strong>For real data analysis</strong> — use pandas' <code>pd.read_csv()</code> instead. This lesson shows you how Python handles files so you understand what pandas does under the hood.
      </div>
    </div>
  );
};

export default PyFileIOVisualization;
