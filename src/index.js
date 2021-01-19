import React from 'react';
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from './App';

import "./assets/scss/black-dashboard-pro-react.scss";
import "./assets/demo/demo.css";
import "./assets/css/nucleo-icons.css";

const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <App />
    </Router>,
    document.getElementById("root")
);