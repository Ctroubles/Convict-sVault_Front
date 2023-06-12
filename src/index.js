import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';
import { Provider } from 'react-redux';
import "./index.css";
import { Auth0Provider, User } from '@auth0/auth0-react';
import dotenv from 'dotenv';
import store from './Redux/store/store';
dotenv.config();

const domain= process.env.REACT_APP_AUTH0_DOMAIN;
const clientId= process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience= process.env.REACT_APP_AUTH0_AUDIENCE;
const scope = "openid profile email";

const handleRedirectCallback = (appState) => {
  console.log('Autenticación completada');
  console.log(appState);
  console.log(User)
};

ReactDOM.render(
    <Provider store={store}>
  <React.StrictMode>
    <Auth0Provider 
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    audience={audience}
    scope={scope}
    onRedirectCallback={handleRedirectCallback}
    useRefreshTokens={false}
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


