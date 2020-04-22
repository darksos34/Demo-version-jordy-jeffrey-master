import React from "react";
import { Card, Button, Form, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faEdit, faPlusSquare, faUndo, faList } from '@fortawesome/free-solid-svg-icons';
import UserToast from './UserToast';
import axios from 'axios';
import authHeader from "../../services/auth-header";

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.userChange = this.userChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    initialState = {
        id:'',
        username:'',
        email:'',
        password:''
    }

    componentDidMount() {
        const userId = +this.props.match.params.id;
        if(userId) {
            this.findUserById(userId);
        }
    }

    findUserById = (userId) => {
        axios.get("/api/users/"+userId, { headers: authHeader() })
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        id: response.data.id,
                        username: response.data.username,
                        email: response.data.email,
                        password: response.data.password
                    });
                }
            }).catch((error) => {
            console.error("Error - "+error)
        })
    }

    resetUser = () => {
        this.setState(() => this.initialState);
    }

    submitUser = event => {
        event.preventDefault();

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        axios.post("/api/users", user, { headers: authHeader() })
            .then(response => {
                if(response.data != null) {
                    this.setState({ "show":true, "method":"post" });
                    setTimeout(() => this.setState({ "show":false }), 3000);
                    setTimeout(() => this.userList(), 3000);
                } else {
                    this.setState({ "show":false });
                }
            });
        this.setState(this.initialState);
    }

    updateUser = event => {
        event.preventDefault();

        const user = {
            id: this.state.id,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        axios.put("/api/users", user, { headers: authHeader() })
            .then(response => {
                if(response.data != null) {
                    this.setState({ "show":true, "method":"put" });
                    setTimeout(() => this.setState({ "show":false }), 3000);
                    setTimeout(() => this.userList(), 3000);
                } else {
                    this.setState({ "show":false });
                }
            });
        this.setState(this.initialState);
    }

    userChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    userList = () => {
        return this.props.history.push("/userlist");
    }

    render() {
        const {username, email, password} = this.state;

        return (
            <div>
                <div style={{"display": this.state.show ? "inline" : "none"}}>
                    <UserToast show = {this.state.show} message = {this.state.method === "put" ? "User Updated Successfully." : "User Saved Successfully."} type = {"success"} />
                </div>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update User Details" : "Add New User"} </Card.Header>
                    <Form onReset={this.resetUser} onSubmit={this.state.id ? this.updateUser : this.submitUser} id="userFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control required
                                                  autoComplete = "off"
                                                  type="text"
                                                  value={username}
                                                  onChange={this.userChange}
                                                  name="username"
                                                  placeholder="Enter username" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridStreet">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control required
                                                  autoComplete = "off"
                                                  type="text"
                                                  value={email}
                                                  onChange={this.userChange}
                                                  name="email"
                                                  placeholder="Enter email address" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridStreet">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required
                                                  autoComplete = "off"
                                                  type="password"
                                                  value={password}
                                                  onChange={this.userChange}
                                                  name="password"
                                                  placeholder="Enter password" />
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            <Button variant="info" type="button" onClick={this.userList.bind()}>
                                <FontAwesomeIcon icon={faList} /> User List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default User;
