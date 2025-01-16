import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react'
import store from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    // Where Auth0 should redirect users after login
    authorizationParams={{
      audience: 'aca-capstone',
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
  </BrowserRouter>
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
