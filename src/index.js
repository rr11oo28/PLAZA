import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Shuni qo'shish kerak
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* App componentini BrowserRouter bilan o'raymiz */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

serviceWorkerRegistration.register();