// htmlToBlocks.js
//
// Converts a lesson's TipTap/ProseMirror HTML string into a flat list of
// typed "blocks" that the PdfBuilder knows how to lay out. We deliberately
// produce plain data (no React, no DOM references) so rendering is a pure,
// testable transform.
//
// Block shapes:
//   { type: 'heading',   level: 1..4, runs: Run[] }
//   { type: 'paragraph', runs: Run[] }
//   { type: 'list',      ordered: boolean, items: Run[][] }
//   { type: 'code',      language: string, text: string }
//   { type: 'table',     head: string[], rows: string[][] }
//   { type: 'image',     src: string, alt: string }
//   { type: 'diagram',   dataType: string }
//   { type: 'callout',   variant: 'tip'|'note'|'warning'|'quote', runs: Run[] }
//   { type: 'hr' }
//
// Run shape: { text: string, bold: boolean, italic: boolean, code: boolean }

import { sanitizeText, collapseWhitespace } from './text.js';

const HEADING_TAGS = { h1: 1, h2: 2, h3: 3, h4: 4, h5: 4, h6: 4 };
const CALLOUT_CLASSES = ['tip', 'note', 'warning', 'callout'];

/**
 * Collect inline formatted runs from an element's descendants.
 * Merges styling (bold/italic/code) as it recurses.
 */
function collectRuns(node, style, runs) {
  for (const child of node.childNodes) {
    if (child.nodeType === 3) {
      // Text node
      const text = sanitizeText(child.nodeValue).replace(/\s+/g, ' ');
      if (text) runs.push({ ...style, text });
      continue;
    }
    if (child.nodeType !== 1) continue;

    const tag = child.tagName.toLowerCase();
    if (tag === 'br') {
      runs.push({ ...style, text: '\n', br: true });
      continue;
    }
    const next = { ...style };
    if (tag === 'strong' || tag === 'b') next.bold = true;
    if (tag === 'em' || tag === 'i') next.italic = true;
    if (tag === 'code' || tag === 'kbd') next.code = true;
    collectRuns(child, next, runs);
  }
}

/** Build a normalised run list for an element, dropping empty edge whitespace. */
function runsFor(element) {
  const runs = [];
  collectRuns(element, { bold: false, italic: false, code: false }, runs);
  // Trim leading/trailing whitespace-only runs
  while (runs.length && !runs[0].br && !runs[0].text.trim()) runs.shift();
  while (runs.length && !runs[runs.length - 1].br && !runs[runs.length - 1].text.trim()) runs.pop();
  return runs;
}

function hasText(runs) {
  return runs.some((r) => r.text && r.text.trim());
}

function classList(el) {
  return (el.getAttribute('class') || '').split(/\s+/).filter(Boolean);
}

function parseTable(tableEl) {
  const head = [];
  const rows = [];
  const headerCells = tableEl.querySelectorAll('thead th, thead td');
  headerCells.forEach((c) => head.push(collapseWhitespace(c.textContent)));

  const bodyRows = tableEl.querySelectorAll('tbody tr');
  const rowSource = bodyRows.length ? bodyRows : tableEl.querySelectorAll('tr');
  rowSource.forEach((tr) => {
    // Skip a row that is actually the header when there's no <thead>
    const cells = tr.querySelectorAll('th, td');
    if (!cells.length) return;
    const isHeaderRow = tr.parentElement && tr.parentElement.tagName.toLowerCase() === 'thead';
    if (isHeaderRow) return;
    if (!head.length && tr.querySelector('th') && rows.length === 0) {
      cells.forEach((c) => head.push(collapseWhitespace(c.textContent)));
      return;
    }
    const row = [];
    cells.forEach((c) => row.push(collapseWhitespace(c.textContent)));
    rows.push(row);
  });
  return { type: 'table', head, rows };
}

