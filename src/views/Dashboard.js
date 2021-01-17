import React from "react";
import classNames from "classnames";
import { Line, Bar } from "react-chartjs-2";

import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Label,
    FormGroup,
    Input,
    Progress,
    Table,
    Row,
    Col,
    UncontrolledTooltip
} from "reactstrap";

class Dashboard extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {};
    }
    
    render() 
    {
        return (
            <>
                <div className="content">
                    <Row>
                        <Col xs="12">
                            
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default Dashboard;
