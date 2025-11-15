// import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/homeScreen.jsx';
import CoursesScreen from './screens/Courses/courses.jsx';
import LessonsScreen from './screens/Lessons/lessons.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
         <Route path="/courses" element={<CoursesScreen />} />
         <Route path="/lessons" element={<LessonsScreen />} />
      </Routes>
    </>
  );
}

export default App;