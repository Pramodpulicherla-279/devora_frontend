import { useState } from 'react';
import './visual.css';

const STEPS = [
  {
    label: 'Load Data',
    icon: '📂',
    code: "df = pd.read_csv('data.csv')",
    desc: 'Read raw dataset into a DataFrame.',
  },
  {
    label: 'EDA',
    icon: '🔍',
    code: 'df.describe(); df.isnull().sum()',
    desc: 'Explore distributions and missing values.',
  },
  {
    label: 'Feature Eng.',
    icon: '⚙️',
    code: "df['age_group'] = pd.cut(df['age'], bins=[0,30,60,100])",
    desc: 'Create or transform features for the model.',
  },
  {
    label: 'Split / Scale',
    icon: '✂️',
    code: 'X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2)',
    desc: 'Hold out test data before any scaling.',
  },
  {
    label: 'Train Model',
    icon: '🤖',
    code: 'model = RandomForestClassifier(); model.fit(X_train, y_train)',
    desc: 'Fit the chosen algorithm on training data.',
  },
  {
    label: 'Evaluate',
    icon: '📊',
    code: 'print(classification_report(y_test, model.predict(X_test)))',
    desc: 'Measure accuracy, precision, recall on unseen data.',
  },
];

export default function SvEndToEndVisualization() {
  const [active, setActive] = useState(null);

  return (
    <div className="svend-wrap">
      <h3 className="svend-title">ML Pipeline — End to End</h3>
      <p className="svend-hint">Click a step to see the scikit-learn snippet.</p>

      <div className="svend-stepper">
        {STEPS.map((s, i) => (
          <div key={i} className="svend-step-row">
            <div className={`svend-step ${active === i ? 'svend-step--active' : ''}`}
              onClick={() => setActive(active === i ? null : i)}>
              <div className="svend-step-num">{i + 1}</div>
              <div className="svend-step-info">
                <div className="svend-step-label">{s.icon} {s.label}</div>
                {active === i && (
                  <>
                    <div className="svend-step-desc">{s.desc}</div>
                    <pre className="svend-code">{s.code}</pre>
                  </>
                )}
              </div>
            </div>
            {i < STEPS.length - 1 && <div className="svend-connector" />}
          </div>
        ))}
      </div>
    </div>
  );
}
