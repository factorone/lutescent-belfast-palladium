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

class Login extends React.Component 
{
    constructor(props) 
    {
        super(props);

        this.state = {
            error: false,
            email: '',
            password: '',
            showPassword: false,
            working: false
        };

        this.login = this.login.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentDidCatch(error, info) 
    {
        console.error('LOGIN ERROR: ', info);

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

    handleClickShowPassword = () => 
    {
        this.setState({ showPassword: !this.state.showPassword });
    };

    login(e)
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
            return this.login(event);
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
                                    </CardBody>
                                    <CardFooter>
                                        <Button block className="mb-3" color="primary" onClick={e => this.login(e)} size="lg">
                                            Login
                                        </Button>
                                        <div className="pull-left">
                                            <h4>
                                                <a className="link footer-link" href="/register">
                                                    Register
                                                </a>
                                            </h4>
                                        </div>
                                        <div className="pull-right">
                                            <h4>
                                                <a className="link footer-link" href="/support">
                                                    Need Help?
                                                </a>
                                            </h4>
                                        </div>
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

export default Login;
