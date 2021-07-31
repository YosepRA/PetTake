import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik, Field } from 'formik';

import DataSource from '../store/DataSource';
import actionTypes from '../store/actionTypes';
import mutations from '../store/graphQLMutations';
import ChangePasswordSchema from '../helpers/yup/ChangePasswordSchema';
import FormErrorMessage from '../FormErrorMessage';

const dataSource = new DataSource();

const initialValue = {
  oldPassword: '',
  newPassword: '',
  newPasswordRepeat: '',
};

class UserPasswordSetting extends Component {
  constructor() {
    super();
    this.state = {
      error: {
        show: false,
        message: '',
      },
    };
  }

  handleFormSubmit = async (
    { oldPasswordRepeat, ...variables },
    { resetForm },
  ) => {
    try {
      const result = await dataSource.graphQLFetch(
        mutations[actionTypes.USER_CHANGE_PASSWORD],
        variables,
      );

      if (result) {
        resetForm();
        this.setState({ error: { show: false } });
        alert('Successfully change password.');
      }
    } catch (error) {
      this.setState({ error: { show: true, message: error.message } });
    }
  };

  render() {
    const {
      error: { show, message },
    } = this.state;

    return (
      <div className="user-account__section user-account__password">
        <header className="section-header">
          <h2 className="user-account__password-title section-title">
            Change Password
          </h2>
        </header>

        {show && <FormErrorMessage message={message} />}

        <Formik
          initialValues={initialValue}
          onSubmit={this.handleFormSubmit}
          validationSchema={ChangePasswordSchema}
        >
          {({ handleSubmit, handleReset, touched, errors }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="user-account__password-form"
            >
              <Form.Group className="field" controlId="old-password">
                <Form.Label className="field__label">Old password</Form.Label>
                <Field name="oldPassword">
                  {({ field }) => (
                    <Form.Control
                      {...field}
                      type="password"
                      className="field__value  field__input"
                      isInvalid={touched.oldPassword && errors.oldPassword}
                    />
                  )}
                </Field>

                <Form.Control.Feedback
                  className="field__feedback"
                  type="invalid"
                >
                  {errors.oldPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="field" controlId="new-password">
                <Form.Label className="field__label">New password</Form.Label>
                <Field name="newPassword">
                  {({ field }) => (
                    <Form.Control
                      {...field}
                      type="password"
                      className="field__value  field__input"
                      isInvalid={touched.newPassword && errors.newPassword}
                    />
                  )}
                </Field>

                <Form.Control.Feedback
                  className="field__feedback"
                  type="invalid"
                >
                  {errors.newPassword}
                </Form.Control.Feedback>
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
                      isInvalid={
                        touched.newPasswordRepeat && errors.newPasswordRepeat
                      }
                    />
                  )}
                </Field>

                <Form.Control.Feedback
                  className="field__feedback"
                  type="invalid"
                >
                  {errors.newPasswordRepeat}
                </Form.Control.Feedback>
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
}

export default UserPasswordSetting;
