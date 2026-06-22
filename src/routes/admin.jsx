import AdminDashboard from '../Admin/dashboard.jsx';
import { buildMeta } from '../utils/seoHelpers';

export function meta() {
  return buildMeta({ title: 'Admin Dashboard', noindex: true });
}

export default function AdminRoute() {
  return <AdminDashboard />;
}
