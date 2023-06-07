import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';
import { Provider } from 'react-redux';
import "./index.css";
import { Auth0Provider } from '@auth0/auth0-react';
import dotenv from 'dotenv';
import store from './Redux/store/store';
dotenv.config();

const domain= process.env.REACT_APP_AUTH0_DOMAIN;
const clientId= process.env.REACT_APP_AUTH0_CLIENT_ID;


ReactDOM.render(
    <Provider store={store}>
  <React.StrictMode>
    <Auth0Provider 
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    >
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
      </Provider>
      ,
  document.getElementById('root')
);


