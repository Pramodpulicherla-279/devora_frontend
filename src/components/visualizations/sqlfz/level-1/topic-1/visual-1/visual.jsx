/* Lesson: Every App Runs on a Database — Why SQL Still Rules
 * Visual type: ILLUSTRATION
 * Shows popular apps → their underlying DB → SQL as the query language */
import React, { useState } from 'react';
import './visual.css';

const APPS = [
  { name:'Instagram', icon:'📸', db:'PostgreSQL', uses:'Posts, likes, followers, stories — every interaction writes a row' },
  { name:'Zomato',    icon:'🍔', db:'MySQL',       uses:'Restaurants, orders, reviews, delivery tracking — all tables' },
  { name:'Spotify',   icon:'🎵', db:'Cassandra + MySQL', uses:'Songs, playlists, listening history, recommendations' },
  { name:'Naukri',    icon:'💼', db:'MySQL + ElasticSearch', uses:'Job listings, applications, profile matches — SQL queries' },
  { name:'IRCTC',     icon:'🚂', db:'Oracle DB',   uses:'Train schedules, seat availability, booking records' },
];

const SqlFzWhyVisualization = () => {
  const [sel, setSel] = useState('Instagram');
  const app = APPS.find(a=>a.name===sel);

  return (
    <div className="sqlfzwhy-wrap">
      <header className="sqlfzwhy-head">
        <span className="sqlfzwhy-badge">SQL</span>
        <h2>Every App Runs on a Database</h2>
        <p>Pick an app — see what's under the hood</p>
      </header>

      <div className="sqlfzwhy-apps">
        {APPS.map(a=>(
          <button key={a.name} className={`sqlfzwhy-app ${sel===a.name?'sqlfzwhy-app--on':''}`} onClick={()=>setSel(a.name)}>
            <span className="sqlfzwhy-icon">{a.icon}</span>
            <span>{a.name}</span>
          </button>
        ))}
      </div>

      <div className="sqlfzwhy-info">
        <div className="sqlfzwhy-row"><span>Database:</span><strong>{app.db}</strong></div>
        <div className="sqlfzwhy-row"><span>What's stored:</span><span>{app.uses}</span></div>
      </div>

      <div className="sqlfzwhy-sql">
        <div className="sqlfzwhy-sql-label">What SQL looks like</div>
        <pre className="sqlfzwhy-code"><code>{`SELECT user_id, COUNT(*) AS post_count
FROM posts
WHERE created_at >= '2024-01-01'
GROUP BY user_id
ORDER BY post_count DESC
LIMIT 10;`}</code></pre>
        <div className="sqlfzwhy-sql-note">This is a real query you'd run at {sel}. By the end of this course you'll write queries like this comfortably.</div>
      </div>

      <div className="sqlfzwhy-note">
        SQL (Structured Query Language) is not a programming language — it's a <em>query</em> language. You describe <strong>what</strong> data you want; the database figures out <strong>how</strong> to get it.
      </div>
    </div>
  );
};

export default SqlFzWhyVisualization;
