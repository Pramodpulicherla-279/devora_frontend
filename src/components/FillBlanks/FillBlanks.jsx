import React, { useState, useMemo } from 'react';
import './FillBlanks.css';

/**
 * Fill-in-the-blanks practice block (W3Schools-style, strict grading).
 *
 * Data shape (per exercise) — see backend fillBlankSchema:
 *   { prompt, language, template, blanks: [{ id, answer, accepts, caseSensitive, hint }], explanation }
 * `template` contains {{1}}, {{2}} … tokens that map to blanks by `id`.
 *
 * Grading is strict: trim surrounding whitespace, then exact match
 * (case-sensitive by default) against `answer` or any of `accepts`.
 */

const TOKEN_RE = /(\{\{\d+\}\})/g;

function checkBlank(value, blank) {
    if (!blank) return false;
    const norm = (s) => (blank.caseSensitive === false ? s.trim().toLowerCase() : s.trim());
    const v = norm(value || '');
    if (v === '') return false;
    const candidates = [blank.answer, ...(blank.accepts || [])];
    return candidates.some((c) => norm(c) === v);
}

function FillBlankExercise({ exercise, index }) {
    const blanksById = useMemo(() => {
        const map = {};
        (exercise.blanks || []).forEach((b) => { map[b.id] = b; });
        return map;
    }, [exercise.blanks]);

    const segments = useMemo(() => exercise.template.split(TOKEN_RE), [exercise.template]);

    const [values, setValues] = useState({});   // { [id]: string }
    const [checked, setChecked] = useState(false);
    const [revealed, setRevealed] = useState(false); // answers shown
    const [openHints, setOpenHints] = useState({});  // { [id]: true }

    const total = (exercise.blanks || []).length;
    const correctCount = (exercise.blanks || []).reduce(
        (acc, b) => acc + (checkBlank(values[b.id], b) ? 1 : 0),
        0
    );
    const allCorrect = total > 0 && correctCount === total;

    const handleChange = (id, val) => {
        if (revealed) return;
        setValues((p) => ({ ...p, [id]: val }));
    };

    const handleCheck = () => setChecked(true);

    const handleReveal = () => {
        const filled = {};
        (exercise.blanks || []).forEach((b) => { filled[b.id] = b.answer; });
        setValues(filled);
        setChecked(true);
        setRevealed(true);
    };

    const handleReset = () => {
        setValues({});
        setChecked(false);
        setRevealed(false);
        setOpenHints({});
    };

    const toggleHint = (id) => setOpenHints((p) => ({ ...p, [id]: !p[id] }));

    const statusFor = (id) => {
        if (!checked) return '';
        return checkBlank(values[id], blanksById[id]) ? 'correct' : 'wrong';
    };

    return (
        <div className={`fib-card ${checked && allCorrect ? 'solved' : ''}`}>
            <div className="fib-card-top">
                <span className="fib-ex-num">Exercise {index + 1}</span>
                {exercise.language && <span className="fib-lang">{exercise.language}</span>}
            </div>

            {exercise.prompt && <p className="fib-prompt">{exercise.prompt}</p>}

            <pre className="fib-template">
                {segments.map((seg, i) => {
                    const m = seg.match(/^\{\{(\d+)\}\}$/);
                    if (!m) return <span key={i}>{seg}</span>;
                    const id = Number(m[1]);
                    const blank = blanksById[id];
                    if (!blank) return <span key={i}>{seg}</span>; // author typo — render literally
                    const status = statusFor(id);
                    const val = values[id] ?? '';
                    return (
                        <input
                            key={i}
                            type="text"
                            className={`fib-input ${status}`}
                            value={val}
                            size={Math.max(8, val.length + 1)}
                            spellCheck={false}
                            autoComplete="off"
                            autoCapitalize="off"
                            disabled={revealed}
                            aria-label={`Blank ${id}`}
                            placeholder="?"
                            onChange={(e) => handleChange(id, e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleCheck(); }}
                        />
                    );
                })}
            </pre>

            {/* Per-blank hints */}
            {(exercise.blanks || []).some((b) => b.hint) && (
                <div className="fib-hints">
                    {(exercise.blanks || []).map((b) =>
                        b.hint ? (
                            <div key={b.id} className="fib-hint-row">
                                <button className="fib-hint-btn" onClick={() => toggleHint(b.id)}>
                                    💡 Hint for blank {b.id}
                                </button>
                                {openHints[b.id] && <span className="fib-hint-text">{b.hint}</span>}
                            </div>
                        ) : null
                    )}
                </div>
            )}

            <div className="fib-actions">
                {!revealed && <button className="fib-check-btn" onClick={handleCheck}>Check Answers</button>}
                {!revealed && <button className="fib-reveal-btn" onClick={handleReveal}>Show Answer</button>}
                <button className="fib-reset-btn" onClick={handleReset}>↺ Reset</button>
                {checked && (
                    <span className={`fib-score ${allCorrect ? 'ok' : 'partial'}`}>
                        {allCorrect ? '✓ All correct!' : `${correctCount} / ${total} correct`}
                    </span>
                )}
            </div>

            {checked && allCorrect && exercise.explanation && (
                <div className="fib-explanation">
                    <span className="fib-exp-icon">💡</span>
                    <span>{exercise.explanation}</span>
                </div>
            )}
        </div>
    );
}

export default function FillBlanksSection({ blanks }) {
    if (!Array.isArray(blanks) || blanks.length === 0) return null;

    return (
        <div className="fib-section">
            <div className="fib-header">
                <span className="fib-icon">✏️</span>
                Fill in the Blanks
            </div>
            <p className="fib-sub">Complete the code below, then check your answers.</p>

            {blanks.map((exercise, i) => (
                <FillBlankExercise key={exercise._id || i} exercise={exercise} index={i} />
            ))}
        </div>
    );
}
