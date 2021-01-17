import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import PerfectScrollbar from "perfect-scrollbar";

import { Nav, Collapse } from "reactstrap";

let ps;

class Sidebar extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.state = this.getCollapseStates(props.routes);
    }
    
    getCollapseStates = routes => 
    {
        let initialState = {};
        routes.map((prop, key) => 
        {
            if (prop.collapse) 
            {
                initialState = {
                    [prop.state]: this.getCollapseInitialState(prop.views),
                    ...this.getCollapseStates(prop.views),
                    ...initialState
                };
            }

            return null;
        });

        return initialState;
    };

    getCollapseInitialState(routes) 
    {
        for (let i = 0; i < routes.length; i++) 
        {
            if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) 
            {
                return true;
            } 
            else if (window.location.href.indexOf(routes[i].path) !== -1) 
            {
                return true;
            }
        }
        return false;
    }

    createLinks = routes => 
    {
        const { rtlActive } = this.props;

        return routes.map((prop, key) => 
        {
            if (prop.redirect) 
            {
                return null;
            }

            if (prop.collapse) 
            {
                let st = {};
                st[prop["state"]] = !this.state[prop.state];

                return (
                    <li
                        className={this.getCollapseInitialState(prop.views) ? "active" : ""}
                        key={key}
                    >
                        <a
                            href="#pablo"
                            data-toggle="collapse"
                            aria-expanded={this.state[prop.state]}
                            onClick={e => {
                                e.preventDefault();
                                this.setState(st);
                            }}
                        >
                            {prop.icon !== undefined ? (
                                <>
                                    <i className={prop.icon} />
                                    <p>
                                        {rtlActive ? prop.rtlName : prop.name}
                                        <b className="caret" />
                                    </p>
                                </>
                            ) : (
                                <>
                                    <span className="sidebar-mini-icon">
                                        {rtlActive ? prop.rtlMini : prop.mini}
                                    </span>
                                    <span className="sidebar-normal">
                                        {rtlActive ? prop.rtlName : prop.name}
                                        <b className="caret" />
                                    </span>
                                </>
                            )}
                        </a>
                        <Collapse isOpen={this.state[prop.state]}>
                            <ul className="nav">{this.createLinks(prop.views)}</ul>
                        </Collapse>
                    </li>
                );
            }

            return (
                <li className={this.activeRoute(prop.layout + prop.path)} key={key}>
                    <NavLink
                        to={prop.layout + prop.path}
                        activeClassName=""
                        onClick={this.props.closeSidebar}
                    >
                        {prop.icon !== undefined ? (
                            <>
                                <i className={prop.icon} />
                                <p>{rtlActive ? prop.rtlName : prop.name}</p>
                            </>
                        ) : (
                            <>
                                <span className="sidebar-mini-icon">
                                    {rtlActive ? prop.rtlMini : prop.mini}
                                </span>
                                <span className="sidebar-normal">
                                    {rtlActive ? prop.rtlName : prop.name}
                                </span>
                            </>
                        )}
                    </NavLink>
                </li>
            );
        });
    };
    
    activeRoute = routeName => 
    {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };

    componentDidMount() 
    {
        if (navigator.platform.indexOf("Win") > -1) 
        {
            ps = new PerfectScrollbar(this.refs.sidebar, {
                suppressScrollX: true,
                suppressScrollY: false
            });
        }
    }

    componentWillUnmount() 
    {
        if (navigator.platform.indexOf("Win") > -1) 
        {
            ps.destroy();
        }
    }

    render() 
    {
        const { activeColor, logo } = this.props;
        let logoImg = null;
        let logoText = null;

        if (logo !== undefined) 
        {
            if (logo.outterLink !== undefined) 
            {
                logoImg = (
                    <a
                        href={logo.outterLink}
                        className="simple-text logo-mini"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={this.props.closeSidebar}
                    >
                        <div className="logo-img">
                            <img src={logo.imgSrc} alt="react-logo" />
                        </div>
                    </a>
                );

                logoText = (
                    <a
                        href={logo.outterLink}
                        className="simple-text logo-normal"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={this.props.closeSidebar}
                    >
                        {logo.text}
                    </a>
                );
            } 
            else 
            {
                logoImg = (
                    <NavLink
                        to={logo.innerLink}
                        className="simple-text logo-mini"
                        onClick={this.props.closeSidebar}
                    >
                        <div className="logo-img">
                            <img src={logo.imgSrc} alt="react-logo" />
                        </div>
                    </NavLink>
                );

                logoText = (
                    <NavLink
                        to={logo.innerLink}
                        className="simple-text logo-normal"
                        onClick={this.props.closeSidebar}
                    >
                        {logo.text}
                    </NavLink>
                );
            }
        }

        return (
            <div className="sidebar" data={activeColor}>
                <div className="sidebar-wrapper" ref="sidebar">
                    {logoImg !== null || logoText !== null ? (
                        <div className="logo">
                            {logoImg}
                            {logoText}
                        </div>
                    ) : null}
                    <Nav>{this.createLinks(this.props.routes)}</Nav>
                </div>
            </div>
        );
    }
}

Sidebar.propTypes = {
    activeColor: PropTypes.oneOf(["primary", "blue", "green", "orange", "red"]),
    rtlActive: PropTypes.bool,
    routes: PropTypes.array.isRequired,
    logo: PropTypes.oneOfType([
        PropTypes.shape({
            innerLink: PropTypes.string.isRequired,
            imgSrc: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        }),
        PropTypes.shape({
            outterLink: PropTypes.string.isRequired,
            imgSrc: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        })
    ]),
    // this is used on responsive to close the sidebar on route navigation
    closeSidebar: PropTypes.func
};

export default Sidebar;
