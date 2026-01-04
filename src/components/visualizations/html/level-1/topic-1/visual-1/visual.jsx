import React from 'react';
import './visual.css'; // We will create this next

const WebStackVisualization = () => {
    return (
        <div class="stack-visualization-container">
            <div class="left-label">
                <div class="arrow-up"></div>
                <p>Web<br />Development<br />Stack</p>
            </div>

            <div class="isometric-stack">
                <div class="layer layer-html">
                    <div class="layer-content concrete-texture"></div>
                </div>

                <div class="layer layer-css">
                    <div class="layer-content colorful-texture"></div>
                </div>

                <div class="layer layer-js">
                    <div class="layer-content glass-texture">
                        <svg
                            class="gear gear-1 spin-ccw"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19.43 12.98c.04-.32.07-.66.07-1.01 0-.35-.03-.69-.07-1.01l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.66-.07 1.01 0 .35.03.69.07 1.01l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.13-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
                            />
                        </svg>
                        <svg
                            class="gear gear-2 spin-ccw"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19.43 12.98c.04-.32.07-.66.07-1.01 0-.35-.03-.69-.07-1.01l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.66-.07 1.01 0 .35.03.69.07 1.01l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.13-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
                            />
                        </svg>

                        <svg
                            class="js-icon icon-brackets spin-ccw"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19.43 12.98c.04-.32.07-.66.07-1.01 0-.35-.03-.69-.07-1.01l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.66-.07 1.01 0 .35.03.69.07 1.01l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.13-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
                            />
                        </svg>
                        <svg
                            class="js-icon icon-logic float-anim-2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12,2L2,12L12,22L22,12L12,2Z"
                                transform="scale(0.8) translate(3,3)"
                            />
                        </svg>
                        <svg
                            class="js-icon icon-code"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6M13,19V5H11V19H13Z"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="right-labels">
                <div class="label-group">
                    <h3>JavaScript</h3>
                    <p>(Interactivity & Logic)</p>
                </div>
                <div class="label-group">
                    <h3>CSS</h3>
                    <p>(Presentation & Style)</p>
                </div>
                <div class="label-group">
                    <h3>HTML</h3>
                    <p>(Structure & Content Foundation)</p>
                </div>
            </div>
        </div>
    );
};

export default WebStackVisualization;