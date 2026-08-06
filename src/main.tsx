import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';
import { SiteProvider } from './context/SiteContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SiteProvider>
        <App />
      </SiteProvider>
    </AuthProvider>
  </StrictMode>,
);
