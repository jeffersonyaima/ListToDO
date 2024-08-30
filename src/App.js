import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import TaskList from './components/TaskList';

import ProtectedRoute from './components/ProtectedRoute';
import LogoutButton from './components/LogoutButton';

import "./App.css";

function App() {
  const [taskUpdated, setTaskUpdated] = useState(false);

  const handleTaskAdded = () => {
    setTaskUpdated(prev => !prev); // Trigger a re-render
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/tasks" 
          element={
            <ProtectedRoute>
              <TaskList key={taskUpdated} />
              <LogoutButton />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
