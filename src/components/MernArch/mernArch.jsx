import { useState, useMemo } from 'react';
import './mernArch.css';
import MernFlowNodeSimulator from './newFlow'

const LAYERS = [
    {
        id: 'react',
        title: 'React',
        label: 'Frontend UI',
        role: 'Build interactive user interfaces and manage application state in the browser.',
        dataFlow:
            'Sends requests to the backend API and renders the responses for the user.',
        tech: ['React', 'React Router', 'CSS', 'Fetch / Axios'],
        color: '#61dafb',
    },
    {
        id: 'express',
        title: 'Express',
        label: 'Backend API',
        role: 'Handles HTTP requests from the frontend and exposes REST APIs.',
        dataFlow:
            'Receives data from React, processes logic, and talks to MongoDB through Node.',
        tech: ['Express.js', 'Routing', 'Middleware', 'Controllers'],
        color: '#000000',
    },
    {
        id: 'node',
        title: 'Node.js',
        label: 'Runtime',
        role: 'Runs JavaScript on the server and executes backend code.',
        dataFlow:
            'Executes Express server code and manages connections to MongoDB.',
        tech: ['Node.js', 'NPM', 'Environment variables'],
        color: '#3c873a',
    },
    {
        id: 'mongo',
        title: 'MongoDB',
        label: 'Database',
        role: 'Stores and retrieves application data in a flexible document format.',
        dataFlow:
            'Persists data such as users, courses, and progress; returns it through Node/Express.',
        tech: ['MongoDB', 'Mongoose', 'Collections', 'Documents'],
        color: '#4db33d',
    },
];

const FLOWS = [
    {
        id: 'view-courses',
        title: 'User views course list',
        scenario: 'User opens the courses page to see available content.',
        steps: [
            {
                id: 'step-1',
                label: 'React renders page',
                layerId: 'react',
                description:
                    'React mounts the Courses page and runs an effect to fetch the list of courses from the API.',
            },
            {
                id: 'step-2',
                label: 'Express route receives request',
                layerId: 'express',
                description:
                    'A GET /api/courses request hits an Express route where middleware checks headers, logging, and authentication (if needed).',
            },
            {
                id: 'step-3',
                label: 'Node executes business logic',
                layerId: 'node',
                description:
                    'Node runs the controller/service code: building a query, applying pagination, filtering, and any business rules.',
            },
            {
                id: 'step-4',
                label: 'MongoDB returns data',
                layerId: 'mongo',
                description:
                    'MongoDB queries the courses collection, returns matching documents to Node, which serializes them for the API.',
            },
            {
                id: 'step-5',
                label: 'React updates UI',
                layerId: 'react',
                description:
                    'The JSON response is sent back to React. State is updated and the course grid re-renders for the user.',
            },
        ],
    },
    {
        id: 'create-account',
        title: 'User creates an account',
        scenario: 'User signs up with email and password.',
        steps: [
            {
                id: 'step-1',
                label: 'React validates input',
                layerId: 'react',
                description:
                    'React manages form state, validates fields on the client, and only then sends the signup request.',
            },
            {
                id: 'step-2',
                label: 'Express auth route',
                layerId: 'express',
                description:
                    'A POST /api/auth/signup request hits an Express route dedicated to authentication and user creation.',
            },
            {
                id: 'step-3',
                label: 'Node hashes password',
                layerId: 'node',
                description:
                    'Node uses a library like bcrypt to hash the password, checks if the user already exists, and prepares a new user document.',
            },
            {
                id: 'step-4',
                label: 'MongoDB stores user',
                layerId: 'mongo',
                description:
                    'MongoDB inserts the new user document into the users collection, then returns the saved user metadata.',
            },
            {
                id: 'step-5',
                label: 'React stores token',
                layerId: 'react',
                description:
                    'Node/Express returns a signed JWT. React stores it (e.g., in memory or localStorage) and updates the UI to show the user as logged in.',
            },
        ],
    },
    {
        id: 'update-progress',
        title: 'User progress is saved',
        scenario: 'User finishes a lesson and progress is persisted.',
        steps: [
            {
                id: 'step-1',
                label: 'React sends progress',
                layerId: 'react',
                description:
                    'When the user completes a lesson, React sends a PATCH /api/progress request with the updated lesson progress.',
            },
            {
                id: 'step-2',
                label: 'Express checks auth',
                layerId: 'express',
                description:
                    'Express middleware validates the JWT, extracts the user id, and ensures the user is allowed to update this progress.',
            },
            {
                id: 'step-3',
                label: 'Node updates document',
                layerId: 'node',
                description:
                    'Node runs a controller/service that updates or upserts the progress document using an ODM like Mongoose.',
            },
            {
                id: 'step-4',
                label: 'MongoDB persists progress',
                layerId: 'mongo',
                description:
                    'MongoDB updates the progress collection so the user can resume from the same point later.',
            },
            {
                id: 'step-5',
                label: 'React syncs UI',
                layerId: 'react',
                description:
                    'The API returns the new progress value. React updates local state so the lesson tracker and UI reflect the latest status.',
            },
        ],
    },
];


