import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Importa o arquivo de configuração do i18n
import './i18n/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
