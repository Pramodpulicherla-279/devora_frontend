/**
 * userStats.js — lightweight localStorage-based user activity stats
 *
 * DAY STREAK
 *   Updated every time a lesson is marked complete.
 *   - Same day  → streak unchanged
 *   - Yesterday → streak +1
 *   - Older     → streak resets to 1
 *
 * QUIZ ACCURACY
 *   Cumulative tally of every quiz that has been fully revealed.
 *   Accuracy = total correct / total questions × 100
 */

const STREAK_KEY    = 'devora_streak';
const QUIZ_KEY      = 'devora_quiz_stats';

/* ─── helpers ─── */
const todayStr     = () => new Date().toISOString().split('T')[0];
const yesterdayStr = () => new Date(Date.now() - 86_400_000).toISOString().split('T')[0];

/* ─── streak ─── */

export function getStreak() {
    try {
        const raw = localStorage.getItem(STREAK_KEY);
        if (!raw) return 0;
        const { days, lastDate } = JSON.parse(raw);
        const today     = todayStr();
        const yesterday = yesterdayStr();
        // Still counts if last activity was today or yesterday (streak alive)
        if (lastDate === today || lastDate === yesterday) return days;
        return 0; // streak broken
    } catch { return 0; }
}

export function updateStreak() {
    try {
        const today     = todayStr();
        const yesterday = yesterdayStr();
        const raw = localStorage.getItem(STREAK_KEY);

        if (!raw) {
            localStorage.setItem(STREAK_KEY, JSON.stringify({ days: 1, lastDate: today }));
            return 1;
        }

        const { days, lastDate } = JSON.parse(raw);

        if (lastDate === today) return days;           // already counted today

        if (lastDate === yesterday) {
            const next = days + 1;
            localStorage.setItem(STREAK_KEY, JSON.stringify({ days: next, lastDate: today }));
            return next;
        }

        // Streak broken — restart at 1
        localStorage.setItem(STREAK_KEY, JSON.stringify({ days: 1, lastDate: today }));
        return 1;
    } catch { return 0; }
}

/* ─── quiz accuracy ─── */

export function getQuizAccuracy() {
    try {
        const raw = localStorage.getItem(QUIZ_KEY);
        if (!raw) return null;
        const { correct, total } = JSON.parse(raw);
        if (!total) return null;
        return Math.round((correct / total) * 100);
    } catch { return null; }
}

/** Call once per quiz session when all answers are revealed. */
export function recordQuizResult(correct, total) {
    try {
        const raw   = localStorage.getItem(QUIZ_KEY);
        const stats = raw ? JSON.parse(raw) : { correct: 0, total: 0 };
        stats.correct += correct;
        stats.total   += total;
        localStorage.setItem(QUIZ_KEY, JSON.stringify(stats));
    } catch { /* silently ignore */ }
}
