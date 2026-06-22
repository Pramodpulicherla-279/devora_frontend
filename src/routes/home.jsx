import LandingPage from '../screens/LandingPage/LandingPage.jsx';
import { buildMeta } from '../utils/seoHelpers';

export function meta() {
  return buildMeta({
    title: 'Go from Beginner to Advanced Developer — Free Coding Courses',
    description:
      'Dev.EL transforms beginners into advanced developers with free interactive courses in HTML, CSS, JavaScript, React, Node.js, SQL, Git, and more — live coding, AI tutoring, quizzes, and roadmaps all included.',
    canonical: '/',
  });
}

export default function HomeRoute() {
  return <LandingPage />;
}
