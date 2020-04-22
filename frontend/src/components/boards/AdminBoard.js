import React, { Component } from 'react';
import { Container, Row, Col, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import UserService from '../../services/user.service';
import User from '../modules/User';
import UserList from '../modules/UserList';

export default class BoardAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getAdminBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div>
                <Router>
                    <Container>
                        <Row>
                            <Col>
                                <Navbar bg="secondary" variant="dark">
                                    <Link to={""} className="navbar-brand">
                                        <Navbar.Brand>Admin Board</Navbar.Brand>
                                    </Link>
                                    <Nav className="mr-auto">
                                        <Link to={"userlist"} className="nav-link">User List</Link>
                                    </Nav>
                                    <Form inline>
                                        <FormControl
                                            type="text"
                                            placeholder="Search"
                                            className="mr-sm-2"
                                        />
                                        <Button variant="outline-light">Search</Button>
                                    </Form>
                                </Navbar>
                                <Switch>
                                    <Route path="/edituser/:id" exact component={User} />
                                    <Route path="/userlist" exact component={UserList} />
                                </Switch>
                            </Col>
                        </Row>
                    </Container>
                </Router>
            </div>
        );
    }
}