/** Walk the direct children of a container, emitting blocks into `out`. */
function walk(container, out) {
  for (const node of container.childNodes) {
    if (node.nodeType === 3) {
      // Stray text directly under the container -> paragraph
      const text = sanitizeText(node.nodeValue).trim();
      if (text) out.push({ type: 'paragraph', runs: [{ text, bold: false, italic: false, code: false }] });
      continue;
    }
    if (node.nodeType !== 1) continue;

    const el = node;
    const tag = el.tagName.toLowerCase();
    const classes = classList(el);

    // Visualization embed -> diagram placeholder
    if (classes.includes('visualization-embed')) {
      out.push({ type: 'diagram', dataType: el.getAttribute('data-type') || '' });
      continue;
    }

    if (HEADING_TAGS[tag]) {
      const runs = runsFor(el);
      if (hasText(runs)) out.push({ type: 'heading', level: HEADING_TAGS[tag], runs });
      continue;
    }

    if (tag === 'p') {
      const runs = runsFor(el);
      if (hasText(runs)) out.push({ type: 'paragraph', runs });
      continue;
    }

    if (tag === 'ul' || tag === 'ol') {
      const items = [];
      el.querySelectorAll(':scope > li').forEach((li) => {
        const runs = runsFor(li);
        if (hasText(runs)) items.push(runs);
        // Nested lists inside the li are flattened as extra items with a dash.
        li.querySelectorAll(':scope > ul > li, :scope > ol > li').forEach((sub) => {
          const subRuns = runsFor(sub);
          if (hasText(subRuns)) items.push([{ text: '  ', bold: false, italic: false, code: false }, ...subRuns]);
        });
      });
      if (items.length) out.push({ type: 'list', ordered: tag === 'ol', items });
      continue;
    }

    if (tag === 'pre') {
      const codeEl = el.querySelector('code') || el;
      const langClass = (codeEl.getAttribute('class') || '').match(/language-([\w-]+)/);
      const text = sanitizeText(codeEl.textContent || '').replace(/\n+$/, '');
      if (text.trim()) out.push({ type: 'code', language: langClass ? langClass[1] : '', text });
      continue;
    }

    if (tag === 'table') {
      out.push(parseTable(el));
      continue;
    }

    if (tag === 'hr') {
      out.push({ type: 'hr' });
      continue;
    }

    if (tag === 'img') {
      out.push({ type: 'image', src: el.getAttribute('src') || '', alt: el.getAttribute('alt') || '' });
      continue;
    }

    if (tag === 'figure') {
      const img = el.querySelector('img');
      if (img) out.push({ type: 'image', src: img.getAttribute('src') || '', alt: img.getAttribute('alt') || (el.querySelector('figcaption')?.textContent || '') });
      else walk(el, out);
      continue;
    }

    if (tag === 'blockquote') {
      const runs = runsFor(el);
      if (hasText(runs)) out.push({ type: 'callout', variant: 'quote', runs });
      continue;
    }

    const calloutVariant = CALLOUT_CLASSES.find((c) => classes.includes(c));
    if (calloutVariant) {
      const runs = runsFor(el);
      if (hasText(runs)) out.push({ type: 'callout', variant: calloutVariant === 'callout' ? 'note' : calloutVariant, runs });
      continue;
    }

    // Generic container (div/section/article/main): recurse into children.
    if (el.childElementCount > 0) {
      walk(el, out);
      continue;
    }

    // Leaf element with only text.
    const runs = runsFor(el);
    if (hasText(runs)) out.push({ type: 'paragraph', runs });
  }
}

/**
 * Parse a lesson HTML string into an ordered list of layout blocks.
 * @param {string} html
 * @returns {Array} blocks
 */
export function htmlToBlocks(html) {
  if (!html || typeof html !== 'string') return [];
  let doc;
  try {
    doc = new DOMParser().parseFromString(html, 'text/html');
  } catch {
    return [];
  }
  const out = [];
  walk(doc.body, out);
  return out;
}
