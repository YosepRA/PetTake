import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FormErrorMessage from './FormErrorMessage';
import withRegister from './withRegister';

const initialValues = {
  name: '',
  username: '',
  email: '',
  password: '',
  passwordRepeat: '',
};

class Register extends Component {
  componentDidMount() {
    document.body.classList.add('page-register');
  }

  componentWillUnmount() {
    document.body.classList.remove('page-register');
  }

  render() {
    const {
      error: { show, message },
      handleFormSubmit,
    } = this.props;

    return (
      <main className="main-container">
        <Container>
          <Row>
            <Col>
              <div className="panel">
                <h1 className="panel__title">Create a new account</h1>

                {show && <FormErrorMessage message={message} />}

                <Formik
                  initialValues={initialValues}
                  onSubmit={handleFormSubmit}
                >
                  {({ handleSubmit }) => (
                    <Form
                      noValidate
                      onSubmit={handleSubmit}
                      className="panel__form"
                    >
                      <Form.Group controlId="name">
                        <Form.Label>Full Name</Form.Label>
                        <Field name="name">
                          {({ field }) => <Form.Control {...field} />}
                        </Field>
                      </Form.Group>

                      <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Field name="username">
                          {({ field }) => <Form.Control {...field} />}
                        </Field>
                      </Form.Group>

                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Field name="email">
                          {({ field }) => (
                            <Form.Control {...field} type="email" />
                          )}
                        </Field>
                      </Form.Group>

                      <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Field name="password">
                          {({ field }) => (
                            <Form.Control {...field} type="password" />
                          )}
                        </Field>
                      </Form.Group>

                      <Form.Group controlId="password-repeat">
                        <Form.Label>Repeat password</Form.Label>
                        <Field name="passwordRepeat">
                          {({ field }) => (
                            <Form.Control {...field} type="password" />
                          )}
                        </Field>
                      </Form.Group>

                      <Button
                        type="submit"
                        variant="primary"
                        className="panel__form-submit"
                      >
                        Register
                      </Button>
                    </Form>
                  )}
                </Formik>

                <div className="panel__footer">
                  <p>
                    Already have an account? <Link to="/login">Login.</Link>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}

export default withRegister(Register);
