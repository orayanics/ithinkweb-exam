import React from "react";
import { Container, Col, Row } from "reactstrap";

function NotFound() {
  return (
    <Container className="mx-auto p-5 col">
      <Row>
        <Col className="text-center">
          <h1 className="mb-0">Oops! That's a 404.</h1>
          <p className="text-secondary">
            Sorry, the page you're looking for doesn't exist.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
