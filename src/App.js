import React, { Component } from 'react';
import Store from "services/Store";
import Router from "Router";
import { Route, Switch, Redirect } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import NotificationAlert from "react-notification-alert";
import FixedPlugin from "components/FixedPlugin/FixedPlugin";

import Login from "./layouts/Public/Login";
import Register from "./layouts/Public/Register";
import ForgotPassword from "./layouts/Public/ForgotPassword";
import routes from "routes";

let ps;

class App extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
            activeColor: "blue",
            sidebarMini: true,
            opacity: 0,
            sidebarOpened: false
        };
    }

    componentDidMount() 
    {
        window.addEventListener("scroll", this.showNavbarButton);
    }

    componentWillUnmount() 
    {
        if (navigator.platform.indexOf("Win") > -1) 
        {
            ps.destroy();
            document.documentElement.classList.add("perfect-scrollbar-off");
            document.documentElement.classList.remove("perfect-scrollbar-on");
            this.refs.mainPanel.removeEventListener(
                "ps-scroll-y",
                this.showNavbarButton
            );
        }

        window.removeEventListener("scroll", this.showNavbarButton);
    }

    componentDidUpdate(e) 
    {
        console.log(e);
        /* if (e.location.pathname !== e.history.location.pathname) 
        {
            if (navigator.platform.indexOf("Win") > -1) 
            {
                let tables = document.querySelectorAll(".table-responsive");

                for (let i = 0; i < tables.length; i++) 
                {
                    ps = new PerfectScrollbar(tables[i]);
                }
            }

            document.documentElement.scrollTop = 0;
            document.scrollingElement.scrollTop = 0;
            this.refs.mainPanel.scrollTop = 0;
        } */
    }

    showNavbarButton = () => 
    {
        if (
            document.documentElement.scrollTop > 50 ||
            document.scrollingElement.scrollTop > 50 ||
            this.refs.mainPanel.scrollTop > 50
        ) 
        {
            this.setState({ opacity: 1 });
        } 
        else if (
            document.documentElement.scrollTop <= 50 ||
            document.scrollingElement.scrollTop <= 50 ||
            this.refs.mainPanel.scrollTop <= 50
        ) 
        {
            this.setState({ opacity: 0 });
        }
    };

    getFullPageName = routes => 
    {
        let pageName = this.getActiveRoute(routes);
        switch (pageName) 
        {
            case "Login":
                return "login-page";

            case "Register":
                return "register-page";

            case "Lock Screen":
                return "lock-page";

            default:
                return "Default Brand Text";
        }
    };

    getActiveRoute = routes => 
    {
        let activeRoute = "Lucidity Data";
        for (let i = 0; i < routes.length; i++) 
        {
            if (routes[i].collapse) 
            {
                let collapseActiveRoute = this.getActiveRoute(routes[i].views);

                if (collapseActiveRoute !== activeRoute) 
                {
                    return collapseActiveRoute;
                }
            } 
            else 
            {
                if (window.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) 
                {
                    return routes[i].name;
                }
            }
        }

        return activeRoute;
    };

    handleActiveClick = color => 
    {
        this.setState({ activeColor: color });
    };

    handleMiniClick = () => 
    {
        if (document.body.classList.contains("sidebar-mini")) 
        {
            this.setState({ sidebarMini: false });
        } 
        else 
        {
            this.setState({ sidebarMini: true });
        }
        
        document.body.classList.toggle("sidebar-mini");
    };

    toggleSidebar = () => 
    {
        this.setState({
            sidebarOpened: !this.state.sidebarOpened
        });
        document.documentElement.classList.toggle("nav-open");
    };

    closeSidebar = () => 
    {
        this.setState({
            sidebarOpened: false
        });
        document.documentElement.classList.remove("nav-open");
    };

    render()
    {
        if(!Store.isLoggedIn())
        {
            return (
                <div className="wrapper wrapper-full-page" ref="fullPages">
                    <div className={"full-page " + this.getFullPageName(routes)}>
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/Forgot-Password" component={ForgotPassword} />
                            <Redirect from="/" to="/login" />
                        </Switch>
                        <Footer fluid />
                    </div>
                </div>
            );
        }

        return (
            <div className="wrapper">
                <div className="rna-container">
                    <NotificationAlert ref="notificationAlert" />
                </div>
                
                <div className="navbar-minimize-fixed" style={{ opacity: this.state.opacity }}>
                    <button className="minimize-sidebar btn btn-link btn-just-icon" onClick={this.handleMiniClick}>
                        <i className="tim-icons icon-align-center visible-on-sidebar-regular text-muted" />
                        <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini text-muted" />
                    </button>
                </div>
                
                <Sidebar {...this.props} location={window.location} routes={routes} activeColor={this.state.activeColor} closeSidebar={this.closeSidebar} />
                
                <div className="main-panel" ref="mainPanel" data={this.state.activeColor}>
                    <AdminNavbar
                        {...this.props}
                        location={window.location} 
                        handleMiniClick={this.handleMiniClick}
                        brandText={this.getActiveRoute(routes)}
                        sidebarOpened={this.state.sidebarOpened}
                        toggleSidebar={this.toggleSidebar} />

                    <Router />

                    <Footer fluid />

                </div>

                <FixedPlugin
                    activeColor={this.state.activeColor}
                    sidebarMini={this.state.sidebarMini}
                    handleActiveClick={this.handleActiveClick}
                    handleMiniClick={this.handleMiniClick} />
            </div>
        );
    }
}

export default App;
