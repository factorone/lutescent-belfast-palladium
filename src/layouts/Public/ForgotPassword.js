import React from "react";
import classnames from "classnames";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Col
} from "reactstrap";

import Store from "../../services/Store";

class ForgotPassword extends React.Component 
{
    constructor(props) 
    {
        super(props);

        this.state = {
            error: false,
            email: '',
            working: false
        };

        this.submit = this.submit.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentDidCatch(error, info) 
    {
        console.error('RESET ERROR: ', info);

        this.setState({
            error: error
        });
    };

    componentDidMount() 
    {
        document.body.classList.toggle("login-page");
    }

    componentWillUnmount() 
    {
        document.body.classList.toggle("login-page");
    }

    handleChangeInput(event)
    {
        this.setState({ 
            [event.target.name + 'Changed']: true,
            [event.target.name]: event.target.value 
        });
    }

    submit(e)
    {
        e.preventDefault();
        const self = this;
        
        const onSuccess = (data) => { 
            
        };

        const onError = (code, message) => { 
            
        };
    }

    onKeyPress(event) 
    {
        if(event.which === 13)
        {
            return this.submit(event);
        }

        return false;
    };

    render() 
    {
        return (
            <>
                <div className="content">
                    <Container>
                        <Col className="ml-auto mr-auto" lg="4" md="6">
                            <Form className="form">
                                <Card className="card-login card-white">
                                    <CardHeader>
                                        <img
                                            alt="..."
                                            src={require("../../assets/img/card-primary.png")}
                                        />
                                        <CardTitle tag="h1">Log in</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <p>Resetting your password is simple. Enter your email associated with your user login, and we'll send you a message with instructions for resetting your password.</p>
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
                                    </CardBody>
                                    <CardFooter>
                                        <Button block className="mb-3" color="primary" onClick={e => this.submit(e)} size="lg">
                                            Submit
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Form>
                        </Col>
                    </Container>
                </div>
            </>
        );
    }
}

export default ForgotPassword;
