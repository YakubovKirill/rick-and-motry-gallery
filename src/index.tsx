import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { persister, store } from './store';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { theme } from './shared/theme';
import { LABEL } from './label';
import { MessageWrap } from './components/MessageWrap/MessageWrap';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <PersistGate loading={ <MessageWrap message={ LABEL.LOADING } /> } persistor={ persister }>
      <ThemeProvider theme={theme}>
        <Provider store={ store }>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </PersistGate>
  </React.StrictMode>
);
