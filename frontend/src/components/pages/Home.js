import React, { Component } from "react";
import {Container, Row, Col} from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
    render() {
        return (
            <Container className="container mt-3">
                <Row>
                    <Col>1 of 3</Col>
                    <Col xs={6}>2 of 3 (wider)</Col>
                    <Col>3 of 3</Col>
                </Row>
            </Container>
        );
    }
}