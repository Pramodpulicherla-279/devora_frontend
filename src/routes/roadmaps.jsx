import RoadmapsScreen from '../screens/Roadmaps/RoadmapsScreen.jsx';
import { ROADMAPS } from '../screens/Roadmaps/roadmapData';
import { buildMeta } from '../utils/seoHelpers';

const BASE = 'https://dev-el.co';

export function meta({ params }) {
  const slug = params.slug;

  if (!slug) {
    return buildMeta({
      title: 'Web Developer Roadmaps 2025 — Step-by-Step Learning Paths',
      description:
        'Step-by-step interactive developer roadmaps for Frontend, Backend, Full Stack, Data Analytics, DevOps, Automation Testing, Prompt Engineering, and AI Engineering — all free on Dev.EL.',
      canonical: '/roadmaps',
    });
  }

  const rm = ROADMAPS.find((r) => r.slug === slug);
  const name = rm?.name || slug;
  const jsonLd = rm
    ? [
        {
          '@type': 'HowTo',
          name: `How to become a ${name} developer`,
          description: rm.description,
          totalTime: 'P3M',
          step: (rm.phases || []).map((phase, i) => ({
            '@type': 'HowToSection',
            position: i + 1,
            name: phase.title,
            itemListElement: (phase.steps || []).map((s, j) => ({
              '@type': 'HowToStep',
              position: j + 1,
              name: s.title,
              text: s.description || s.title,
            })),
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Roadmaps', item: `${BASE}/roadmaps` },
            { '@type': 'ListItem', position: 3, name, item: `${BASE}/roadmaps/${slug}` },
          ],
        },
      ]
    : null;

  return buildMeta({
    title: `${name} Developer Roadmap 2025`,
    description: `Complete ${name} learning roadmap — every skill you need, in the right order, with free interactive courses on Dev.EL.`,
    canonical: `/roadmaps/${slug}`,
    jsonLd,
  });
}

export default function RoadmapsRoute() {
  return <RoadmapsScreen />;
}
