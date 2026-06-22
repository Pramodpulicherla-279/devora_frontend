import ProfileScreen from '../screens/Profile/ProfileScreen.jsx';
import { buildMeta } from '../utils/seoHelpers';

export function meta() {
  return buildMeta({ title: 'My Profile', noindex: true });
}

export default function ProfileRoute() {
  return <ProfileScreen />;
}
