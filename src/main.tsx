import './styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { assertInstanceOf } from './utils/assertInstance';
const rootElement = document.getElementById('root');
assertInstanceOf(rootElement, HTMLElement);

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
