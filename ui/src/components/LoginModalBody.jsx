/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Formik, Field } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';

import FormErrorMessage from './FormErrorMessage';
import withLogin from './withLogin';

const initialValues = {
  username: '',
  password: '',
};

function LoginModalBody(props) {
  const {
    error: { show, message },
    handleFormSubmit,
  } = props;

  const handleChangePage = (event) => {
    const { changePage } = props;

    event.preventDefault();
    changePage('register');
  };

  return (
    <>
      {show && <FormErrorMessage message={message} />}

      <Modal.Body className="navbar__modal-body">
        <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
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
          <a href="#" className="text-primary" onClick={handleChangePage}>
            Register.
          </a>
        </p>
      </Modal.Footer>
    </>
  );
}

export default withLogin(LoginModalBody);
