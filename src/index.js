import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Store, persistor } from './Redux/Store';
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Provider store={Store}>
            <PersistGate loading={null} persistor={persistor}>
                <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}>
                    <App />
                </GoogleOAuthProvider>
            </PersistGate>
      </Provider>
    </React.StrictMode>
);