import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider, IdProvider,StatusProvider } from './Auth/Auth';
import { BrowserRouter } from "react-router-dom"
ReactDOM.render(
    <AuthProvider>
        <IdProvider>
            <StatusProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
            </StatusProvider>
        </IdProvider>
    </AuthProvider>
    ,
    document.getElementById("root")
);