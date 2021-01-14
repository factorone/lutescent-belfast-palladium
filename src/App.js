import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import Pages from "layouts/Auth/Auth";

import "./assets/scss/black-dashboard-react.scss";
import "./assets/demo/demo.css";
import "./assets/css/nucleo-icons.css";

class App extends React.Component {
    
    render()
    {
        return (
            <Switch>
                <Route path="/admin" render={props => <AdminLayout {...props} />} />
                <Route path="/rtl" render={props => <RTLLayout {...props} />} />
                <Redirect from="/" to="/admin/dashboard" />
            </Switch>
        )
    }
}

export default App;
