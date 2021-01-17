import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Store from "services/Store";

import Admin from "layouts/Admin/Admin.js";
import AuthLayout from "layouts/Auth/Auth";

class Router extends Component 
{
    constructor(props) 
    {
        super(props);
    }

    render() 
    {
        if(!Store.isLoggedIn())
        {
            return (
                //<LoginScreen />
            );
        }

        return (
            <Switch>
                <Route path="/auth" render={props => <AuthLayout {...props} />} />
                <Route path="/admin" render={props => <Admin {...props} />} />
                <Route path="/login" render={props => <AuthLayout {...props} />} />
                <Redirect from="/" to="/admin/dashboard" />
            </Switch>
        );
    }
}

export default Router;