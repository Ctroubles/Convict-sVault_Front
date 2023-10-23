import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import store from './Redux/store/store';
import "./index.css";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin + "/home"}
  >
    <Provider store={store}>
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
    </Provider>
  </Auth0Provider>,
  document.getElementById('root')
);
