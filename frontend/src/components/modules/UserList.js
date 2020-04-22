import React from "react";
import { Card, ButtonGroup, Button, Table } from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faUser} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import UserToast from './UserToast';
import axios from 'axios';
import authHeader from "../../services/auth-header";
import './UserList.css';

const API_URL = "http://localhost:8080/api/";

class UserList extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers() {
    axios.get(API_URL + "users", { headers: authHeader() })
    .then(response => response.data)
    .then((data) => {
      this.setState({users: data})
    });
  }

  deleteUser = (userId) => {
    axios.delete(API_URL + "users/"+userId, { headers: authHeader() })
    .then(response => {
      if(response.data != null) {
        this.setState({ "show":true });
        setTimeout(() => this.setState({ "show":false }), 3000);
        this.setState({
          users: this.state.users.filter(user => user.id !== userId)
        })
      } else {
        this.setState({ "show":false });
      }
    });
  }

  render() {
    return (
      <div>
        <div style={{"display": this.state.show ? "inline" : "none"}}>
          <UserToast show = {this.state.show} message = {"User Deleted Successfully."} type = {"danger"} />
        </div>
        <Card className="">
          <Card.Header><FontAwesomeIcon icon={faList} /> User List</Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="light">
              <thead>
                <tr>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.users.length === 0 ?
                  <tr align="center">
                    <td colSpan="5">No Users Available.</td>
                  </tr> :
                  this.state.users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.createdAt}</td>
                      <td>{user.updatedAt}</td>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td align="center">
                        <ButtonGroup>
                          <Button size="sm" variant="outline-success mr-1"><FontAwesomeIcon icon={faUser} /></Button>
                          <Link to={"edituser/"+user.id} className="btn btn-sm btn-outline-primary mr-1"><FontAwesomeIcon icon={faEdit} /></Link>
                          <Button size="sm" variant="outline-danger" onClick={this.deleteUser.bind(this, user.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default UserList;
