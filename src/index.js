import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ReduxProvider } from './store/provider';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReduxProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
