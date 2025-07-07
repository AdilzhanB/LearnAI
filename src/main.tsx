import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';

console.log('main.tsx: Starting application...');

const rootElement = document.getElementById('root');
console.log('main.tsx: Root element:', rootElement);

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  console.log('main.tsx: React root created:', root);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  console.log('main.tsx: App rendered successfully');
} else {
  console.error('main.tsx: Root element not found!');
}
