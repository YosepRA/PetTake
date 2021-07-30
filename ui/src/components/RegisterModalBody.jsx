/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Formik } from 'formik';
import { Modal } from 'react-bootstrap';

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

        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit, errors, touched }) => (
            <RegisterForm
              handleSubmit={handleSubmit}
              errors={errors}
              touched={touched}
              className="navbar__modal-form"
            />
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
