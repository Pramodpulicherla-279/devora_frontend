// buildTrackPdf.js
//
// Orchestrates the "Download track as PDF/ZIP" feature entirely on the client:
//   1. Fetch every course in the track (full lesson content) from the API.
//   2. Build ONE PDF for the whole track — cover page, table of contents, then
//      every lesson (theory, code blocks, diagrams-as-links). No quiz/interview.
//   3. Build ONE "Interview Questions" PDF for the whole track, organised by
//      course then lesson.
//   4. Pack both PDFs into a single ZIP and download.
//
// Nothing here touches the backend beyond the public GET /api/courses/:slug.

import JSZip from 'jszip';
import { API_BASE_URL } from '../../../config';
import { PdfBuilder } from './PdfBuilder.js';
import { htmlToBlocks } from './htmlToBlocks.js';
import { sanitizeText, safeFileName } from './text.js';

function formatDate(d = new Date()) {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/** Flatten a populated course into an ordered list of lessons across its parts. */
function courseLessons(course) {
  const lessons = [];
  (course.parts || []).forEach((part) => {
    (part.lessons || []).forEach((lesson) => {
      if (lesson && lesson.title) lessons.push(lesson);
    });
  });
  return lessons;
}

async function fetchFullCourse(courseRef) {
  const id = courseRef.slug || courseRef._id;
  try {
    const res = await fetch(`${API_BASE_URL}/api/courses/${encodeURIComponent(id)}`);
    const data = await res.json();
    if (data && data.success && data.data) return data.data;
  } catch { /* fall through to the shallow ref */ }
  return { ...courseRef, parts: courseRef.parts || [] };
}

/** Draw a full-width course separator at the top of the current page. */
function courseDivider(builder, num, title, lessonCount) {
  const d = builder.doc;
  builder.y = builder.margin + 40;
  d.setFont('helvetica', 'bold');
  d.setFontSize(11);
  d.setTextColor(...builder.accent);
  d.text(`COURSE ${num}`, builder.margin, builder.y);
  builder.y += 30;
  d.setFontSize(26);
  d.setTextColor(...builder.colors.heading);
  const lines = d.splitTextToSize(sanitizeText(title), builder.contentW);
  d.text(lines, builder.margin, builder.y);
  builder.y += lines.length * 30 + 6;
  d.setFont('helvetica', 'normal');
  d.setFontSize(11);
  d.setTextColor(...builder.colors.muted);
  d.text(`${lessonCount} lesson${lessonCount !== 1 ? 's' : ''}`, builder.margin, builder.y);
  builder.y += 18;
  d.setFillColor(...builder.accent);
  d.rect(builder.margin, builder.y, builder.contentW, 3, 'F');
  builder.y += 24;
}

function renderLesson(builder, lesson, number, { siteOrigin, courseSlug }) {
  builder.writeLessonTitle(number, lesson.title || 'Untitled Lesson');
  const meta = [];
  if (lesson.estimatedTime) meta.push(`Estimated reading time: ${lesson.estimatedTime} min`);
  if (lesson.difficulty) meta.push(`Level: ${lesson.difficulty}`);
  builder.writeLessonMeta(meta);

  const lessonUrl = courseSlug && lesson.slug ? `${siteOrigin}/course/${courseSlug}/${lesson.slug}` : '';
  const blocks = htmlToBlocks(lesson.content || '');

  builder.writeSectionLabel('Theory');
  if (blocks.length) builder.renderBlocks(blocks, { lessonUrl });
  else builder.writeParagraph([{ text: 'No lesson content available.' }]);
  // Quiz and interview questions are intentionally omitted from the main
  // lesson PDF — interview questions live in a dedicated track-wide PDF.
}

// One interview-questions PDF for the WHOLE track, organised course-by-course
// and then lesson-by-lesson. Courses/lessons with no interview questions are
// skipped. Returns null if the entire track has none.
function buildTrackInterviewPdf({ track, courseData, accent, author, version, date }) {
  const builder = new PdfBuilder({ accent, footerLabel: `${track.name} — Interview Questions` });
  builder.addCover({
    title: track.name,
    subtitle: 'Interview Questions',
    author,
    version,
    date,
    kicker: `${track.type || 'Learning'} Track — Interview Prep`,
  });

  let wroteAny = false;
  courseData.forEach(({ course, lessons }, ci) => {
    const lessonsWithQs = lessons.filter((l) => l.interviewQuestions && l.interviewQuestions.length);
    if (!lessonsWithQs.length) return;
    wroteAny = true;

    // Each course starts on a fresh page with a full-width divider.
    builder.addPage();
    courseDivider(builder, ci + 1, course.title, lessonsWithQs.length);

    lessonsWithQs.forEach((lesson) => {
      builder.ensure(64);
      builder.writeRuns([{ text: sanitizeText(lesson.title || 'Lesson') }], {
        size: 14, color: builder.colors.heading, forceBold: true, paraGap: 6,
      });
      builder.writeInterview(lesson.interviewQuestions);
      builder.writeHr();
    });
  });

  if (!wroteAny) return null;
  builder.finalizeFooters();
  return builder.arrayBuffer();
}

/**
 * Build the whole export and trigger a browser download of the ZIP.
 *
 * @param {object} track  the track object (must contain `courses`)
 * @param {object} opts
 * @param {string} opts.accent   hex colour for headings/accents
 * @param {string} opts.author   cover-page author (default "Devora")
 * @param {string} opts.version  cover-page version (default "1.0")
 * @param {(p:{pct:number,label:string})=>void} opts.onProgress
 */
export async function downloadTrackAsZip(track, opts = {}) {
  const {
    accent = '#6366f1',
    author = 'Dev.EL',
    version = '1.0',
    onProgress,
  } = opts;
  const report = (pct, label) => onProgress && onProgress({ pct: Math.round(pct), label });
  const siteOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://dev-el.co';
  const date = formatDate();

  const courseRefs = track.courses || [];
  if (!courseRefs.length) throw new Error('This track has no courses to export.');

  // ── 1. Fetch full course content ─────────────────────────────────────────
  report(3, 'Preparing export…');
  const courseData = [];
  for (let i = 0; i < courseRefs.length; i++) {
    report(4 + (i / courseRefs.length) * 30, `Fetching "${courseRefs[i].title}"…`);
    const full = await fetchFullCourse(courseRefs[i]);
    courseData.push({ course: full, lessons: courseLessons(full) });
  }
  const totalLessons = courseData.reduce((s, c) => s + c.lessons.length, 0);
  if (!totalLessons) throw new Error('No lessons found in this track.');

  // ── 2. Main track PDF: cover ─────────────────────────────────────────────
  report(35, 'Building track PDF…');
  const builder = new PdfBuilder({ accent, footerLabel: track.name });
  builder.addCover({
    title: track.name,
    subtitle: track.description || '',
    author,
    version,
    date,
    kicker: `${track.type || 'Learning'} Track`,
  });

  // ── 2b. Reserve TOC pages (filled after the body is laid out) ────────────
  const tocUsableH = builder.pageH - builder.margin * 2 - 40;
  const estToc = courseData.length * 29 + totalLessons * 17;
  const reservedTocPages = Math.max(1, Math.ceil(estToc / tocUsableH)) + 1;
  const tocPages = [];
  for (let i = 0; i < reservedTocPages; i++) {
    builder.addPage();
    builder.noFooterPages.add(builder.pageNumber());
    tocPages.push(builder.pageNumber());
  }

  // ── 2c. Body: each course, then each lesson ─────────────────────────────
  const tocEntries = [];
  let lessonNumber = 0;
  let done = 0;
  for (let ci = 0; ci < courseData.length; ci++) {
    const { course, lessons } = courseData[ci];
    builder.addPage();
    tocEntries.push({ group: true, title: `Course ${ci + 1}: ${course.title}`, page: builder.pageNumber() });
    courseDivider(builder, ci + 1, course.title, lessons.length);

    for (const lesson of lessons) {
      lessonNumber++;
      builder.space(6);
      builder.ensure(96); // keep the lesson title off the very bottom of a page
      tocEntries.push({ group: false, index: lessonNumber, title: lesson.title, page: builder.pageNumber() });
      renderLesson(builder, lesson, lessonNumber, { siteOrigin, courseSlug: course.slug });
      builder.writeHr();
      done++;
      report(35 + (done / totalLessons) * 45, `Rendering lesson ${done}/${totalLessons}…`);
    }
  }

  // ── 2d. Fill the reserved TOC pages ─────────────────────────────────────
  report(81, 'Building table of contents…');
  builder.gotoPageTop(tocPages[0]);
  builder.writeTocHeading('Table of Contents');
  let tp = 0;
  for (const entry of tocEntries) {
    const needH = entry.group ? 29 : 17;
    if (builder.y + needH > builder.tocBottomLimit() && tp < tocPages.length - 1) {
      tp++;
      builder.gotoPageTop(tocPages[tp]);
    }
    builder.writeTocEntry(entry);
  }

  builder.finalizeFooters();
  const mainPdf = builder.arrayBuffer();

  // ── 3. Single track-wide interview-question PDF (course + lesson wise) ────
  const zip = new JSZip();
  const trackName = safeFileName(track.name, 'Track');
  zip.file(`${trackName}.pdf`, mainPdf);

  report(85, 'Building interview questions PDF…');
  const interviewPdf = buildTrackInterviewPdf({ track, courseData, accent, author, version, date });
  if (interviewPdf) {
    zip.file(`${trackName} - Interview Questions.pdf`, interviewPdf);
  }

  // ── 4. Zip + download ────────────────────────────────────────────────────
  report(94, 'Compressing ZIP…');
  const blob = await zip.generateAsync(
    { type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } },
    (meta) => report(94 + meta.percent * 0.05, 'Compressing ZIP…'),
  );

  saveBlob(blob, `${trackName}.zip`);
  report(100, 'Done');
  return { totalLessons, courses: courseData.length };
}

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
