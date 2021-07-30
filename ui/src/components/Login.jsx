import React, { Component } from 'react';
import { Formik } from 'formik';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../css/login.min.css';

import LoginForm from './LoginForm';
import FormErrorMessage from './FormErrorMessage';
import withLogin from './withLogin';
import LoginSchema from './helpers/yup/LoginSchema';

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
                  validationSchema={LoginSchema}
                >
                  {({ handleSubmit, touched, errors }) => (
                    <LoginForm
                      handleSubmit={handleSubmit}
                      touched={touched}
                      errors={errors}
                      className="panel__form"
                    />
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
