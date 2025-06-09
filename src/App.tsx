import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import CalorieCounter from './components/calorieCounter/CalorieCounter';
import Navbar from './common/Navbar/Navbar';
import { AuthProvider } from './context/auth-context';
import JournalWriting from './components/JournalWriting/JournalWriting';
import AuthenticatedRoutes from './routes/AuthenticatedRoutes';
import ViewJournalEntry from './components/JournalWriting/ViewJournalEntry';
import MealDashboard from './components/mealDashboard/MealDashboard';
import ViewExercises from './components/exercise/ViewExercise';
import ExerciseForm from './components/exercise/ExerciseForm';
import Profile from './components/profile/Profile';
import JobsTracker from './components/JobsTracker/JobsTracker';

function App() {
  return (
    <AuthProvider>

      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobsTracker />} />
          <Route path="/" element={<AuthenticatedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/calorie-counter" element={<CalorieCounter />} />
            <Route path="/personal-journal" element={<JournalWriting />} />
            <Route path="/journal-entry/:id" element={<ViewJournalEntry />} />
            <Route path="/personalised-diet" element={<MealDashboard />} />
            <Route path="/fitness" element={<ExerciseForm/>}/>
            <Route path="/my-profile" element={<Profile/>}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
