// PdfBuilder.js
//
// A thin, opinionated layout engine on top of jsPDF for turning lesson blocks
// (see htmlToBlocks.js) into a paginated A4 PDF. It owns a running y-cursor,
// page breaks, a small type scale, code/callout/table rendering, a cover page,
// a table of contents, and per-page footers.
//
// Units are PostScript points (1/72"), matching jsPDF's 'pt' mode.

import { jsPDF } from 'jspdf';
import { sanitizeText } from './text.js';

const MARGIN = 48;
const FOOTER_SPACE = 30; // reserved band at the bottom for the footer

function hexToRgb(hex) {
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex || '');
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [99, 102, 241];
}

const COLORS = {
  text: [31, 41, 55],
  heading: [17, 24, 39],
  muted: [107, 114, 128],
  rule: [229, 231, 235],
  codeBg: [243, 244, 246],
  codeText: [17, 24, 39],
  inlineCode: [159, 18, 57],
  correct: [21, 101, 52],
  calloutBg: [248, 250, 252],
};

export class PdfBuilder {
  constructor({ accent = '#6366f1', footerLabel = '' } = {}) {
    this.doc = new jsPDF({ unit: 'pt', format: 'a4', compress: true });
    this.pageW = this.doc.internal.pageSize.getWidth();
    this.pageH = this.doc.internal.pageSize.getHeight();
    this.margin = MARGIN;
    this.contentW = this.pageW - MARGIN * 2;
    this.y = MARGIN;
    this.accent = hexToRgb(accent);
    this.colors = COLORS;
    this.footerLabel = footerLabel;
    this.noFooterPages = new Set();
  }

  // ── page / cursor helpers ────────────────────────────────────────────────
  bottomLimit() { return this.pageH - this.margin - FOOTER_SPACE; }
  tocBottomLimit() { return this.pageH - this.margin; }
  pageNumber() { return this.doc.internal.getCurrentPageInfo().pageNumber; }
  totalPages() { return this.doc.getNumberOfPages(); }
  setPage(n) { this.doc.setPage(n); }
  gotoPageTop(n) { this.doc.setPage(n); this.y = this.margin; }

  addPage() {
    this.doc.addPage();
    this.y = this.margin;
    return this.pageNumber();
  }

  ensure(h) {
    if (this.y + h > this.bottomLimit()) this.addPage();
  }

  space(h) { this.y += h; }

  // ── font helper ──────────────────────────────────────────────────────────
  _applyStyle(style, size) {
    if (style.code) {
      this.doc.setFont('courier', style.bold ? 'bold' : 'normal');
    } else {
      const weight = style.bold && style.italic ? 'bolditalic' : style.bold ? 'bold' : style.italic ? 'italic' : 'normal';
      this.doc.setFont('helvetica', weight);
    }
    this.doc.setFontSize(size);
  }

  // ── inline runs → wrapped, styled lines ──────────────────────────────────
  _tokenize(runs, forceBold) {
    const words = [];
    let spaceBefore = false;
    for (const run of runs) {
      if (run.br) { words.push({ br: true }); spaceBefore = false; continue; }
      const style = {
        bold: !!run.bold || !!forceBold,
        italic: !!run.italic,
        code: !!run.code,
      };
      const parts = String(run.text).split(/(\s+)/);
      for (const p of parts) {
        if (p === '') continue;
        if (/^\s+$/.test(p)) { spaceBefore = true; continue; }
        words.push({ text: p, ...style, spaceBefore });
        spaceBefore = false;
      }
    }
    return words;
  }

  _breakLongWord(word, maxW, size) {
    // Split a single token that is wider than the line into chunks that fit.
    this._applyStyle(word, size);
    const out = [];
    let chunk = '';
    for (const ch of word.text) {
      const test = chunk + ch;
      if (this.doc.getTextWidth(test) > maxW && chunk) {
        out.push({ ...word, text: chunk, spaceBefore: out.length === 0 ? word.spaceBefore : false });
        chunk = ch;
      } else {
        chunk = test;
      }
    }
    if (chunk) out.push({ ...word, text: chunk, spaceBefore: out.length === 0 ? word.spaceBefore : false });
    return out;
  }

