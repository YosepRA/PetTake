/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import actionCreator from './store/actionCreator';
import DataSource from './store/DataSource';
import FormErrorMessage from './FormErrorMessage';

const dataSource = new DataSource();

const initialValues = {
  username: '',
  password: '',
};

const mapDispatchToProps = {
  setAuthenticate: actionCreator.setAuthenticate,
};

class LoginModalBody extends Component {
  constructor() {
    super();
    this.state = {
      error: {
        show: false,
        message: '',
      },
    };
  }

  handleChangePage = (event) => {
    const { changePage } = this.props;

    event.preventDefault();
    changePage('register');
  };

  handleFormSubmit = (values) => {
    const { setAuthenticate, handleClose, history } = this.props;

    this.toggleError(false, '', async () => {
      const result = await dataSource.postData('/user/login', values);
      // If it's failed (incorrect username or password).
      if (!result.success) {
        this.toggleError(true, result.message);
        return undefined;
      }
      // If it succeeds, set Redux authenticaton state.
      setAuthenticate(true, result.user);
      // Close modal.
      handleClose();
      // Redirect to user dashboard.
      history.push('/user');

      return undefined;
    });
  };

  toggleError = (show, message = '', done) => {
    this.setState(
      {
        error: {
          show,
          message,
        },
      },
      done,
    );
  };

  render() {
    const {
      error: { show, message },
    } = this.state;

    return (
      <>
        {show && <FormErrorMessage message={message} />}

        <Modal.Body className="navbar__modal-body">
          <Formik
            initialValues={initialValues}
            onSubmit={this.handleFormSubmit}
          >
            {({ handleSubmit }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Field name="username">
                    {({ field }) => <Form.Control {...field} />}
                  </Field>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Field name="password">
                    {({ field }) => <Form.Control {...field} type="password" />}
                  </Field>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="navbar__modal-submit"
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>

        <Modal.Footer className="navbar__modal-footer">
          <p>
            Don&apos;t have an account?{' '}
            <a
              href="#"
              className="text-primary"
              onClick={this.handleChangePage}
            >
              Register.
            </a>
          </p>
        </Modal.Footer>
      </>
    );
  }
}

export default connect(null, mapDispatchToProps)(withRouter(LoginModalBody));
