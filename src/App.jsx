// import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/homeScreen.jsx';
// import CoursesScreen from './screens/Courses/courses.jsx';
import CourseScreen from './screens/Lessons/lessons.jsx';
import AdminDashboard from './Admin/dashboard.jsx';
import TermsScreen from './screens/TermsScreen/termsScreen.jsx';
import PrivacyPolicyScreen from './screens/PrivacyPolicy/privacyPolicyScreen.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        {/* <Route path="/courses" element={<CoursesScreen />} /> */}
        <Route path="/course/:courseSlug/:lessonSlug" element={<CourseScreen />} />
        <Route path="/course/:courseSlug" element={<CourseScreen />} />
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        <Route path="/terms" element={<TermsScreen />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyScreen />} />

      </Routes>
    </>
  );
}

export default App;