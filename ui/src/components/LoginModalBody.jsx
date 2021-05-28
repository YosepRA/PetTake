/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Formik, Field } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import actionCreator from './store/actionCreator';

const initialValues = {
  username: '',
  password: '',
};
// const mapStateToProps = ({ authenticated }) => ({
//   authenticated,
// });
// const mapDispatchToProps = {
//   authenticate: actionCreator.authenticate,
// };

export default function LoginModalBody({ changePage }) {
  const handleChangePage = (event) => {
    event.preventDefault();
    changePage('register');
  };

  const handleFormSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
  };

  return (
    <>
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

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(({ authenticate, changePage }) => {

// });
