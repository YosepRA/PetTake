/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Formik } from 'formik';
import { Modal } from 'react-bootstrap';

import LoginForm from './LoginForm';
import FormErrorMessage from './FormErrorMessage';
import withLogin from './withLogin';
import LoginSchema from './helpers/yup/LoginSchema';

const { REACT_APP_IS_DEMO } = process.env;
const isDemo = REACT_APP_IS_DEMO === 'true';

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
              className="navbar__modal-form"
            />
          )}
        </Formik>
      </Modal.Body>

      {/* Disabled register for demo build. */}
      {!isDemo && (
        <Modal.Footer className="navbar__modal-footer">
          <p>
            Don&apos;t have an account?{' '}
            <a href="#" className="text-primary" onClick={handleChangePage}>
              Register.
            </a>
          </p>
        </Modal.Footer>
      )}
    </>
  );
}

export default withLogin(LoginModalBody);