  writeRuns(runs, opts = {}) {
    const size = opts.size ?? 10.5;
    const color = opts.color ?? this.colors.text;
    const indent = opts.indent ?? 0;
    const startX = this.margin + indent;
    const maxW = this.contentW - indent;
    const lineH = size * (opts.lineFactor ?? 1.4);

    this._applyStyle({}, size);
    const spaceW = this.doc.getTextWidth(' ');

    let words = this._tokenize(runs, opts.forceBold);
    // Pre-break any token that cannot fit on a full line.
    const expanded = [];
    for (const w of words) {
      if (w.br) { expanded.push(w); continue; }
      this._applyStyle(w, size);
      if (this.doc.getTextWidth(w.text) > maxW) expanded.push(...this._breakLongWord(w, maxW, size));
      else expanded.push(w);
    }
    words = expanded;

    let line = [];
    let lineW = 0;

    const flush = () => {
      if (!line.length) return;
      this.ensure(lineH);
      const baseline = this.y + size;
      let cx = startX;
      for (const item of line) {
        cx += item.gap;
        this._applyStyle(item, size);
        this.doc.setTextColor(...(item.code ? this.colors.inlineCode : color));
        this.doc.text(item.text, cx, baseline);
        cx += item.w;
      }
      this.y += lineH;
      line = [];
      lineW = 0;
    };

    for (const w of words) {
      if (w.br) { flush(); continue; }
      this._applyStyle(w, size);
      w.w = this.doc.getTextWidth(w.text);
      const gap = line.length && w.spaceBefore ? spaceW : 0;
      if (line.length && lineW + gap + w.w > maxW) flush();
      const gap2 = line.length && w.spaceBefore ? spaceW : 0;
      line.push({ ...w, gap: gap2 });
      lineW += gap2 + w.w;
    }
    flush();
    if (opts.paraGap) this.y += opts.paraGap;
  }

  // ── block-level writers ──────────────────────────────────────────────────
  writeHeading(runs, level) {
    const sizes = { 1: 18, 2: 14.5, 3: 12, 4: 11 };
    const size = sizes[level] || 12;
    this.y += level <= 2 ? 12 : 8;
    this.ensure(size * 1.6);
    this.writeRuns(runs, { size, color: this.colors.heading, forceBold: true, paraGap: 5, lineFactor: 1.3 });
  }

  writeParagraph(runs) {
    this.writeRuns(runs, { size: 10.5, color: this.colors.text, paraGap: 7 });
  }

  writeList(ordered, items) {
    const size = 10.5;
    const lineH = size * 1.4;
    items.forEach((runs, idx) => {
      this.ensure(lineH);
      const marker = ordered ? `${idx + 1}.` : '-';
      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(size);
      this.doc.setTextColor(...this.colors.text);
      this.doc.text(marker, this.margin + 6, this.y + size);
      this.writeRuns(runs, { size, indent: 24, paraGap: 3 });
    });
    this.y += 3;
  }

  writeCode(text, language) {
    const pad = 8;
    const size = 8.5;
    const lineH = 11.5;
    this.doc.setFont('courier', 'normal');
    this.doc.setFontSize(size);
    const charW = this.doc.getTextWidth('M') || 5;
    const maxChars = Math.max(8, Math.floor((this.contentW - pad * 2) / charW));

    const raw = sanitizeText(text).replace(/\t/g, '  ').split('\n');
    const wrapped = [];
    for (const ln of raw) {
      if (ln.length <= maxChars) { wrapped.push(ln); continue; }
      for (let i = 0; i < ln.length; i += maxChars) wrapped.push(ln.slice(i, i + maxChars));
    }

    this.y += 5;
    let i = 0;
    while (i < wrapped.length) {
      if (this.y + lineH + pad * 2 > this.bottomLimit()) this.addPage();
      const avail = this.bottomLimit() - this.y - pad * 2;
      let n = Math.max(1, Math.floor(avail / lineH));
      n = Math.min(n, wrapped.length - i);
      const blockH = n * lineH + pad * 2;

      this.doc.setFillColor(...this.colors.codeBg);
      this.doc.roundedRect(this.margin, this.y, this.contentW, blockH, 4, 4, 'F');
      this.doc.setFont('courier', 'normal');
      this.doc.setFontSize(size);
      this.doc.setTextColor(...this.colors.codeText);
      let ty = this.y + pad + size * 0.9;
      for (let k = 0; k < n; k++) {
        this.doc.text(wrapped[i + k], this.margin + pad, ty);
        ty += lineH;
      }
      this.y += blockH;
      i += n;
      if (i < wrapped.length) this.addPage();
    }
    this.y += 7;
  }

