// App.jsx — lazy-loaded routes for maximum bundle splitting.
// Each route chunk is only downloaded when the user navigates to it.
// The Suspense fallback is a minimal full-screen loader so the UX
// stays smooth even on slow connections.
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const LandingPage        = lazy(() => import('./screens/LandingPage/LandingPage.jsx'));
const CourseScreen       = lazy(() => import('./screens/Lessons/lessons.jsx'));
const TrackScreen        = lazy(() => import('./screens/Track/TrackScreen.jsx'));
const ProfileScreen      = lazy(() => import('./screens/Profile/ProfileScreen.jsx'));
const RoadmapsScreen     = lazy(() => import('./screens/Roadmaps/RoadmapsScreen.jsx'));
const AdminDashboard     = lazy(() => import('./Admin/dashboard.jsx'));
const TermsScreen        = lazy(() => import('./screens/TermsScreen/termsScreen.jsx'));
const PrivacyPolicyScreen   = lazy(() => import('./screens/PrivacyPolicy/privacyPolicyScreen.jsx'));
const ResetPasswordScreen   = lazy(() => import('./screens/ResetPassword/ResetPasswordScreen.jsx'));

function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#0f0f13',
    }}>
      <div style={{
        width: 40,
        height: 40,
        border: '3px solid #7c3aed33',
        borderTop: '3px solid #7c3aed',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/"                               element={<LandingPage />} />
        <Route path="/track/:slug"                    element={<TrackScreen />} />
        <Route path="/course/:courseSlug/:lessonSlug" element={<CourseScreen />} />
        <Route path="/course/:courseSlug"             element={<CourseScreen />} />
        <Route path="/profile"                        element={<ProfileScreen />} />
        <Route path="/roadmaps"                       element={<RoadmapsScreen />} />
        <Route path="/roadmaps/:slug"                 element={<RoadmapsScreen />} />
        <Route path="/admin-dashboard"                element={<AdminDashboard />} />
        <Route path="/terms"                          element={<TermsScreen />} />
        <Route path="/privacy-policy"                 element={<PrivacyPolicyScreen />} />
        <Route path="/reset-password/:token"          element={<ResetPasswordScreen />} />
      </Routes>
    </Suspense>
  );
}

export default App;
