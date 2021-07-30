import React, { Component } from 'react';
import { Formik } from 'formik';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../css/register.min.css';

import RegisterForm from './RegisterForm';
import FormErrorMessage from './FormErrorMessage';
import withRegister from './withRegister';
import RegisterSchema from './helpers/yup/RegisterSchema';

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
                  validationSchema={RegisterSchema}
                >
                  {({ handleSubmit, touched, errors }) => (
                    <RegisterForm
                      handleSubmit={handleSubmit}
                      touched={touched}
                      errors={errors}
                      className="panel__form"
                    />
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
