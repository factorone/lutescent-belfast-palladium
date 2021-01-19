import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Store } from "services/Store";

import Dashboard from "layouts/Private/Dashboard";
import Account from "layouts/Private/Account";
import Integrations from "layouts/Private/Integrations";
import Configuration from "layouts/Private/Configuration";

class Router extends Component 
{
    constructor(props) 
    {
        super(props);
    }

    render() 
    {
        return (
            <Switch>
                {/* Private routes */}
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/account" component={Account} />
                <Route exact path="/integrations" component={Integrations} />
                <Route exact path="/integrations/Add" component={Integrations} />
                <Route exact path="/configuration" component={Configuration} />
                
                
            </Switch>
        );
    }
}

export default Router;