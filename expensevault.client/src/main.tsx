// eslint-disable-next-line simple-import-sort/imports
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { createRoot } from 'react-dom/client';

import '@core/i18n/i18n';

import { store } from './stores/store';
import App from './App';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
