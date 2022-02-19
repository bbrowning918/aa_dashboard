import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import { App } from './App';
import { store } from './redux/store';

import * as serviceWorker from './serviceWorker';
import { ErrorBoundary } from './ErrorBoundary';


export const websocket = new WebSocket("ws://desktop:8001/");

ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
