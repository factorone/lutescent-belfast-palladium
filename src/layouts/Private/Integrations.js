import React from "react";
import classNames from "classnames";
import { Row, Col } from "reactstrap";

class Integrations extends React.Component 
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
                            <h1>Integrations View</h1>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default Integrations;
