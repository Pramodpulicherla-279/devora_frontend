import React, { useEffect, useRef } from 'react';
import './visual.css';

const HtmlTags3DVisualization = () => {
    const rootRef = useRef(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const tagCards = root.querySelectorAll('.tag-card[draggable="true"]');
        const dropZone = root.querySelector('[data-role="drop-zone"]');
        const codeOutput = root.querySelector('[data-role="code-output"]');
        const resultOutput = root.querySelector('[data-role="result-output"]');
        const currentTagLabel = root.querySelector(
            '[data-role="current-tag-label"]'
        );

        const examples = {
            p: {
                label: 'Paragraph (&lt;p&gt;)',
                code: '<p>This is a paragraph element.</p>',
                html: '<p>This is a paragraph element.</p>',
            },
            h1: {
                label: 'Heading (&lt;h1&gt;)',
                code: '<h1>Welcome to HTML</h1>',
                html: '<h1>Welcome to HTML</h1>',
            },
            img: {
                label: 'Image (&lt;img&gt;)',
                code: '<img src="https://picsum.photos/400/300" alt="Sample image" />',
                html:
                    '<img src="https://picsum.photos/400/300" alt="Sample image" style="max-width:100%;border-radius:6px;box-shadow:0 6px 16px rgba(15,23,42,0.3);" />',
            },
            b: {
                label: 'Bold (&lt;b&gt;)',
                code: '<p>This is <b>bold</b> text.</p>',
                html: '<p>This is <b>bold</b> text.</p>',
            },
            br: {
                label: 'Line break (&lt;br&gt;)',
                code: 'Hello<br>World',
                html: 'Hello<br>World',
            },
        };

        const handleDragStart = (e) => {
            const tag = e.currentTarget.getAttribute('data-tag');
            e.dataTransfer.setData('text/plain', tag);
        };

        const handleDragOver = (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        };

        const handleDragLeave = () => {
            dropZone.classList.remove('drag-over');
        };

        const handleDrop = (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const tag = e.dataTransfer.getData('text/plain');
            const example = examples[tag];
            if (!example) return;

            currentTagLabel.innerHTML =
                'You dropped: <strong>' + example.label + '</strong>';
            codeOutput.textContent = example.code;
            resultOutput.innerHTML = example.html;
        };

        tagCards.forEach((card) =>
            card.addEventListener('dragstart', handleDragStart)
        );
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('dragleave', handleDragLeave);
        dropZone.addEventListener('drop', handleDrop);

        return () => {
            tagCards.forEach((card) =>
                card.removeEventListener('dragstart', handleDragStart)
            );
            dropZone.removeEventListener('dragover', handleDragOver);
            dropZone.removeEventListener('dragleave', handleDragLeave);
            dropZone.removeEventListener('drop', handleDrop);
        };
    }, []);

    return (
        <div className="html-tags-3d" ref={rootRef}>
            <div className="html-tags-3d-inner">
                <div className="html-tags-3d-intro">
                    <h2>Build the Output by Dragging HTML Tags</h2>
                    <p>
                        Every HTML element is made of a tag and its content. Drag a 3D tag
                        card into the playground to see the code and the visual result it
                        creates in the browser.
                    </p>
                </div>

                {/* LEFT: draggable 3D tag cards */}
                <div className="html-tags-3d-left">
                    <div className="tag-card-list">
                        <div className="tag-card" draggable="true" data-tag="p">
                            <div className="tag-card-label">
                                <span className="tag-pill">&lt;p&gt;...&lt;/p&gt;</span>
                                <span className="tag-name">Paragraph element</span>
                            </div>
                            <p className="tag-desc">
                                Wraps blocks of text. Browsers add spacing before and after a
                                paragraph.
                            </p>
                        </div>

                        <div className="tag-card" draggable="true" data-tag="h1">
                            <div className="tag-card-label">
                                <span className="tag-pill">&lt;h1&gt;...&lt;/h1&gt;</span>
                                <span className="tag-name">Heading 1</span>
                            </div>
                            <p className="tag-desc">
                                The most important heading on the page. Usually big and bold.
                            </p>
                        </div>

                        <div className="tag-card" draggable="true" data-tag="img">
                            <div className="tag-card-label">
                                <span className="tag-pill">&lt;img /&gt;</span>
                                <span className="tag-name">Image element</span>
                            </div>
                            <p className="tag-desc">
                                A void element (no closing tag) that displays an image using{' '}
                                <code>src</code> and <code>alt</code>.
                            </p>
                        </div>

                        <div className="tag-card" draggable="true" data-tag="b">
                            <div className="tag-card-label">
                                <span className="tag-pill">&lt;b&gt;...&lt;/b&gt;</span>
                                <span className="tag-name">Bold element</span>
                            </div>
                            <p className="tag-desc">
                                Makes text bold. Similar to <code>&lt;strong&gt;</code>, but
                                without semantic importance.
                            </p>
                        </div>

                        <div className="tag-card" draggable="true" data-tag="br">
                            <div className="tag-card-label">
                                <span className="tag-pill">&lt;br&gt;</span>
                                <span className="tag-name">Line break</span>
                            </div>
                            <p className="tag-desc">
                                A void element that forces the next part of the text onto a new
                                line.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT: drop zone + code + output */}
                <div className="html-tags-3d-right">
                    <div className="playground-card">
                        <div className="playground-title">Interactive Tag Playground</div>
                        <p className="playground-subtitle">
                            1. Pick a tag card on the left. 2. Drag and drop it inside this
                            box. 3. Watch the HTML code and the browser output update.
                        </p>

                        <div className="tag-drop-zone" data-role="drop-zone">
                            <div className="drop-hint">
                                Drop a tag card here to see what it does.
                            </div>
                            <div
                                className="current-tag-label"
                                data-role="current-tag-label"
                            >
                                No tag chosen yet.
                            </div>
                        </div>

                        <div className="divider" />

                        <div className="code-and-preview">
                            <div className="code-box">
                                <div className="code-box-label">HTML Code</div>
                                <pre className="code-output" data-role="code-output">
                                    {`<!-- Drag a tag card to generate example code here. -->`}
                                </pre>
                            </div>

                            <div className="result-box">
                                <div className="result-box-label">Browser Output</div>
                                <div
                                    className="result-output"
                                    data-role="result-output"
                                />
                            </div>
                        </div>

                        <p className="playground-footer">
                            Tip: notice how some elements (like <code>&lt;img&gt;</code> and{' '}
                            <code>&lt;br&gt;</code>) do not need a closing tag. They are
                            called <strong>void elements</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HtmlTags3DVisualization;