function MernStackDiagram() {
    const [activeId, setActiveId] = useState('react');
    const [activeFlowId, setActiveFlowId] = useState(FLOWS[0].id);
    const [activeStepIndex, setActiveStepIndex] = useState(0);

    const activeLayer = useMemo(
        () => LAYERS.find((l) => l.id === activeId) ?? LAYERS[0],
        [activeId]
    );

    const activeFlow = useMemo(
        () => FLOWS.find((f) => f.id === activeFlowId) ?? FLOWS[0],
        [activeFlowId]
    );

    const activeStep = activeFlow.steps[activeStepIndex] ?? activeFlow.steps[0];

    const layersInFlow = useMemo(() => {
        return new Set(activeFlow.steps.map((s) => s.layerId));
    }, [activeFlow]);

    const handleFlowChange = (e) => {
        const nextFlowId = e.target.value;
        const nextFlow = FLOWS.find((f) => f.id === nextFlowId) ?? FLOWS[0];
        setActiveFlowId(nextFlowId);
        setActiveStepIndex(0);
        setActiveId(nextFlow.steps[0].layerId);
    };

    const handleStepClick = (index, step) => {
        setActiveStepIndex(index);
        setActiveId(step.layerId);
    };

    return (
        <section className="mern-section">
            <h2 className="mern-title">How the MERN Stack Works</h2>
            <p className="mern-subtitle">
                Explore each layer of the MERN stack and follow real request flows—from the
                browser, through your API, all the way to the database and back.
            </p>

            <div className="mern-content">
                {/* Left: vertical architecture diagram */}
                <div className="mern-diagram">
                    {LAYERS.map((layer, index) => (
                        <div key={layer.id} className="mern-diagram-row">
                            <button
                                type="button"
                                className={
                                    'mern-layer' +
                                    (layersInFlow.has(layer.id) ? ' mern-layer--in-flow' : '') +
                                    (layer.id === activeId ? ' mern-layer--active' : '')
                                }
                                style={{ borderColor: layer.color }}
                                onMouseEnter={() => setActiveId(layer.id)}
                                onFocus={() => setActiveId(layer.id)}
                                onClick={() => setActiveId(layer.id)}
                            >
                                <span className="mern-layer-title">{layer.title}</span>
                                <span className="mern-layer-label">{layer.label}</span>
                            </button>

                            {index < LAYERS.length - 1 && (
                                <div className="mern-arrow" aria-hidden="true">
                                    ↓
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right: details + advanced flow simulator */}
                <div className="mern-right">
                    {/* Details for selected layer */}
                    <div className="mern-details">
                        <div className="mern-details-header">
                            <span
                                className="mern-details-dot"
                                style={{ backgroundColor: activeLayer.color }}
                            />
                            <div>
                                <h3 className="mern-details-title">
                                    {activeLayer.title} – {activeLayer.label}
                                </h3>
                                <p className="mern-details-flow">{activeLayer.dataFlow}</p>
                            </div>
                        </div>

                        <p className="mern-details-role">{activeLayer.role}</p>

                        <div className="mern-details-tech">
                            <p className="mern-details-tech-label">Key concepts & tools:</p>
                            <div className="mern-details-chips">
                                {activeLayer.tech.map((item) => (
                                    <span key={item} className="mern-chip">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <p className="mern-details-tip">
                            As you go through Dev.eL lessons, you&apos;ll touch each layer and
                            learn how they collaborate to deliver full-stack features.
                        </p>
                    </div>

                    {/* Advanced: request flow simulator */}
                    {/* <div className="mern-flow">
                        <div className="mern-flow-header">
                            <div>
                                <h3 className="mern-flow-title">Request Flow Simulator</h3>
                                <p className="mern-flow-subtitle">
                                    Choose a scenario and step through how a single action moves
                                    through the MERN stack.
                                </p>
                            </div>
                            <select
                                className="mern-flow-select"
                                value={activeFlowId}
                                onChange={handleFlowChange}
                            >
                                {FLOWS.map((flow) => (
                                    <option key={flow.id} value={flow.id}>
                                        {flow.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <p className="mern-flow-scenario">{activeFlow.scenario}</p>

                        <div className="mern-flow-steps">
                            {activeFlow.steps.map((step, index) => {
                                const isActive = index === activeStepIndex;
                                return (
                                    <button
                                        key={step.id}
                                        type="button"
                                        className={
                                            'mern-flow-step' +
                                            (isActive ? ' mern-flow-step--active' : '')
                                        }
                                        onClick={() => handleStepClick(index, step)}
                                    >
                                        <span className="mern-flow-step-index">
                                            {index + 1}
                                        </span>
                                        <span className="mern-flow-step-label">
                                            {step.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mern-flow-detail">
                            <p className="mern-flow-detail-layer">
                                Current layer:{' '}
                                <span className="mern-flow-detail-layer-name">
                                    {
                                        LAYERS.find(
                                            (layer) => layer.id === activeStep.layerId
                                        )?.title
                                    }
                                </span>
                            </p>
                            <p className="mern-flow-detail-text">
                                {activeStep.description}
                            </p>
                        </div>
                    </div> */}
                    <MernFlowNodeSimulator/>
                </div>
            </div>
        </section>
    );
}

export default MernStackDiagram;