// ...existing code...
import React, { useState } from "react";
import "./visual.css";

// ── Sample dataset (same across all modes) ───────────────────────────
const PRODUCTS = [
  { id: 101, name: "Wireless Headphones", price: 2499, category: "Electronics", stock: 24 },
  { id: 102, name: "Mechanical Keyboard", price: 4999, category: "Electronics", stock: 10 },
  { id: 103, name: "USB-C Hub",           price: 1299, category: "Electronics", stock: 35 },
  { id: 104, name: "Desk Lamp",           price:  899, category: "Furniture",   stock: 18 },
  { id: 105, name: "Desk Chair",          price: 8999, category: "Furniture",   stock:  5 },
  { id: 106, name: "Phone Stand",         price:  499, category: "Accessories", stock: 50 },
];

const USERS = [
  { id: 1, name: "Arjun Kumar", city: "Hyderabad" },
  { id: 2, name: "Priya Reddy", city: "Bangalore" },
  { id: 3, name: "Rahul Singh", city: "Mumbai"    },
  { id: 4, name: "Sneha Patel", city: "Delhi"     },
];

const ORDERS = [
  { id: 1, user_id: 1, amount: 2499 },
  { id: 2, user_id: 1, amount: 4999 },
  { id: 3, user_id: 2, amount: 2499 },
  { id: 4, user_id: 4, amount: 8999 },
  // Rahul Singh (id: 3) has no orders intentionally
];

// ── Mode definitions (mirrors MODES in visual.jsx) ───────────────────
const MODES = {
  select: {
    title: "SELECT — read all rows from a table",
    description:
      "SELECT is how you ask the database for data. SELECT * returns every column in every row. You can also name specific columns — SELECT name, price — to get only what you need. SQL is read by the database top‑to‑bottom, but executes FROM first, then SELECT last.",
    code: `SELECT *
FROM   products;`,
  },
  where: {
    title: "WHERE — filter rows by a condition",
    description:
      "WHERE reduces the rows the database returns. Only rows where the condition evaluates to true come back. The database reads every row, checks the condition, and discards non‑matching rows before building the result. Dimmed rows below fail the WHERE check.",
    code: `SELECT *
FROM   products
WHERE  category = 'Electronics';`,
  },
  orderby: {
    title: "ORDER BY — sort results",
    description:
      "ORDER BY sorts the returned rows. ASC (smallest → largest) is the default and can be omitted. DESC flips it. Without ORDER BY the database returns rows in no guaranteed order — never assume a fixed order unless you ask for one explicitly.",
    code: `SELECT *
FROM   products
ORDER BY price DESC;`,
  },
  join: {
    title: "INNER JOIN — combine rows from two tables",
    description:
      "JOIN links rows from two tables that share a matching value. INNER JOIN returns only rows where a match exists in both tables. Rahul Singh has no orders — he is excluded from the result entirely. Use LEFT JOIN to keep all rows from the left table.",
    code: `SELECT  u.name, u.city,
        o.id    AS order_id,
        o.amount
FROM    users  u
INNER JOIN orders o
        ON u.id = o.user_id;`,
  },
  groupby: {
    title: "GROUP BY — collapse rows into summary data",
    description:
      "GROUP BY collapses many rows into one row per group. Aggregate functions — COUNT, SUM, AVG, MAX, MIN — run on each group separately. Use HAVING (not WHERE) to filter groups after aggregation. Every column in SELECT must be in GROUP BY or inside an aggregate function.",
    code: `SELECT   category,
         COUNT(*)    AS orders,
         SUM(amount) AS revenue
FROM     orders o
JOIN     products p
         ON o.product_id = p.id
GROUP BY category
ORDER BY revenue DESC;`,
  },
};

