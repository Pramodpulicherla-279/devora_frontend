import { useState } from 'react';
import './mernFlowNodes.css';

const LAYERS = {
    react: { id: 'react', title: 'React', icon: '⚛️', color: '#61dafb' },
    express: { id: 'express', title: 'Express', icon: '🚏', color: '#000000' },
    node: { id: 'node', title: 'Node.js', icon: '🟩', color: '#3c873a' },
    mongo: { id: 'mongo', title: 'MongoDB', icon: '🍃', color: '#4db33d' },
};

const FLOWS = [
    {
        id: 'view-courses',
        title: 'User views course list',
        scenario: 'User opens the courses page to see available content.',
        steps: [
            {
                id: 'vc-1',
                label: 'React renders page',
                description:
                    'React mounts the Courses page and starts fetching the course list.',
                layerId: 'react',
            },
            {
                id: 'vc-2',
                label: 'Express route',
                description:
                    'A GET /api/courses request hits an Express route with middleware.',
                layerId: 'express',
            },
            {
                id: 'vc-3',
                label: 'Node controller',
                description:
                    'Node runs controller logic and prepares the DB query.',
                layerId: 'node',
            },
            {
                id: 'vc-4',
                label: 'MongoDB query',
                description:
                    'MongoDB returns matching course documents to the API.',
                layerId: 'mongo',
            },
            {
                id: 'vc-5',
                label: 'React updates UI',
                description:
                    'React updates state and re-renders the course grid.',
                layerId: 'react',
            },
        ],
    },
    {
        id: 'create-account',
        title: 'User creates an account',
        scenario: 'User signs up with email and password.',
        steps: [
            {
                id: 'ca-1',
                label: 'React validates input',
                description:
                    'React validates the signup form before sending it.',
                layerId: 'react',
            },
            {
                id: 'ca-2',
                label: 'Express auth route',
                description:
                    'POST /api/auth/signup hits the auth route in Express.',
                layerId: 'express',
            },
            {
                id: 'ca-3',
                label: 'Node hashes password',
                description:
                    'Node hashes the password and prepares a user document.',
                layerId: 'node',
            },
            {
                id: 'ca-4',
                label: 'MongoDB stores user',
                description:
                    'MongoDB inserts the new user into the users collection.',
                layerId: 'mongo',
            },
            {
                id: 'ca-5',
                label: 'React stores token',
                description:
                    'React stores the JWT and switches UI to “logged in”.',
                layerId: 'react',
            },
        ],
    },
    {
        id: 'update-progress',
        title: 'User progress is saved',
        scenario: 'User finishes a lesson and progress is persisted.',
        steps: [
            {
                id: 'up-1',
                label: 'React sends progress',
                description:
                    'React sends PATCH /api/progress with new lesson data.',
                layerId: 'react',
            },
            {
                id: 'up-2',
                label: 'Express checks auth',
                description:
                    'Express middleware validates the JWT and user permissions.',
                layerId: 'express',
            },
            {
                id: 'up-3',
                label: 'Node updates document',
                description:
                    'Node updates or upserts the progress document.',
                layerId: 'node',
            },
            {
                id: 'up-4',
                label: 'MongoDB persists progress',
                description:
                    'MongoDB writes the new progress to the collection.',
                layerId: 'mongo',
            },
            {
                id: 'up-5',
                label: 'React syncs UI',
                description:
                    'React refreshes local state so the tracker is up to date.',
                layerId: 'react',
            },
        ],
    },
];

function MernFlowNodeSimulator() {
    const [activeFlowId, setActiveFlowId] = useState(FLOWS[0].id);
    const [activeStepIndex, setActiveStepIndex] = useState(0);

    const activeFlow =
        FLOWS.find((flow) => flow.id === activeFlowId) ?? FLOWS[0];
    const activeStep =
        activeFlow.steps[activeStepIndex] ?? activeFlow.steps[0];
    const activeLayer = LAYERS[activeStep.layerId];

    const handleFlowChange = (e) => {
        const nextId = e.target.value;
        setActiveFlowId(nextId);
        setActiveStepIndex(0);
    };

    const handleStepClick = (index) => {
        setActiveStepIndex(index);
    };

    return (
        <section className="mern-node-section">
            <header className="mern-node-header">
                <div>
                    <h2 className="mern-node-title">Node-Based Flow Simulator</h2>
                    <p className="mern-node-subtitle">
                        Click through each node to follow a request across the MERN stack.
                    </p>
                </div>
                <select
                    className="mern-node-select"
                    value={activeFlowId}
                    onChange={handleFlowChange}
                >
                    {FLOWS.map((flow) => (
                        <option key={flow.id} value={flow.id}>
                            {flow.title}
                        </option>
                    ))}
                </select>
            </header>

            <p className="mern-node-scenario">{activeFlow.scenario}</p>

            <div className="mern-node-track">
                {activeFlow.steps.map((step, index) => {
                    const layer = LAYERS[step.layerId];
                    const isActive = index === activeStepIndex;
                    const isPast = index < activeStepIndex;
                    const isConnectorActive = index <= activeStepIndex; 

                    return (
                        <div key={step.id} className="mern-node-wrapper">
                            {index > 0 && (
                                <div
                                    className={
                                        'mern-node-connector' +
                                        (isConnectorActive ? ' mern-node-connector--active' : '')
                                    }
                                />
                            )}
                            <button
                                type="button"
                                className={
                                    'mern-node' +
                                    (isActive ? ' mern-node--active' : '') +
                                    (isPast ? ' mern-node--past' : '')
                                }
                                style={{ borderColor: layer.color }}
                                onClick={() => handleStepClick(index)}
                                onMouseEnter={() => setActiveStepIndex(index)}
                            >
                                <span
                                    className="mern-node-icon"
                                    style={{ color: layer.color }}
                                >
                                    {layer.icon}
                                </span>
                                <span className="mern-node-label">
                                    {step.label}
                                </span>
                                <span className="mern-node-layer">
                                    {layer.title}
                                </span>
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="mern-node-detail">
                <div className="mern-node-detail-layer">
                    <span
                        className="mern-node-detail-dot"
                        style={{ backgroundColor: activeLayer.color }}
                    />
                    <span className="mern-node-detail-layer-name">
                        {activeLayer.icon} {activeLayer.title}
                    </span>
                </div>
                <p className="mern-node-detail-text">{activeStep.description}</p>
            </div>
        </section>
    );
}

export default MernFlowNodeSimulator;