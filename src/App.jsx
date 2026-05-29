// import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './screens/LandingPage/LandingPage.jsx';
// import HomeScreen from './screens/HomeScreen/homeScreen.jsx';
// import CoursesScreen from './screens/Courses/courses.jsx';
import CourseScreen from './screens/Lessons/lessons.jsx';
import AdminDashboard from './Admin/dashboard.jsx';
import TermsScreen from './screens/TermsScreen/termsScreen.jsx';
import PrivacyPolicyScreen from './screens/PrivacyPolicy/privacyPolicyScreen.jsx';
import TrackScreen from './screens/Track/TrackScreen.jsx';
import ProfileScreen from './screens/Profile/ProfileScreen.jsx';
import RoadmapsScreen from './screens/Roadmaps/RoadmapsScreen.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/courses" element={<CoursesScreen />} /> */}
        <Route path="/track/:slug" element={<TrackScreen />} />
        <Route path="/course/:courseSlug/:lessonSlug" element={<CourseScreen />} />
        <Route path="/course/:courseSlug" element={<CourseScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/roadmaps" element={<RoadmapsScreen />} />
        <Route path="/roadmaps/:slug" element={<RoadmapsScreen />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/terms" element={<TermsScreen />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyScreen />} />
      </Routes>
    </>
  );
}

export default App;