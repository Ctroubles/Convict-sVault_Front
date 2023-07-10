import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';
import { Provider } from 'react-redux';
import "./index.css";
import { Auth0Provider } from '@auth0/auth0-react';
import dotenv from 'dotenv';
import store from './Redux/store/store';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

dotenv.config();

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const paypalClientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <PayPalScriptProvider
        options={{
          "client-id": paypalClientId,
          currency: "USD",
        }}
      >
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
      </PayPalScriptProvider>
    </Provider>
  </Auth0Provider>,
  document.getElementById('root')
);
