import React, { useState, useReducer } from 'react';
import './visual.css';

const STATE_SOLUTIONS = {
  context: {
    label: 'Context + useReducer',
    color: '#61DAFB',
    icon: '⚛️',
    when: 'Low-medium complexity. Built into React. No extra deps.',
    code: `// 1. Create reducer
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD':    return [...state, action.item];
    case 'REMOVE': return state.filter(i => i.id !== action.id);
    default:       return state;
  }
}

// 2. Provide at root
const CartContext = createContext();
const [cart, dispatch] = useReducer(cartReducer, []);
<CartContext.Provider value={{ cart, dispatch }}>

// 3. Consume anywhere
const { cart, dispatch } = useContext(CartContext);
dispatch({ type: 'ADD', item: product });`,
  },
  zustand: {
    label: 'Zustand',
    color: '#E5C07B',
    icon: '🐻',
    when: 'Medium complexity. Minimal boilerplate. Growing favourite.',
    code: `// npm install zustand

import { create } from 'zustand';

const useCartStore = create((set) => ({
  cart: [],
  addItem: (item) =>
    set(state => ({ cart: [...state.cart, item] })),
  removeItem: (id) =>
    set(state => ({
      cart: state.cart.filter(i => i.id !== id)
    })),
}));

// Use in ANY component — no Provider needed!
const { cart, addItem } = useCartStore();`,
  },
  redux: {
    label: 'Redux Toolkit',
    color: '#C678DD',
    icon: '🏛️',
    when: 'Large apps. Strict patterns. Time-travel debugging. Team standard.',
    code: `// npm install @reduxjs/toolkit react-redux

// 1. Create a slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem:    (state, action) => { state.push(action.payload); },
    removeItem: (state, action) => {
      return state.filter(i => i.id !== action.payload);
    },
  },
});

// 2. Configure store
const store = configureStore({ reducer: { cart: cartSlice.reducer } });

// 3. Use in components
const cart = useSelector(state => state.cart);
const dispatch = useDispatch();
dispatch(addItem(product));`,
  },
};

// Simple useReducer demo
const initialCart = [];
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': return [...state, { id: Date.now(), name: action.name, price: action.price }];
    case 'REMOVE': return state.filter(i => i.id !== action.id);
    case 'CLEAR': return [];
    default: return state;
  }
}
const PRODUCTS = [
  { name: 'Laptop', price: 999, icon: '💻' },
  { name: 'Phone', price: 599, icon: '📱' },
  { name: 'Watch', price: 199, icon: '⌚' },
];

const LOCAL_VS_GLOBAL = [
  { type: 'Local State (useState)', color: '#61DAFB', scope: 'One component', examples: ['Form input values', 'Modal open/close', 'Hover state', 'Loading spinner'], use: 'Most state should be local!' },
  { type: 'Lifted State', color: '#68A063', scope: 'Parent + children', examples: ['Sibling communication', 'Shared filter value', 'Selected tab'], use: 'When 2–3 nearby components share data' },
  { type: 'Global State', color: '#C678DD', scope: 'Entire app', examples: ['Auth user', 'Theme', 'Shopping cart', 'Notifications'], use: 'Only when truly app-wide' },
];

