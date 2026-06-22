import TrackScreen from '../screens/Track/TrackScreen.jsx';
import { buildMeta, slugToTitle } from '../utils/seoHelpers';

const BASE = 'https://dev-el.co';

export function meta({ params }) {
  const name = slugToTitle(params.slug);
  return buildMeta({
    title: `${name} Learning Track`,
    description: `Learn ${name} with free interactive lessons, quizzes, and live coding on Dev.EL — from beginner to advanced.`,
    canonical: `/track/${params.slug}`,
    jsonLd: [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
          { '@type': 'ListItem', position: 2, name: `${name} Track`, item: `${BASE}/track/${params.slug}` },
        ],
      },
    ],
  });
}

export default function TrackRoute() {
  return <TrackScreen />;
}
