import ResetPasswordScreen from '../screens/ResetPassword/ResetPasswordScreen.jsx';
import { buildMeta } from '../utils/seoHelpers';

export function meta() {
  return buildMeta({ title: 'Reset Password', noindex: true });
}

export default function ResetRoute() {
  return <ResetPasswordScreen />;
}
