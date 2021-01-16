import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import Admin from "layouts/Admin/Admin.js";
import AuthLayout from "layouts/Auth/Auth";

import "./assets/scss/black-dashboard-pro-react.scss";
import "./assets/demo/demo.css";
import "./assets/css/nucleo-icons.css";

class App extends React.Component {
    
    render()
    {
        return (
            <Switch>
                <Route path="/auth" render={props => <AuthLayout {...props} />} />
                <Route path="/admin" render={props => <Admin {...props} />} />
                <Redirect from="/" to="/admin/dashboard" />
            </Switch>
        )
    }
}

export default App;