// ── Anatomy definitions for the RIGHT panel ──────────────────────────
const ANATOMY = {
  select: {
    active: "SELECT",
    lines: [
      { key: "SELECT",   parts: [{ cls: "sqlv-kw-select",  text: "SELECT" }, { cls: "sqlv-col",   text: " *"        }] },
      { key: "FROM",     parts: [{ cls: "sqlv-kw-from",    text: "FROM"   }, { cls: "sqlv-table", text: "   products" }] },
    ],
    pills: [
      { cls: "sqlv-pill-select", label: "SELECT clause"  },
      { cls: "sqlv-pill-from",   label: "FROM — table"   },
      { cls: "sqlv-pill-col",    label: "column list"    },
    ],
  },
  where: {
    active: "WHERE",
    lines: [
      { key: "SELECT",  parts: [{ cls: "sqlv-kw-select", text: "SELECT" }, { cls: "sqlv-col",   text: " *"                    }] },
      { key: "FROM",    parts: [{ cls: "sqlv-kw-from",   text: "FROM"   }, { cls: "sqlv-table", text: "   products"            }] },
      { key: "WHERE",   parts: [{ cls: "sqlv-kw-where",  text: "WHERE"  }, { cls: "sqlv-col",   text: "  category = " }, { cls: "sqlv-val", text: "'Electronics'" }] },
    ],
    pills: [
      { cls: "sqlv-pill-select", label: "SELECT"         },
      { cls: "sqlv-pill-from",   label: "FROM"           },
      { cls: "sqlv-pill-where",  label: "WHERE — filter" },
      { cls: "sqlv-pill-val",    label: "string value"   },
    ],
  },
  orderby: {
    active: "ORDER BY",
    lines: [
      { key: "SELECT",   parts: [{ cls: "sqlv-kw-select",  text: "SELECT"   }, { cls: "sqlv-col",   text: " *"       }] },
      { key: "FROM",     parts: [{ cls: "sqlv-kw-from",    text: "FROM"     }, { cls: "sqlv-table", text: "   products" }] },
      { key: "ORDER BY", parts: [{ cls: "sqlv-kw-orderby", text: "ORDER BY" }, { cls: "sqlv-col",   text: " price "  }, { cls: "sqlv-dir", text: "DESC" }] },
    ],
    pills: [
      { cls: "sqlv-pill-select",  label: "SELECT"              },
      { cls: "sqlv-pill-from",    label: "FROM"                },
      { cls: "sqlv-pill-orderby", label: "ORDER BY — sort"     },
      { cls: "sqlv-pill-dir",     label: "ASC / DESC direction" },
    ],
  },
  join: {
    active: "INNER JOIN",
    lines: [
      { key: "SELECT",     parts: [{ cls: "sqlv-kw-select", text: "SELECT"     }, { cls: "sqlv-col",   text: " u.name, o.amount" }] },
      { key: "FROM",       parts: [{ cls: "sqlv-kw-from",   text: "FROM"       }, { cls: "sqlv-table", text: "   users u"        }] },
      { key: "INNER JOIN", parts: [{ cls: "sqlv-kw-join",   text: "INNER JOIN" }, { cls: "sqlv-table", text: " orders o"         }] },
      { key: "ON",         parts: [{ cls: "sqlv-kw-join",   text: "ON"         }, { cls: "sqlv-col",   text: " u.id = o.user_id" }] },
    ],
    pills: [
      { cls: "sqlv-pill-from",  label: "FROM — left table"  },
      { cls: "sqlv-pill-join",  label: "INNER JOIN — right" },
      { cls: "sqlv-pill-where", label: "ON — join condition" },
    ],
  },
  groupby: {
    active: "GROUP BY",
    lines: [
      { key: "SELECT",   parts: [{ cls: "sqlv-kw-select",  text: "SELECT"   }, { cls: "sqlv-col",   text: " category, COUNT(*)" }] },
      { key: "FROM",     parts: [{ cls: "sqlv-kw-from",    text: "FROM"     }, { cls: "sqlv-table", text: "   orders"            }] },
      { key: "GROUP BY", parts: [{ cls: "sqlv-kw-groupby", text: "GROUP BY" }, { cls: "sqlv-col",   text: " category"            }] },
    ],
    pills: [
      { cls: "sqlv-pill-select",  label: "SELECT + aggregate fn" },
      { cls: "sqlv-pill-from",    label: "FROM"                  },
      { cls: "sqlv-pill-groupby", label: "GROUP BY"              },
    ],
  },
};

// SQL clause execution order (used in the order card)
const EXEC_ORDER = [
  { clause: "FROM / JOIN", desc: "which tables?" },
  { clause: "WHERE",       desc: "filter rows"   },
  { clause: "GROUP BY",    desc: "form groups"   },
  { clause: "HAVING",      desc: "filter groups" },
  { clause: "SELECT",      desc: "pick columns"  },
  { clause: "ORDER BY",    desc: "sort result"   },
  { clause: "LIMIT",       desc: "cap rows"      },
];

// Active clause per mode (for the execution order card highlight)
const ACTIVE_EXEC = {
  select:  ["SELECT", "FROM / JOIN"],
  where:   ["WHERE",  "FROM / JOIN"],
  orderby: ["ORDER BY", "FROM / JOIN"],
  join:    ["FROM / JOIN"],
  groupby: ["GROUP BY", "SELECT"],
};

