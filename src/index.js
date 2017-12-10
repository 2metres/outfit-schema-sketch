import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import '../node_modules/bootstrap/dist/css/bootstrap.css';

import App from './containers/App';

const load = () => render((
  <AppContainer>
    <App />
  </AppContainer>
), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./containers/App', load);
}

load();
