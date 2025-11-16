// import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/homeScreen.jsx';
// import CoursesScreen from './screens/Courses/courses.jsx';
import CourseScreen from './screens/Lessons/lessons.jsx';
import AdminDashboard from './Admin/dashboard.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
         {/* <Route path="/courses" element={<CoursesScreen />} /> */}
         <Route path="/course/:courseId" element={<CourseScreen />} />
         <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
      </Routes>
    </>
  );
}

export default App;