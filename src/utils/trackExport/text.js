// text.js
//
// jsPDF's built-in fonts (helvetica / courier / times) are WinAnsi / Latin-1
// only — any code point above 0xFF renders as a blank box or garbage. Lesson
// content is authored in TipTap and routinely contains smart quotes, en/em
// dashes, arrows, bullet glyphs and the occasional emoji. We normalise the
// common typographic characters to sensible ASCII and drop anything else that
// falls outside Latin-1, so the generated PDF stays clean without having to
// embed (and ship) a full Unicode TTF.

const REPLACEMENTS = [
  [/[‘’‚‛]/g, "'"],   // ‘ ’ ‚ ‛  → '
  [/[“”„‟]/g, '"'],   // “ ” „ ‟  → "
  [/[–—―]/g, '-'],          // – — ―    → -
  [/[−]/g, '-'],                      // minus sign
  [/[…]/g, '...'],                    // …        → ...
  [/[→↦➡➔]/g, '->'],   // → ↦ ➡ ➔  → ->
  [/[←]/g, '<-'],                     // ←        → <-
  [/[⇒]/g, '=>'],                     // ⇒        → =>
  [/[•●▪◦⁃∙]/g, '-'], // • ● ▪ ◦ ⁃ ∙ → -
  [/[✓✔]/g, '[x]'],              // ✓ ✔      → [x]
  [/[✗✘✕]/g, '[ ]'],        // ✗ ✘ ✕
  [/[   ]/g, ' '],          // non-breaking / figure spaces
  [/[×]/g, 'x'],                      // ×        → x
  [/[™]/g, '(TM)'],                   // ™
  [/[®]/g, '(R)'],                    // ®
  [/[©]/g, '(c)'],                    // ©
];

/**
 * Normalise a string to Latin-1-safe ASCII-ish text for jsPDF.
 * @param {*} value
 * @returns {string}
 */
export function sanitizeText(value) {
  if (value == null) return '';
  let out = String(value);
  for (const [pattern, replacement] of REPLACEMENTS) {
    out = out.replace(pattern, replacement);
  }
  // Drop any remaining non-Latin-1 code points (emoji, CJK, etc.).
  out = out.replace(/[^\x00-\xFF]/g, '');
  return out;
}

/**
 * Collapse runs of whitespace (including newlines) into single spaces and trim.
 * Used for inline text where the source HTML whitespace is not significant.
 */
export function collapseWhitespace(value) {
  return sanitizeText(value).replace(/\s+/g, ' ').trim();
}

/**
 * Make a string safe to use as a file / folder name inside the ZIP.
 * Strips path separators and characters that are illegal on Windows.
 */
export function safeFileName(value, fallback = 'untitled') {
  const cleaned = sanitizeText(value)
    .replace(/[\\/:*?"<>|]+/g, ' ') // illegal on Windows
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\.+$/, ''); // no trailing dots
  return cleaned || fallback;
}
