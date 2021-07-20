import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FormErrorMessage from './FormErrorMessage';
import withLogin from './withLogin';

const initialValues = {
  username: '',
  password: '',
};

class Login extends Component {
  componentDidMount() {
    document.body.classList.add('page-login');
  }

  componentWillUnmount() {
    document.body.classList.remove('page-login');
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
                <h1 className="panel__title">Login to your account</h1>

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
                      <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Field name="username">
                          {({ field }) => <Form.Control {...field} />}
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

                      <Button
                        type="submit"
                        variant="primary"
                        className="panel__form-submit"
                      >
                        Login
                      </Button>
                    </Form>
                  )}
                </Formik>

                <div className="panel__footer">
                  <p>
                    Don&apos;t have an account?{' '}
                    <Link to="/register">Register.</Link>
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

export default withLogin(Login);
