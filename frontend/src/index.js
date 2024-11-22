import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext';
import { ResumeContextProvider } from './context/ResumeContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WorkoutsContextProvider>
      <AuthContextProvider>
        <ResumeContextProvider>
          <App />
        </ResumeContextProvider>
      </AuthContextProvider>
    </WorkoutsContextProvider>
  </React.StrictMode>
)