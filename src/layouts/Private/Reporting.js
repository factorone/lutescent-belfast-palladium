import React from "react";
import classNames from "classnames";
import { Line, Bar } from "react-chartjs-2";
import { VectorMap } from "react-jvectormap";
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

import {
    chartExample1,
    chartExample2,
    chartExample3,
    chartExample4
} from "variables/charts.js";

class Reporting extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {};
    }
    
    render() 
    {
        const { classes } = this.props;

        return (
            <>
                <div className={classNames("content", classes)}>
                    <Row>
                        <Col xs="12">
                            <h1>Reporting View</h1>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default Reporting;