// ── Helper ────────────────────────────────────────────────────────────
const rupee = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

// ── Preview components (one per mode) ────────────────────────────────

function SelectPreview() {
  return (
    <table className="sqlv-table">
      <thead>
        <tr>
          <th className="sqlv-th">id</th>
          <th className="sqlv-th">name</th>
          <th className="sqlv-th">price</th>
          <th className="sqlv-th">category</th>
          <th className="sqlv-th">stock</th>
        </tr>
      </thead>
      <tbody>
        {PRODUCTS.map((p) => (
          <tr key={p.id} className="sqlv-tr">
            <td className="sqlv-td sqlv-td-muted">{p.id}</td>
            <td className="sqlv-td">{p.name}</td>
            <td className="sqlv-td sqlv-td-price">{rupee(p.price)}</td>
            <td className="sqlv-td">
              <span className={`sqlv-badge sqlv-badge-${p.category.toLowerCase()}`}>
                {p.category}
              </span>
            </td>
            <td className="sqlv-td sqlv-td-muted">{p.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function WherePreview() {
  return (
    <table className="sqlv-table">
      <thead>
        <tr>
          <th className="sqlv-th">id</th>
          <th className="sqlv-th">name</th>
          <th className="sqlv-th">price</th>
          <th className="sqlv-th">category</th>
          <th className="sqlv-th">stock</th>
        </tr>
      </thead>
      <tbody>
        {PRODUCTS.map((p) => {
          const match = p.category === "Electronics";
          return (
            <tr key={p.id} className={`sqlv-tr ${match ? "sqlv-tr-match" : "sqlv-tr-dim"}`}>
              <td className="sqlv-td sqlv-td-muted">{p.id}</td>
              <td className="sqlv-td">{p.name}</td>
              <td className="sqlv-td sqlv-td-price">{rupee(p.price)}</td>
              <td className="sqlv-td">
                <span className={`sqlv-badge sqlv-badge-${p.category.toLowerCase()}`}>
                  {p.category}
                </span>
              </td>
              <td className="sqlv-td sqlv-td-muted">{p.stock}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function OrderByPreview() {
  const sorted = [...PRODUCTS].sort((a, b) => b.price - a.price);
  return (
    <table className="sqlv-table">
      <thead>
        <tr>
          <th className="sqlv-th">id</th>
          <th className="sqlv-th">name</th>
          <th className="sqlv-th sqlv-th-sort">price ↓ DESC</th>
          <th className="sqlv-th">category</th>
          <th className="sqlv-th">stock</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((p, i) => (
          <tr key={p.id} className={`sqlv-tr ${i === 0 ? "sqlv-tr-top" : ""}`}>
            <td className="sqlv-td sqlv-td-muted">{p.id}</td>
            <td className="sqlv-td">{p.name}</td>
            <td className="sqlv-td sqlv-td-price sqlv-td-strong">{rupee(p.price)}</td>
            <td className="sqlv-td">
              <span className={`sqlv-badge sqlv-badge-${p.category.toLowerCase()}`}>
                {p.category}
              </span>
            </td>
            <td className="sqlv-td sqlv-td-muted">{p.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function JoinPreview() {
  const matchedUserIds = new Set(ORDERS.map((o) => o.user_id));
  const joined = USERS.flatMap((u) => {
    const userOrders = ORDERS.filter((o) => o.user_id === u.id);
    if (userOrders.length === 0) return [];
    return userOrders.map((o) => ({
      name: u.name,
      city: u.city,
      order_id: o.id,
      amount: o.amount,
    }));
  });
  const excluded = USERS.filter((u) => !matchedUserIds.has(u.id));

  return (
    <div>
      {/* Two source tables side by side */}
      <div className="sqlv-join-sources">
        <div className="sqlv-join-side">
          <div className="sqlv-join-label">users</div>
          <table className="sqlv-table sqlv-table-sm">
            <thead>
              <tr>
                <th className="sqlv-th">id</th>
                <th className="sqlv-th">name</th>
                <th className="sqlv-th">city</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((u) => (
                <tr
                  key={u.id}
                  className={`sqlv-tr ${
                    matchedUserIds.has(u.id) ? "sqlv-tr-match" : "sqlv-tr-dim"
                  }`}
                >
                  <td className="sqlv-td sqlv-td-muted">{u.id}</td>
                  <td className="sqlv-td">{u.name}</td>
                  <td className="sqlv-td sqlv-td-muted">{u.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sqlv-join-connector">
          <div className="sqlv-join-connector-line" />
          <div className="sqlv-join-connector-text">ON user_id</div>
        </div>

        <div className="sqlv-join-side">
          <div className="sqlv-join-label">orders</div>
          <table className="sqlv-table sqlv-table-sm">
            <thead>
              <tr>
                <th className="sqlv-th">id</th>
                <th className="sqlv-th">user_id</th>
                <th className="sqlv-th">amount</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o) => (
                <tr key={o.id} className="sqlv-tr sqlv-tr-match">
                  <td className="sqlv-td sqlv-td-muted">{o.id}</td>
                  <td className="sqlv-td sqlv-td-strong">{o.user_id}</td>
                  <td className="sqlv-td sqlv-td-price">{rupee(o.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Joined result */}
      <div className="sqlv-join-result-header">
        INNER JOIN result
        {excluded.length > 0 && (
          <span className="sqlv-excluded">
            {" "}— {excluded.map((u) => u.name).join(", ")} excluded (no orders)
          </span>
        )}
      </div>
      <table className="sqlv-table">
        <thead>
          <tr>
            <th className="sqlv-th">name</th>
            <th className="sqlv-th">city</th>
            <th className="sqlv-th">order_id</th>
            <th className="sqlv-th">amount</th>
          </tr>
        </thead>
        <tbody>
          {joined.map((r, i) => (
            <tr key={i} className="sqlv-tr sqlv-tr-match">
              <td className="sqlv-td">{r.name}</td>
              <td className="sqlv-td sqlv-td-muted">{r.city}</td>
              <td className="sqlv-td sqlv-td-muted">{r.order_id}</td>
              <td className="sqlv-td sqlv-td-price">{rupee(r.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GroupByPreview() {
  // Simulated order-product join data
  const rows = [
    { category: "Electronics", amount: 2499 },
    { category: "Electronics", amount: 4999 },
    { category: "Electronics", amount: 2499 },
    { category: "Furniture",   amount: 8999 },
    { category: "Furniture",   amount:  899 },
    { category: "Accessories", amount:  499 },
  ];

  const groups = {};
  rows.forEach(({ category, amount }) => {
    if (!groups[category]) groups[category] = { count: 0, revenue: 0 };
    groups[category].count++;
    groups[category].revenue += amount;
  });

  const maxRevenue = Math.max(...Object.values(groups).map((g) => g.revenue));

  return (
    <div>
      <table className="sqlv-table">
        <thead>
          <tr>
            <th className="sqlv-th">category</th>
            <th className="sqlv-th sqlv-th-center">COUNT(*)</th>
            <th className="sqlv-th">SUM(amount)</th>
            <th className="sqlv-th">bar</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groups).map(([cat, data]) => (
            <tr key={cat} className="sqlv-tr">
              <td className="sqlv-td">
                <span className={`sqlv-badge sqlv-badge-${cat.toLowerCase()}`}>{cat}</span>
              </td>
              <td className="sqlv-td sqlv-td-center">{data.count}</td>
              <td className="sqlv-td sqlv-td-price">{rupee(data.revenue)}</td>
              <td className="sqlv-td">
                <div className="sqlv-bar-track">
                  <div
                    className={`sqlv-bar-fill sqlv-bar-${cat.toLowerCase()}`}
                    style={{ width: `${Math.round((data.revenue / maxRevenue) * 100)}%` }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="sqlv-group-note">
        <strong>GROUP BY</strong> collapsed {rows.length} order rows → {Object.keys(groups).length} category rows
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────
const SqlQueryVisual = () => {
  const [mode, setMode] = useState("select");
  const info    = MODES[mode];
  const anatomy = ANATOMY[mode];
  const activeExec = ACTIVE_EXEC[mode];

  const previewMap = {
    select:  <SelectPreview  />,
    where:   <WherePreview   />,
    orderby: <OrderByPreview />,
    join:    <JoinPreview    />,
    groupby: <GroupByPreview />,
  };

  const modeLabels = {
    select:  "SELECT",
    where:   "WHERE",
    orderby: "ORDER BY",
    join:    "JOIN",
    groupby: "GROUP BY",
  };

  return (
    <div className="sqlv-container">
      <header className="sqlv-header">
        <h2>SQL — How Queries Are Built</h2>
        <p className="sqlv-tagline">
          Switch between SELECT, WHERE, ORDER BY, JOIN and GROUP BY to see how
          each clause changes the result.
        </p>
      </header>

      <div className="sqlv-layout">
        {/* LEFT: live query result preview */}
        <section className="sqlv-panel sqlv-left">
          <div className="sqlv-mode-buttons">
            {Object.keys(MODES).map((m) => (
              <button
                key={m}
                type="button"
                className={`sqlv-mode-btn ${mode === m ? "sqlv-mode-btn-active" : ""}`}
                onClick={() => setMode(m)}
              >
                {modeLabels[m]}
              </button>
            ))}
          </div>

          <p className="sqlv-panel-sub">
            The table below shows the actual rows the database returns for this
            query. Highlighted rows match; dimmed rows are filtered out.
          </p>

          <div className={`sqlv-preview sqlv-preview-${mode}`}>
            {previewMap[mode]}
          </div>

          <br />
          <h3 className="sqlv-info-title">{info.title}</h3>
          <p className="sqlv-info-text">{info.description}</p>

          <pre className="sqlv-code-block">
            <code>{info.code}</code>
          </pre>

          {/* Mode-specific hints — mirrors cssv-hints in visual.jsx */}
          {mode === "select" && (
            <ul className="sqlv-hints">
              <li>Use <strong>SELECT *</strong> for exploration, but name columns explicitly in production code.</li>
              <li>SQL keywords are conventionally <strong>UPPERCASE</strong>, but databases accept lowercase too.</li>
              <li>Every SQL query must have at least a <strong>SELECT</strong> and a <strong>FROM</strong> clause.</li>
            </ul>
          )}
          {mode === "where" && (
            <ul className="sqlv-hints">
              <li>Combine conditions with <strong>AND</strong> (both true) or <strong>OR</strong> (either true).</li>
              <li>Use <strong>LIKE 'Wire%'</strong> for partial text matching — % means any characters.</li>
              <li>Use <strong>IS NULL</strong> and <strong>IS NOT NULL</strong> to check for missing values.</li>
            </ul>
          )}
          {mode === "orderby" && (
            <ul className="sqlv-hints">
              <li>Without ORDER BY the database returns rows in <strong>no guaranteed order</strong> — never assume one.</li>
              <li>Sort by multiple columns: <strong>ORDER BY category, price DESC</strong>.</li>
              <li>Combine with <strong>LIMIT</strong> to get the top-N results efficiently.</li>
            </ul>
          )}
          {mode === "join" && (
            <ul className="sqlv-hints">
              <li>Use <strong>INNER JOIN</strong> when you only want rows that match in both tables.</li>
              <li>Use <strong>LEFT JOIN</strong> to keep all rows from the left table, even without a match.</li>
              <li>Always join on the <strong>foreign key</strong>: orders.user_id = users.id, not orders.id = users.id.</li>
            </ul>
          )}
          {mode === "groupby" && (
            <ul className="sqlv-hints">
              <li>Every column in SELECT must be in <strong>GROUP BY</strong> or inside an aggregate function.</li>
              <li>Use <strong>HAVING</strong> to filter groups after aggregation — not WHERE.</li>
              <li><strong>COUNT(*)</strong> counts all rows; <strong>COUNT(column)</strong> skips NULL values.</li>
            </ul>
          )}
        </section>

        {/* RIGHT: anatomy card + execution order */}
        <section className="sqlv-panel sqlv-right">
          <div className="sqlv-rule-card">
            <div className="sqlv-rule-title">Anatomy of a SQL query</div>
            <pre className="sqlv-rule-code">
              <code>
                {anatomy.lines.map((line, i) => (
                  <div
                    key={i}
                    className={`sqlv-anat-line ${
                      anatomy.active === line.key ? "sqlv-anat-line-active" : ""
                    }`}
                  >
                    {line.parts.map((part, j) => (
                      <span key={j} className={part.cls}>
                        {part.text}
                      </span>
                    ))}
                  </div>
                ))}
                <div className="sqlv-anat-line">
                  <span className="sqlv-semi">;</span>
                </div>
              </code>
            </pre>
            <div className="sqlv-rule-explain">
              {anatomy.pills.map((p, i) => (
                <span key={i} className={`sqlv-pill ${p.cls}`}>
                  {p.label}
                </span>
              ))}
            </div>
          </div>

          {/* Execution order card — unique SQL concept worth teaching */}
          <div className="sqlv-order-card">
            <div className="sqlv-order-title">Clause execution order</div>
            <ol className="sqlv-order-list">
              {EXEC_ORDER.map((item) => {
                const isActive = activeExec.includes(item.clause);
                return (
                  <li
                    key={item.clause}
                    className={`sqlv-order-item ${isActive ? "sqlv-order-item-active" : ""}`}
                  >
                    <span className="sqlv-order-clause">{item.clause}</span>
                    <span className="sqlv-order-desc">{item.desc}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SqlQueryVisual;
// ...existing code...