import PrivacyPolicyScreen from '../screens/PrivacyPolicy/privacyPolicyScreen.jsx';
import { buildMeta } from '../utils/seoHelpers';

export function meta() {
  return buildMeta({ title: 'Privacy Policy', description: 'Dev.EL privacy policy.', canonical: '/privacy-policy', noindex: true });
}

export default function PrivacyRoute() {
  return <PrivacyPolicyScreen />;
}
