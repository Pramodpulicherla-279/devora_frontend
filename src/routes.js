// src/routes.js — React Router framework-mode route config.
// Paths are relative to appDirectory ('src'). Each module exports a default
// component and optional `loader` / `meta`. The same course module backs both
// the lesson and course-overview paths (distinct ids required).
import { index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.jsx'),
  route('track/:slug', 'routes/track.jsx'),
  route('course/:courseSlug/:lessonSlug', 'routes/course.jsx', { id: 'course-lesson' }),
  route('course/:courseSlug', 'routes/course.jsx', { id: 'course-index' }),
  route('profile', 'routes/profile.jsx'),
  route('roadmaps', 'routes/roadmaps.jsx'),
  route('roadmaps/:slug', 'routes/roadmaps.jsx', { id: 'roadmaps-slug' }),
  route('admin-dashboard', 'routes/admin.jsx'),
  route('terms', 'routes/terms.jsx'),
  route('privacy-policy', 'routes/privacy.jsx'),
  route('reset-password/:token', 'routes/reset.jsx'),
];
