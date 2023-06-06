import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';
// import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { Auth0Provider } from '@auth0/auth0-react';
import dotenv from 'dotenv';

dotenv.config();

const domain= process.env.REACT_APP_AUTH0_DOMAIN;
const clientId= process.env.REACT_APP_AUTH0_CLIENT_ID;
console.log(domain, clientId)
ReactDOM.render(
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
  </React.StrictMode>,
  document.getElementById('root')
);


