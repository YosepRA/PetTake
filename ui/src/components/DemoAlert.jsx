import React from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';

function DemoAlert() {
  return (
    <Alert variant="info" className="demo-alert">
      <Container>
        <Row>
          <Col>
            Currently running <b>demo</b> build. Some features will be hidden or
            disabled.
          </Col>
        </Row>
      </Container>
    </Alert>
  );
}

export default DemoAlert;
