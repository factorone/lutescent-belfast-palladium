import React from "react";
import classnames from "classnames";
import ReactWizard from "react-bootstrap-wizard";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardImg,
    CardTitle,
    Label,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
} from "reactstrap";

import Step1 from "../../views/forms/WizardSteps/Step1.js";
import Step2 from "../../views/forms/WizardSteps/Step2.js";
import Step3 from "../../views/forms/WizardSteps/Step3.js";

var steps = [
    {
        stepName: "About",
        stepIcon: "tim-icons icon-single-02",
        component: Step1
    },
    {
        stepName: "Account",
        stepIcon: "tim-icons icon-settings-gear-63",
        component: Step2
    },
    {
        stepName: "Address",
        stepIcon: "tim-icons icon-delivery-fast",
        component: Step3
    }
];

class Register extends React.Component 
{
    state = {};
    componentDidMount() 
    {
        document.body.classList.toggle("register-page");
    }

    componentWillUnmount() 
    {
        document.body.classList.toggle("register-page");
    }
    
    render() 
    {
        return (
            <>
                <div className="content">
                    <Container>
                        <Row>
                            <Col className="mr-auto" md="7">
                                <Card className="card-register card-white">
                                    <CardHeader>
                                        <CardImg
                                            alt="..."
                                            src={require("assets/img/card-primary.png")}
                                        />
                                        <CardTitle tag="h4">Register</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Form className="form">
                                            <InputGroup
                                                className={classnames({
                                                    "input-group-focus": this.state.nameFocus
                                                })}
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="tim-icons icon-single-02" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Full Name"
                                                    type="text"
                                                    onFocus={e => this.setState({ nameFocus: true })}
                                                    onBlur={e => this.setState({ nameFocus: false })}
                                                />
                                            </InputGroup>
                                            <InputGroup
                                                className={classnames({
                                                    "input-group-focus": this.state.emailFocus
                                                })}
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="tim-icons icon-email-85" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Email"
                                                    type="text"
                                                    onFocus={e => this.setState({ emailFocus: true })}
                                                    onBlur={e => this.setState({ emailFocus: false })}
                                                />
                                            </InputGroup>
                                            <InputGroup
                                                className={classnames({
                                                    "input-group-focus": this.state.passFocus
                                                })}
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="tim-icons icon-lock-circle" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Password"
                                                    type="text"
                                                    onFocus={e => this.setState({ passFocus: true })}
                                                    onBlur={e => this.setState({ passFocus: false })}
                                                />
                                            </InputGroup>
                                            <FormGroup check className="text-left">
                                                <Label check>
                                                    <Input type="checkbox" />
                                                    <span className="form-check-sign" />I agree to the{" "}
                                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                                        terms and conditions
                                                    </a>
                                                    .
                                                </Label>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                    <CardFooter>
                                        <Button
                                            className="btn-round"
                                            color="primary"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            size="lg"
                                        >
                                            Get Started
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

export default Register;
