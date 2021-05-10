import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik, Field } from 'formik';

const initialValue = {
  currentPassword: '',
  newPassword: '',
  newPasswordRepeat: '',
};

export default function UserPasswordSetting() {
  const handleFormSubmit = (values) => {
    console.log(
      'UserPasswordSetting values: ',
      JSON.stringify(values, null, 2),
    );
  };

  return (
    <div className="user-account__section user-account__password">
      <header className="section-header">
        <h2 className="user-account__password-title section-title">
          Change Password
        </h2>
      </header>

      <Formik initialValues={initialValue} onSubmit={handleFormSubmit}>
        {({ handleSubmit, handleReset }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className="user-account__password-form"
          >
            <Form.Group className="field" controlId="current-password">
              <Form.Label className="field__label">Current password</Form.Label>
              <Field name="currentPassword">
                {({ field }) => (
                  <Form.Control
                    {...field}
                    type="password"
                    className="field__value  field__input"
                  />
                )}
              </Field>
            </Form.Group>

            <Form.Group className="field" controlId="new-password">
              <Form.Label className="field__label">New password</Form.Label>
              <Field name="newPassword">
                {({ field }) => (
                  <Form.Control
                    {...field}
                    type="password"
                    className="field__value  field__input"
                  />
                )}
              </Field>
            </Form.Group>

            <Form.Group className="field" controlId="new-password-repeat">
              <Form.Label className="field__label">
                Repeat new password
              </Form.Label>
              <Field name="newPasswordRepeat">
                {({ field }) => (
                  <Form.Control
                    {...field}
                    type="password"
                    className="field__value  field__input"
                  />
                )}
              </Field>
            </Form.Group>

            <div className="field">
              <div className="field__label" />

              <div className="field__value user-account__form-control">
                <Button
                  type="submit"
                  variant="primary"
                  className="user-account__form-btn user-account__form-btn--primary user-account__password-form-btn"
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  className="user-account__form-btn user-account__form-btn--light user-account__password-form-btn"
                  onClick={handleReset}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
