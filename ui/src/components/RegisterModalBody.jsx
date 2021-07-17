/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Formik, Field } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';

import FormErrorMessage from './FormErrorMessage';
import withRegister from './withRegister';

const initialValues = {
  name: '',
  username: '',
  email: '',
  password: '',
  passwordRepeat: '',
};

function RegisterModalBody(props) {
  const {
    error: { show, message },
    handleFormSubmit,
  } = props;

  const handleChangePage = (event) => {
    const { changePage } = props;

    event.preventDefault();
    changePage('login');
  };

  return (
    <>
      <Modal.Body className="navbar__modal-body">
        {show && <FormErrorMessage message={message} />}

        <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
          {({ handleSubmit }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
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
                  {({ field }) => <Form.Control {...field} type="email" />}
                </Field>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Field name="password">
                  {({ field }) => <Form.Control {...field} type="password" />}
                </Field>
              </Form.Group>

              <Form.Group controlId="password-repeat">
                <Form.Label>Repeat password</Form.Label>
                <Field name="passwordRepeat">
                  {({ field }) => <Form.Control {...field} type="password" />}
                </Field>
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="navbar__modal-submit"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>

      <Modal.Footer className="navbar__modal-footer">
        <p>
          Already have an account?{' '}
          <a href="#" className="text-primary" onClick={handleChangePage}>
            Login.
          </a>
        </p>
      </Modal.Footer>
    </>
  );
}

export default withRegister(RegisterModalBody);
