import TermsScreen from '../screens/TermsScreen/termsScreen.jsx';
import { buildMeta } from '../utils/seoHelpers';

export function meta() {
  return buildMeta({ title: 'Terms of Service', description: 'Dev.EL terms of service.', canonical: '/terms', noindex: true });
}

export default function TermsRoute() {
  return <TermsScreen />;
}
