import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faSignOutAlt, faUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Logo from './assets/images/logo.png';

import AuthService from "./services/auth.service";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/pages/Home";
import Profile from "./components/modules/Profile";
import AdminBoard from "./components/boards/AdminBoard";
import ModeratorBoard from "./components/boards/ModeratorBoard";
import UserBoard from "./components/boards/UserBoard";
import {Container, Row, Col, Nav} from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router>
        <Container className="main">
          <Row>
            <Col md={2}>
              <div className="navigation">
                <Nav defaultActiveKey="/" className="flex-column">
                    <img src={Logo} alt="application logo" className="logo" />
                  <Nav.Link href="/">
                    <FontAwesomeIcon icon={faHome} /> Home
                  </Nav.Link>

                  {showModeratorBoard && (
                    <Nav.Link href="/mod">
                      Moderator Board
                    </Nav.Link>
                  )}

                  {showAdminBoard && (
                    <Nav.Link href="/admin">
                      Admin Board
                    </Nav.Link>
                  )}

                  {currentUser && (
                    <Nav.Link href="/user">
                      User
                    </Nav.Link>
                  )}

                  {currentUser ? (
                    <div>
                      <Nav.Link href="/profile">
                        <FontAwesomeIcon icon={faUser} /> {currentUser.username}
                      </Nav.Link>
                      <Nav.Link href="/login" onClick={this.logOut}>
                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                      </Nav.Link>
                    </div>
                  ) : (
                    <div>
                      <Nav.Link href="/login">
                        <FontAwesomeIcon icon={faUser} /> Login
                      </Nav.Link>

                      <Nav.Link href="/register">
                        <FontAwesomeIcon icon={faUserPlus} /> Register
                      </Nav.Link>
                    </div>
                  )}
                </Nav>
              </div>
            </Col>

            <Col sm={10}>
              <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/user" component={UserBoard} />
                <Route path="/mod" component={ModeratorBoard} />
                <Route path="/admin" component={AdminBoard} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}

export default App;
