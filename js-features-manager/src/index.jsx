import React from 'react';
import { render } from 'react-dom';

import { GlobalStyles } from '@contentful/f36-components';
import { SDKProvider } from '@contentful/react-apps-toolkit';
import { Provider } from 'react-redux';

import App from './App';
import LocalhostWarning from './components/LocalhostWarning';
import { store } from './store';

const root = document.getElementById('root');

if (process.env.NODE_ENV === 'development' && window.self === window.top) {
  // You can remove this if block before deploying your app
  render(<LocalhostWarning />, root);
} else {
  render(
    <SDKProvider>
      <GlobalStyles />
      <Provider store={store}>
        <App />
      </Provider>
    </SDKProvider>,
    root
  );
}
