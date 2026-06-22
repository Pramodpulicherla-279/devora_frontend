import CourseScreen from '../screens/Lessons/lessons.jsx';
import { API_BASE_URL } from '../../config';
import { buildMeta, htmlToPlain, slugToTitle } from '../utils/seoHelpers';

const BASE = 'https://dev-el.co';
const PROVIDER = { '@type': 'EducationalOrganization', name: 'Dev.EL', url: BASE };

// During the build, the same course is requested for every one of its lessons.
// Cache per courseSlug so we hit the API once per course, not once per lesson.
const _cache = new Map();

// Server loader: with ssr:true this runs at build time for every prerendered
// course/lesson path, so its data is baked synchronously into the static HTML.
// useLoaderData() in CourseScreen reads it.
export async function loader({ params }) {
  const slug = params.courseSlug;
  if (_cache.has(slug)) return { course: _cache.get(slug) };
  try {
    const res = await fetch(`${API_BASE_URL}/api/courses/${slug}`);
    const json = await res.json();
    const course = json?.data ?? null;
    _cache.set(slug, course);
    return { course };
  } catch {
    return { course: null };
  }
}

function findLesson(course, lessonSlug) {
  if (!course?.parts) return null;
  for (const part of course.parts) {
    const l = part.lessons?.find((x) => x.slug === lessonSlug);
    if (l) return l;
  }
  return course.parts[0]?.lessons?.[0] ?? null;
}

export function meta({ data, params }) {
  const course = data?.course;
  const { courseSlug, lessonSlug } = params;
  const courseTitle = course?.title || slugToTitle(courseSlug);
  const courseUrl = `${BASE}/course/${courseSlug}`;

  // Course overview (no lesson in the URL)
  if (!lessonSlug) {
    return buildMeta({
      title: `${courseTitle} Course — Free Interactive Tutorial`,
      description: `Learn ${courseTitle} step by step with free interactive lessons, quizzes, and live coding on Dev.EL.`,
      canonical: `/course/${courseSlug}`,
      jsonLd: [
        {
          '@type': 'Course',
          '@id': courseUrl,
          name: `${courseTitle} Course`,
          description: `Learn ${courseTitle} from beginner to advanced on Dev.EL.`,
          url: courseUrl,
          provider: PROVIDER,
          inLanguage: 'en',
          isAccessibleForFree: true,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: `${courseTitle} Course`, item: courseUrl },
          ],
        },
      ],
    });
  }

  // Individual lesson
  const lesson = findLesson(course, lessonSlug);
  const description = htmlToPlain(lesson?.content, 158);
  const lessonUrl = `${courseUrl}/${lessonSlug}`;

  const jsonLd = [
    {
      '@type': 'LearningResource',
      '@id': lessonUrl,
      name: lesson?.title,
      description,
      url: lessonUrl,
      learningResourceType: 'Tutorial',
      teaches: lesson?.title,
      educationalLevel: lesson?.difficulty || 'beginner',
      inLanguage: 'en',
      isPartOf: { '@type': 'Course', '@id': courseUrl, name: `${courseTitle} Course`, url: courseUrl },
      provider: PROVIDER,
      ...(lesson?.estimatedTime ? { timeRequired: `PT${lesson.estimatedTime}M` } : {}),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: `${courseTitle} Course`, item: courseUrl },
        { '@type': 'ListItem', position: 3, name: lesson?.title, item: lessonUrl },
      ],
    },
  ];

  if (lesson?.quiz?.length) {
    jsonLd.push({
      '@type': 'FAQPage',
      mainEntity: lesson.quiz.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: { '@type': 'Answer', text: q.explanation || q.options?.[q.correctIndex] || '' },
      })),
    });
  }

  return buildMeta({
    title: `${lesson?.title || courseTitle} — ${courseTitle} Tutorial`,
    description,
    canonical: `/course/${courseSlug}/${lessonSlug}`,
    jsonLd,
  });
}

export default function CourseRoute() {
  return <CourseScreen />;
}
