// App.jsx
//
// Loading strategy:
//   EAGER  — routes users reach via direct URL, bookmark, or shared link.
//            These must paint instantly on hard load/refresh with zero Suspense flash.
//   LAZY   — secondary routes only ever reached by in-app navigation.
//            A brief branded loader on first visit is acceptable.
//
//   Eager:  LandingPage, TrackScreen, ProfileScreen, CourseScreen
//   Lazy:   RoadmapsScreen, AdminDashboard, TermsScreen, PrivacyPolicyScreen,
//           ResetPasswordScreen

import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './components/DevLoader/DevLoader.css';
import { trackPageView } from './analytics';

// ── Eager ────────────────────────────────────────────────────────────────────
import LandingPage    from './screens/LandingPage/LandingPage.jsx';
import TrackScreen    from './screens/Track/TrackScreen.jsx';
import ProfileScreen  from './screens/Profile/ProfileScreen.jsx';
import CourseScreen   from './screens/Lessons/lessons.jsx';

// ── Lazy ─────────────────────────────────────────────────────────────────────
const RoadmapsScreen      = lazy(() => import('./screens/Roadmaps/RoadmapsScreen.jsx'));
const AdminDashboard      = lazy(() => import('./Admin/dashboard.jsx'));
const TermsScreen         = lazy(() => import('./screens/TermsScreen/termsScreen.jsx'));
const PrivacyPolicyScreen = lazy(() => import('./screens/PrivacyPolicy/privacyPolicyScreen.jsx'));
const ResetPasswordScreen = lazy(() => import('./screens/ResetPassword/ResetPasswordScreen.jsx'));

/** Suspense fallback — only fires for secondary lazy routes.
 *  Uses the same .dvl-* classes as DevLoader so the design is consistent. */
function PageLoader() {
  return (
    <div className="dvl-screen">
      <div className="dvl-card">
        <div className="dvl-spinner-wrap">
          <div className="dvl-halo" />
          <div className="dvl-spinner">
            <div className="dvl-spinner-mask" />
          </div>
          <span className="dvl-letter">D</span>
        </div>
        <div className="dvl-brand">Dev<span className="dvl-dot">.</span>EL</div>
        <div className="dvl-dots"><span /><span /><span /></div>
      </div>
    </div>
  );
}

/** Logs a GA4 page_view on every route change (SPA navigations aren't tracked
 *  automatically). */
function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  return null;
}

export default function App() {
  return (
    <>
      <RouteTracker />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ── Eager routes — zero Suspense flash ── */}
          <Route path="/"                               element={<LandingPage />} />
          <Route path="/track/:slug"                    element={<TrackScreen />} />
          <Route path="/course/:courseSlug/:lessonSlug" element={<CourseScreen />} />
          <Route path="/course/:courseSlug"             element={<CourseScreen />} />
          <Route path="/profile"                        element={<ProfileScreen />} />

          {/* ── Lazy routes — brief loader on first visit is fine ── */}
          <Route path="/roadmaps"              element={<RoadmapsScreen />} />
          <Route path="/roadmaps/:slug"        element={<RoadmapsScreen />} />
          <Route path="/admin-dashboard"       element={<AdminDashboard />} />
          <Route path="/terms"                 element={<TermsScreen />} />
          <Route path="/privacy-policy"        element={<PrivacyPolicyScreen />} />
          <Route path="/reset-password/:token" element={<ResetPasswordScreen />} />
        </Routes>
      </Suspense>
    </>
  );
}
