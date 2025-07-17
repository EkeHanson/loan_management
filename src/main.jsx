import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ClockProvider } from './context/ClockContext';
import { MobileNavProvider } from './context/MobileNavContext'; // ✅ Import MobileNavProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClockProvider>
        <MobileNavProvider> {/* ✅ Wrap App inside MobileNavProvider */}
          <App />
        </MobileNavProvider>
      </ClockProvider>
    </BrowserRouter>
  </React.StrictMode>
);
