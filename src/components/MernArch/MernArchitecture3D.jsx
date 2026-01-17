import React, { useState } from 'react';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import { SiExpress, SiMongodb } from 'react-icons/si';
import './MernFlowVisualizer.css';

const MernFlowVisualizer = () => {
  const [flowState, setFlowState] = useState('idle'); // idle, request, processing, database, response, update
  const [isAnimating, setIsAnimating] = useState(false);

  const startSimulation = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Step 1: Client -> Server
    setFlowState('request');
    await new Promise(r => setTimeout(r, 2000)); 

    // Step 2: Processing
    setFlowState('processing');
    await new Promise(r => setTimeout(r, 1500)); 

    // Step 3: Server -> DB -> Server
    setFlowState('database');
    await new Promise(r => setTimeout(r, 2000)); 

    // Step 4: Server -> Client
    setFlowState('response');
    await new Promise(r => setTimeout(r, 2000)); 

    // Step 5: Update UI
    setFlowState('update');
    await new Promise(r => setTimeout(r, 1500)); 

    // Reset
    setFlowState('idle');
    setIsAnimating(false);
  };

  return (
    <section className="mfv-section">
      <div className="mfv-header">
        <h2>See the MERN Stack in Action</h2>
        <p>Click the button below to trace the data journey.</p>
      </div>

      <div className="mfv-container">
        
        {/* --- MODULE 1: REACT (CLIENT) --- */}
        <div className={`mfv-module react-module ${flowState === 'update' ? 'active-step' : ''}`}>
          <div className="module-header">
            <FaReact className={`react-icon ${flowState !== 'idle' ? 'spin' : ''}`} />
            <h3>React Client</h3>
          </div>
          <div className="screen-preview">
            {flowState === 'update' ? (
              <span className="success-text">Data Loaded!</span>
            ) : (
              <button 
                className={`demo-btn ${isAnimating ? 'disabled' : ''}`} 
                onClick={startSimulation}
                disabled={isAnimating}
              >
                {isAnimating ? 'Please Wait...' : 'Click Me'}
              </button>
            )}
          </div>
        </div>

        {/* --- PIPE 1: Client <-> Server --- */}
        <div className="mfv-connector">
          <svg className="pipe-svg" viewBox="0 0 200 60" preserveAspectRatio="none">
            <path className="pipe-path" d="M0,30 C50,30 150,30 200,30" />
            <circle className={`data-packet request-packet ${flowState === 'request' ? 'animating' : ''}`} r="8" />
            <circle className={`data-packet response-packet ${flowState === 'response' ? 'animating' : ''}`} r="8" />
          </svg>
          <div className="connector-labels">
            <span className={`lbl ${flowState === 'request' ? 'lbl-active' : ''}`}>HTTP Request ➞</span>
            <span className={`lbl ${flowState === 'response' ? 'lbl-active' : ''}`}>← JSON Response</span>
          </div>
        </div>

        {/* --- MODULE 2: SERVER HUB --- */}
        <div className={`mfv-server-hub ${['processing', 'response'].includes(flowState) ? 'active-step' : ''}`}>
          <div className="hub-label">Server Side</div>
          <div className="hub-internals">
            <div className={`internal-block ${flowState === 'processing' ? 'highlight' : ''}`}>
              <SiExpress className="tech-icon express-icon" />
              <span>Express Routing</span>
            </div>
            <div className={`internal-block ${flowState === 'processing' ? 'highlight' : ''}`}>
              <FaNodeJs className="tech-icon node-icon" />
              <span>Node.js Logic</span>
            </div>
          </div>
        </div>

        {/* --- PIPE 2: Server <-> DB --- */}
        <div className="mfv-connector">
           <svg className="pipe-svg" viewBox="0 0 200 60" preserveAspectRatio="none">
            <path className="pipe-path" d="M0,30 C50,30 150,30 200,30" />
            <circle className={`data-packet db-query-packet ${flowState === 'database' ? 'animating' : ''}`} r="8" />
            <circle className={`data-packet db-result-packet ${flowState === 'database' ? 'animating-return' : ''}`} r="8" />
          </svg>
           <div className="connector-labels">
            <span className={`lbl ${flowState === 'database' && !flowState.includes('return') ? 'lbl-active' : ''}`}>Query ➞</span>
            <span className={`lbl ${flowState === 'database' ? 'lbl-active' : ''}`}>← Data</span>
          </div>
        </div>

        {/* --- MODULE 3: DATABASE --- */}
        <div className={`mfv-module mongo-module ${flowState === 'database' ? 'active-step' : ''}`}>
          <div className="module-header">
            <SiMongodb className="mongo-icon" />
            <h3>MongoDB</h3>
          </div>
          <div className="db-preview">
            <FaDatabase className="db-icon" />
            <div className={`db-status-light ${flowState === 'database' ? 'flash' : ''}`}></div>
            <div className="db-rows">
              <div className="db-row"></div>
              <div className="db-row"></div>
              <div className="db-row"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MernFlowVisualizer;