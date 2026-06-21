/**
 * Markdown — a tiny, dependency-free renderer for tutor answers.
 *
 * Supports the subset the tutor actually emits: GFM tables, fenced code blocks,
 * headings, ordered/unordered lists, paragraphs, and inline **bold** / `code`.
 * Builds real React elements (no dangerouslySetInnerHTML), so it's XSS-safe.
 */
import React from 'react';

function parseInline(text, keyPrefix) {
  const nodes = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let last = 0;
  let i = 0;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('`')) {
      nodes.push(<code key={`${keyPrefix}-c${i}`} className="att-md-code">{tok.slice(1, -1)}</code>);
    } else {
      nodes.push(<strong key={`${keyPrefix}-b${i}`}>{tok.slice(2, -2)}</strong>);
    }
    last = m.index + tok.length;
    i += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

const splitRow = (row) =>
  row.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());

export default function Markdown({ text }) {
  const lines = (text || '').replace(/\r/g, '').split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.trim().startsWith('```')) {
      const code = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        code.push(lines[i]);
        i += 1;
      }
      i += 1; // closing fence
      blocks.push(
        <pre key={blocks.length} className="att-md-pre"><code>{code.join('\n')}</code></pre>,
      );
      continue;
    }

    // GFM table: header row + separator row of dashes
    if (
      line.includes('|') &&
      i + 1 < lines.length &&
      /-{2,}/.test(lines[i + 1]) &&
      lines[i + 1].includes('|')
    ) {
      const header = splitRow(line);
      const rows = [];
      i += 2;
      while (i < lines.length && lines[i].includes('|')) {
        rows.push(splitRow(lines[i]));
        i += 1;
      }
      blocks.push(
        <table key={blocks.length} className="att-md-table">
          <thead>
            <tr>{header.map((h, hi) => <th key={hi}>{parseInline(h, `th${blocks.length}-${hi}`)}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri}>{r.map((c, ci) => <td key={ci}>{parseInline(c, `td${blocks.length}-${ri}-${ci}`)}</td>)}</tr>
            ))}
          </tbody>
        </table>,
      );
      continue;
    }

    // Heading
    const h = line.match(/^(#{1,3})\s+(.*)/);
    if (h) {
      const level = Math.min(h[1].length + 2, 6);
      blocks.push(
        React.createElement(
          `h${level}`,
          { key: blocks.length, className: 'att-md-h' },
          parseInline(h[2], `h${blocks.length}`),
        ),
      );
      i += 1;
      continue;
    }

    // Unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i += 1;
      }
      blocks.push(
        <ul key={blocks.length} className="att-md-ul">
          {items.map((it, ii) => <li key={ii}>{parseInline(it, `li${blocks.length}-${ii}`)}</li>)}
        </ul>,
      );
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
        i += 1;
      }
      blocks.push(
        <ol key={blocks.length} className="att-md-ol">
          {items.map((it, ii) => <li key={ii}>{parseInline(it, `oli${blocks.length}-${ii}`)}</li>)}
        </ol>,
      );
      continue;
    }

    // Blank line
    if (line.trim() === '') {
      i += 1;
      continue;
    }

    // Paragraph
    const para = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('```') &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !lines[i].match(/^#{1,3}\s/) &&
      !lines[i].includes('|')
    ) {
      para.push(lines[i]);
      i += 1;
    }
    blocks.push(<p key={blocks.length} className="att-md-p">{parseInline(para.join(' '), `p${blocks.length}`)}</p>);
  }

  return <div className="att-md">{blocks}</div>;
}