  writeCallout(variant, runs) {
    const tint = {
      tip: [236, 253, 245], note: this.colors.calloutBg, warning: [255, 251, 235], quote: this.colors.calloutBg,
    }[variant] || this.colors.calloutBg;
    const bar = {
      tip: [16, 185, 129], note: this.accent, warning: [245, 158, 11], quote: [148, 163, 184],
    }[variant] || this.accent;

    const pad = 8;
    const size = 10;
    const label = variant === 'quote' ? '' : variant.toUpperCase();

    // Measure by rendering onto a scratch cursor is overkill; instead we grow
    // the background after writing text by capturing start/end y on one page.
    const startY = this.y;
    const startPage = this.pageNumber();
    this.y += pad;
    if (label) {
      this.ensure(size * 1.4);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setFontSize(8.5);
      this.doc.setTextColor(...bar);
      this.doc.text(label, this.margin + pad + 6, this.y + 9);
      this.y += 13;
    }
    // Temporarily indent both edges for the callout body.
    const savedContentW = this.contentW;
    const savedMargin = this.margin;
    this.margin = savedMargin + pad + 6;
    this.contentW = savedContentW - (pad + 6) * 2;
    this.writeRuns(runs, { size, color: this.colors.text, paraGap: 0 });
    this.margin = savedMargin;
    this.contentW = savedContentW;
    this.y += pad;

    // If the callout stayed on one page, paint its background behind the text.
    if (this.pageNumber() === startPage) {
      this.doc.setFillColor(...tint);
      this.doc.roundedRect(this.margin, startY, this.contentW, this.y - startY, 4, 4, 'F');
      this.doc.setFillColor(...bar);
      this.doc.rect(this.margin, startY, 3, this.y - startY, 'F');
      // Re-draw text on top of the background (jsPDF draws in call order).
      this.y = startY;
      this.y += pad;
      if (label) {
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(8.5);
        this.doc.setTextColor(...bar);
        this.doc.text(label, this.margin + pad + 6, this.y + 9);
        this.y += 13;
      }
      this.margin = savedMargin + pad + 6;
      this.contentW = savedContentW - (pad + 6) * 2;
      this.writeRuns(runs, { size, color: this.colors.text, paraGap: 0 });
      this.margin = savedMargin;
      this.contentW = savedContentW;
      this.y += pad;
    }
    this.y += 6;
  }

  writeTable(head, rows) {
    const size = 9;
    const pad = 5;
    const lineH = size * 1.3;
    const allRows = head.length ? [head, ...rows] : rows;
    if (!allRows.length) return;
    const ncols = allRows.reduce((m, r) => Math.max(m, r.length), 1);
    const colW = this.contentW / ncols;

    this.y += 4;
    const drawRow = (cells, isHead) => {
      this.doc.setFont('helvetica', isHead ? 'bold' : 'normal');
      this.doc.setFontSize(size);
      const wrapped = [];
      let maxLines = 1;
      for (let c = 0; c < ncols; c++) {
        const txt = sanitizeText(cells[c] || '');
        const lines = this.doc.splitTextToSize(txt, colW - pad * 2);
        wrapped.push(lines);
        maxLines = Math.max(maxLines, lines.length);
      }
      const rowH = maxLines * lineH + pad * 2;
      if (this.y + rowH > this.bottomLimit()) this.addPage();

      if (isHead) {
        this.doc.setFillColor(...this.accent);
        this.doc.rect(this.margin, this.y, this.contentW, rowH, 'F');
      }
      this.doc.setDrawColor(...this.colors.rule);
      for (let c = 0; c < ncols; c++) {
        const cx = this.margin + c * colW;
        this.doc.rect(cx, this.y, colW, rowH);
        this.doc.setFont('helvetica', isHead ? 'bold' : 'normal');
        this.doc.setFontSize(size);
        this.doc.setTextColor(...(isHead ? [255, 255, 255] : this.colors.text));
        let ty = this.y + pad + size * 0.9;
        for (const ln of wrapped[c]) {
          this.doc.text(ln, cx + pad, ty);
          ty += lineH;
        }
      }
      this.y += rowH;
    };

    if (head.length) drawRow(head, true);
    rows.forEach((r) => drawRow(r, false));
    this.y += 8;
  }

