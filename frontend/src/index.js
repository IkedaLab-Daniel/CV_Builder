import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext';
import { ResumeContextProvider } from './context/ResumeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WorkoutsContextProvider>
      <ResumeContextProvider>
        <App />
      </ResumeContextProvider>
    </WorkoutsContextProvider>
  </React.StrictMode>
)