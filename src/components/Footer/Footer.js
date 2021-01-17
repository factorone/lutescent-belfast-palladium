import React from "react";
import { Container, Row } from "reactstrap";
import PropTypes from "prop-types";

class Footer extends React.Component 
{
    render() 
    {
        return (
            <footer
                className={"footer" + (this.props.default ? " footer-default" : "")}
            >
                <Container fluid={this.props.fluid ? true : false}>
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.luciditydata.com">
                                Lucidity Data
                            </a>
                        </li>{" "}
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.luciditydata.com/contact/">
                                Contact
                            </a>
                        </li>
                    </ul>
                    <div className="copyright">
                        &copy; {new Date().getFullYear() + " "} 
                        <a href="https://www.luciditydata.com/" target="_blank">
                            Lucidity Data
                        </a>{" "}, All rights reserved.
                    </div>
                </Container>
            </footer>
        );
    }
}

Footer.propTypes = {
    default: PropTypes.bool,
    fluid: PropTypes.bool
};

export default Footer;
