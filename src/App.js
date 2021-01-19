import React, { Component } from 'react';
import Store from "services/Store";
import Router from "Router";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import PerfectScrollbar from "perfect-scrollbar";
import NotificationAlert from "react-notification-alert";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

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
        if (navigator.platform.indexOf("Win") > -1) 
        {
            document.documentElement.classList.add("perfect-scrollbar-on");
            document.documentElement.classList.remove("perfect-scrollbar-off");
            ps = new PerfectScrollbar(this.refs.mainPanel);
            this.refs.mainPanel.addEventListener(
                "ps-scroll-y",
                this.showNavbarButton
            );

            let tables = document.querySelectorAll(".table-responsive");
            for (let i = 0; i < tables.length; i++) 
            {
                ps = new PerfectScrollbar(tables[i]);
            }
        }

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