  writeDiagram(dataType, url) {
    const h = 50;
    this.ensure(h + 8);
    this.y += 4;
    this.doc.setFillColor(245, 247, 255);
    this.doc.setDrawColor(...this.accent);
    this.doc.roundedRect(this.margin, this.y, this.contentW, h, 5, 5, 'FD');
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.accent);
    this.doc.text('Interactive diagram', this.margin + 12, this.y + 18);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(9);
    this.doc.setTextColor(...this.colors.muted);
    this.doc.text('This visualization is interactive. View it online in the lesson:', this.margin + 12, this.y + 32);
    if (url) {
      this.doc.setTextColor(...this.accent);
      this.doc.textWithLink(sanitizeText(url), this.margin + 12, this.y + 44, { url });
    }
    this.y += h + 8;
  }

  writeImage(src, alt) {
    if (src && /^data:image\//i.test(src)) {
      try {
        const props = this.doc.getImageProperties(src);
        const w = Math.min(this.contentW, props.width);
        const h = (w * props.height) / props.width;
        this.ensure(h + 8);
        this.y += 4;
        this.doc.addImage(src, this.margin, this.y, w, h);
        this.y += h + 6;
        if (alt) this._caption(alt);
        return;
      } catch { /* fall through to placeholder */ }
    }
    const h = alt ? 44 : 34;
    this.ensure(h + 8);
    this.y += 4;
    this.doc.setFillColor(...this.colors.calloutBg);
    this.doc.setDrawColor(...this.colors.rule);
    this.doc.roundedRect(this.margin, this.y, this.contentW, h, 4, 4, 'FD');
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(9);
    this.doc.setTextColor(...this.colors.muted);
    this.doc.text(sanitizeText(alt ? `Image: ${alt}` : 'Image'), this.margin + 12, this.y + 18);
    if (src && /^https?:/i.test(src)) {
      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(...this.accent);
      this.doc.textWithLink(sanitizeText(src), this.margin + 12, this.y + (alt ? 32 : 28), { url: src });
    }
    this.y += h + 8;
  }

  _caption(text) {
    this.doc.setFont('helvetica', 'italic');
    this.doc.setFontSize(8.5);
    this.doc.setTextColor(...this.colors.muted);
    const lines = this.doc.splitTextToSize(sanitizeText(text), this.contentW);
    for (const ln of lines) {
      this.ensure(11);
      this.doc.text(ln, this.margin, this.y + 8);
      this.y += 11;
    }
    this.y += 4;
  }

  writeHr() {
    this.ensure(14);
    this.y += 6;
    this.doc.setDrawColor(...this.colors.rule);
    this.doc.line(this.margin, this.y, this.margin + this.contentW, this.y);
    this.y += 8;
  }

  writeSectionLabel(text) {
    this.y += 10;
    this.ensure(30);
    this.doc.setFillColor(...this.accent);
    this.doc.rect(this.margin, this.y + 1, 3, 13, 'F');
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(11.5);
    this.doc.setTextColor(...this.accent);
    this.doc.text(sanitizeText(text).toUpperCase(), this.margin + 10, this.y + 12);
    this.y += 19;
    this.doc.setDrawColor(...this.colors.rule);
    this.doc.line(this.margin, this.y, this.margin + this.contentW, this.y);
    this.y += 10;
  }

  // ── dispatch a list of content blocks ────────────────────────────────────
  renderBlocks(blocks, { lessonUrl = '' } = {}) {
    for (const b of blocks) {
      switch (b.type) {
        case 'heading': this.writeHeading(b.runs, b.level); break;
        case 'paragraph': this.writeParagraph(b.runs); break;
        case 'list': this.writeList(b.ordered, b.items); break;
        case 'code': this.writeCode(b.text, b.language); break;
        case 'table': this.writeTable(b.head, b.rows); break;
        case 'callout': this.writeCallout(b.variant, b.runs); break;
        case 'diagram': this.writeDiagram(b.dataType, lessonUrl); break;
        case 'image': this.writeImage(b.src, b.alt); break;
        case 'hr': this.writeHr(); break;
        default: break;
      }
    }
  }

  // ── lesson-specific writers ──────────────────────────────────────────────
  writeLessonTitle(number, title) {
    this.ensure(40);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(9);
    this.doc.setTextColor(...this.accent);
    this.doc.text(`LESSON ${number}`, this.margin, this.y + 8);
    this.y += 16;
    this.writeRuns([{ text: sanitizeText(title) }], { size: 20, color: this.colors.heading, forceBold: true, lineFactor: 1.2, paraGap: 4 });
  }

  writeLessonMeta(parts) {
    const text = parts.filter(Boolean).join('   •   ');
    if (!text) return;
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(9.5);
    this.doc.setTextColor(...this.colors.muted);
    this.ensure(14);
    this.doc.text(sanitizeText(text.replace(/•/g, '|')), this.margin, this.y + 9);
    this.y += 16;
    this.doc.setDrawColor(...this.colors.rule);
    this.doc.line(this.margin, this.y, this.margin + this.contentW, this.y);
    this.y += 6;
  }

  writeQuiz(quiz) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    quiz.forEach((q, i) => {
      this.ensure(30);
      this.writeRuns([{ text: `Q${i + 1}. ${sanitizeText(q.question)}` }], { size: 10.5, forceBold: true, paraGap: 4 });
      (q.options || []).forEach((opt, oi) => {
        const correct = oi === q.correctIndex;
        const runs = [{ text: `${letters[oi] || '-'}. `, bold: true }, { text: sanitizeText(opt) }];
        if (correct) runs.push({ text: '   [correct answer]', italic: true, bold: true });
        this.writeRuns(runs, { size: 10, indent: 14, paraGap: 2, color: correct ? this.colors.correct : this.colors.text });
      });
      if (q.explanation) {
        this.writeRuns([{ text: 'Why: ', bold: true }, { text: sanitizeText(q.explanation) }], { size: 9.5, indent: 14, color: this.colors.muted, paraGap: 8 });
      } else {
        this.y += 6;
      }
    });
  }

  writeInterview(questions) {
    const order = ['beginner', 'intermediate', 'advanced'];
    const grouped = {};
    for (const q of questions) {
      const key = (q.level || 'other').toLowerCase();
      (grouped[key] || (grouped[key] = [])).push(q);
    }
    const levels = [...order.filter((l) => grouped[l]), ...Object.keys(grouped).filter((l) => !order.includes(l))];
    levels.forEach((level) => {
      this.ensure(24);
      this.writeRuns([{ text: level.toUpperCase() }], { size: 10.5, color: this.accent, forceBold: true, paraGap: 5 });
      grouped[level].forEach((q) => {
        this.ensure(28);
        this.writeRuns([{ text: 'Q. ', bold: true }, { text: sanitizeText(q.question), bold: true }], { size: 10, paraGap: 2 });
        this.writeRuns([{ text: 'A. ', bold: true }, { text: sanitizeText(q.answer) }], { size: 10, color: this.colors.text, paraGap: 9 });
      });
    });
  }

  // ── cover ────────────────────────────────────────────────────────────────
  addCover({ title, subtitle, author, version, date, kicker = 'Learning Track' }) {
    const d = this.doc;
    d.setFillColor(...this.accent);
    d.rect(0, 0, this.pageW, 150, 'F');
    d.setFont('helvetica', 'bold');
    d.setFontSize(15);
    d.setTextColor(255, 255, 255);
    d.text('Dev.EL', this.margin, 62);
    d.setFont('helvetica', 'normal');
    d.setFontSize(10.5);
    d.text(sanitizeText(kicker), this.margin, 82);

    let y = 300;
    d.setTextColor(...this.colors.heading);
    d.setFont('helvetica', 'bold');
    d.setFontSize(30);
    const titleLines = d.splitTextToSize(sanitizeText(title), this.contentW);
    d.text(titleLines, this.margin, y);
    y += titleLines.length * 34 + 8;
    if (subtitle) {
      d.setFont('helvetica', 'normal');
      d.setFontSize(12.5);
      d.setTextColor(...this.colors.muted);
      const subLines = d.splitTextToSize(sanitizeText(subtitle), this.contentW);
      d.text(subLines, this.margin, y);
    }

    const rows = [['Author', author], ['Version', version], ['Generated', date]];
    let my = this.pageH - 150;
    d.setDrawColor(...this.colors.rule);
    d.line(this.margin, my - 24, this.margin + this.contentW, my - 24);
    rows.forEach(([k, v]) => {
      d.setFont('helvetica', 'bold');
      d.setFontSize(9.5);
      d.setTextColor(...this.colors.muted);
      d.text(k.toUpperCase(), this.margin, my);
      d.setFont('helvetica', 'normal');
      d.setFontSize(11);
      d.setTextColor(...this.colors.heading);
      d.text(sanitizeText(v || '-'), this.margin + 100, my);
      my += 24;
    });
    this.noFooterPages.add(this.pageNumber());
  }

  // ── table of contents entries ────────────────────────────────────────────
  writeTocHeading(text) {
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(22);
    this.doc.setTextColor(...this.colors.heading);
    this.doc.text(sanitizeText(text), this.margin, this.y + 22);
    this.y += 40;
  }

  writeTocEntry({ index, title, page, group }) {
    const d = this.doc;
    const size = group ? 11 : 10;
    const lineH = group ? 21 : 17;
    if (group) this.y += 8;
    const x = this.margin + (group ? 0 : 16);
    const baseline = this.y + size;

    d.setFont('helvetica', group ? 'bold' : 'normal');
    d.setFontSize(size);
    const pageStr = String(page);
    const pageW = d.getTextWidth(pageStr);
    const label = group ? sanitizeText(title) : `${index}.  ${sanitizeText(title)}`;
    const maxLabelW = this.contentW - (x - this.margin) - pageW - 14;
    let text = label;
    if (d.getTextWidth(text) > maxLabelW) {
      while (d.getTextWidth(text + '...') > maxLabelW && text.length > 4) text = text.slice(0, -1);
      text += '...';
    }

    d.setTextColor(...(group ? this.accent : this.colors.text));
    d.text(text, x, baseline);

    if (!group) {
      const textW = d.getTextWidth(text);
      const dotStart = x + textW + 4;
      const dotEnd = this.margin + this.contentW - pageW - 4;
      if (dotEnd > dotStart) {
        const dotW = d.getTextWidth('.') || 2;
        const dots = '.'.repeat(Math.max(0, Math.floor((dotEnd - dotStart) / dotW)));
        d.setTextColor(...this.colors.rule);
        d.text(dots, dotStart, baseline);
      }
    }
    d.setTextColor(...(group ? this.accent : this.colors.muted));
    d.text(pageStr, this.margin + this.contentW - pageW, baseline);
    this.y += lineH;
  }

  // ── footers ────────────────────────────────────────────────────────────
  finalizeFooters() {
    const total = this.totalPages();
    for (let p = 1; p <= total; p++) {
      if (this.noFooterPages.has(p)) continue;
      this.doc.setPage(p);
      const fy = this.pageH - this.margin + 14;
      this.doc.setDrawColor(...this.colors.rule);
      this.doc.line(this.margin, fy - 12, this.margin + this.contentW, fy - 12);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(8.5);
      this.doc.setTextColor(...this.colors.muted);
      if (this.footerLabel) this.doc.text(sanitizeText(this.footerLabel), this.margin, fy);
      const ptxt = `${p} / ${total}`;
      const w = this.doc.getTextWidth(ptxt);
      this.doc.text(ptxt, this.margin + this.contentW - w, fy);
    }
  }

  arrayBuffer() { return this.doc.output('arraybuffer'); }
  blob() { return this.doc.output('blob'); }
}