const RctStateManagementVisualization = () => {
  const [activeSolution, setActiveSolution] = useState('context');
  const [tab, setTab] = useState('when');
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  const sol = STATE_SOLUTIONS[activeSolution];
  const total = cart.reduce((s, i) => s + i.price, 0);

  return (
    <div className="rctsm-wrap">
      <header className="rctsm-head">
        <span className="rctsm-badge">React</span>
        <h2>State Management</h2>
        <p>Local state · Lifting state · Context · Zustand · Redux Toolkit</p>
      </header>

      <div className="rctsm-tabs">
        {[['when', '🤔 When Global State?'], ['solutions', '🛠️ Solutions'], ['demo', '🎮 useReducer Demo']].map(([key, label]) => (
          <button key={key} className={`rctsm-tab ${tab === key ? 'rctsm-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* When */}
      {tab === 'when' && (
        <div className="rctsm-when">
          <p className="rctsm-desc">Most apps need far less global state than you think. Start local, lift only when needed.</p>
          <div className="rctsm-scope-cards">
            {LOCAL_VS_GLOBAL.map(s => (
              <div key={s.type} className="rctsm-scope-card" style={{ borderColor: s.color }}>
                <div className="rctsm-scope-head">
                  <span className="rctsm-scope-type" style={{ color: s.color }}>{s.type}</span>
                  <span className="rctsm-scope-scope">{s.scope}</span>
                </div>
                <ul className="rctsm-scope-examples">
                  {s.examples.map(e => <li key={e}>{e}</li>)}
                </ul>
                <div className="rctsm-scope-use">{s.use}</div>
              </div>
            ))}
          </div>
          <div className="rctsm-rule">
            <strong>Golden rule:</strong> Start with <code>useState</code>. Lift when siblings need it. Reach for global state only when prop drilling becomes genuinely painful.
          </div>
        </div>
      )}

      {/* Solutions */}
      {tab === 'solutions' && (
        <div className="rctsm-solutions">
          <div className="rctsm-sol-tabs">
            {Object.entries(STATE_SOLUTIONS).map(([key, { label, color, icon }]) => (
              <button key={key} className={`rctsm-sol-tab ${activeSolution === key ? 'rctsm-sol-tab--on' : ''}`}
                style={{ '--sc': color }} onClick={() => setActiveSolution(key)}>
                <span>{icon}</span><span>{label}</span>
              </button>
            ))}
          </div>
          <div className="rctsm-sol-detail" style={{ borderColor: sol.color }}>
            <div className="rctsm-sol-when">
              <strong>Best when:</strong> {sol.when}
            </div>
            <pre className="rctsm-code"><code>{sol.code}</code></pre>
          </div>
          <div className="rctsm-comparison">
            <table className="rctsm-cmp-table">
              <thead><tr><th>Solution</th><th>Complexity</th><th>Bundle size</th><th>DevTools</th></tr></thead>
              <tbody>
                <tr><td style={{ color: '#61DAFB' }}>Context + useReducer</td><td>Low</td><td>0 KB extra</td><td>Basic</td></tr>
                <tr><td style={{ color: '#E5C07B' }}>Zustand</td><td>Low</td><td>~1 KB</td><td>Good</td></tr>
                <tr><td style={{ color: '#C678DD' }}>Redux Toolkit</td><td>Medium</td><td>~11 KB</td><td>Excellent</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Demo */}
      {tab === 'demo' && (
        <div className="rctsm-demo">
          <p className="rctsm-desc"><code>useReducer</code> = like useState but for complex state. Centralises all updates in one reducer function.</p>
          <div className="rctsm-demo-grid">
            <div className="rctsm-products">
              <h3>Products</h3>
              {PRODUCTS.map(p => (
                <div key={p.name} className="rctsm-product">
                  <span className="rctsm-product-icon">{p.icon}</span>
                  <span className="rctsm-product-name">{p.name}</span>
                  <span className="rctsm-product-price">${p.price}</span>
                  <button className="rctsm-add-btn" onClick={() => dispatch({ type: 'ADD', name: p.name, price: p.price })}>
                    Add +
                  </button>
                </div>
              ))}
            </div>
            <div className="rctsm-cart">
              <div className="rctsm-cart-head">
                <h3>Cart ({cart.length})</h3>
                {cart.length > 0 && <button className="rctsm-clear-btn" onClick={() => dispatch({ type: 'CLEAR' })}>Clear</button>}
              </div>
              {cart.length === 0 && <p className="rctsm-cart-empty">Empty cart</p>}
              {cart.map(item => (
                <div key={item.id} className="rctsm-cart-item">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                  <button className="rctsm-remove-btn" onClick={() => dispatch({ type: 'REMOVE', id: item.id })}>✕</button>
                </div>
              ))}
              {cart.length > 0 && <div className="rctsm-total">Total: <strong>${total}</strong></div>}
            </div>
          </div>
          <pre className="rctsm-code"><code>{`dispatch({ type: 'ADD',    name: 'Laptop', price: 999 });
dispatch({ type: 'REMOVE', id: itemId });
dispatch({ type: 'CLEAR' });`}</code></pre>
        </div>
      )}
    </div>
  );
};

export default RctStateManagementVisualization;
