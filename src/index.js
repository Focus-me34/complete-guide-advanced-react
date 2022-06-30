import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { AuthContextProviders } from './context/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AuthContextProviders><App /></AuthContextProviders>);
