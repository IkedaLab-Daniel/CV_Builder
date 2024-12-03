import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ResumeContextProvider } from './context/ResumeContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthContextProvider>
        <ResumeContextProvider>
          <App />
        </ResumeContextProvider>
      </AuthContextProvider>
  </React.StrictMode>
)