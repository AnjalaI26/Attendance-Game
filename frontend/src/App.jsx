import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/StudentDashboard';
import ProfessorDashboard from './components/ProfessorDashboard';

// Create a wrapper component to access useNavigate
function AppRoutes() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          user ? (
            <Navigate to={user.role === 'student' ? '/student' : '/professor'} />
          ) : (
            <LoginPage setUser={setUser} />
          )
        } 
      />
      <Route 
        path="/student" 
        element={
          user && user.role === 'student' ? (
            <StudentDashboard user={user} setUser={setUser} navigate={navigate} />
          ) : (
            <Navigate to="/" />
          )
        } 
      />
      <Route 
        path="/professor" 
        element={
          user && user.role === 'professor' ? (
            <ProfessorDashboard user={user} setUser={setUser} navigate={navigate} />
          ) : (
            <Navigate to="/" />
          )
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;