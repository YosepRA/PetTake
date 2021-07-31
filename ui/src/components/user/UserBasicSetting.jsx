import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Button } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';

import actionCreator from '../store/actionCreator';

const mapStateToProps = ({ user: { username, ...userData } }) => ({
  userData,
});
const mapDispatchToProps = {
  userInfoUpdate: actionCreator.userInfoUpdate,
};

class UserBasicSetting extends Component {
  constructor() {
    super();
    this.state = {
      basicInfoMode: 'view',
    };
  }

  handleBasicInfoToggle = (state) => {
    this.setState({ basicInfoMode: state });
  };

  handleSubmit = (values) => {
    const { userInfoUpdate } = this.props;

    userInfoUpdate({ changes: values });

    this.setState({ basicInfoMode: 'view' });
  };

  render() {
    const { userData } = this.props;
    const { basicInfoMode } = this.state;
    const { email, name, phone, address } = userData;

    return (
      <div className="user-account__section user-account__basic">
        <header className="user-account__basic-header section-header">
          <h2 className="user-account__basic-title section-title">
            Basic Information
          </h2>
          <button
            type="button"
            className="user-account__basic-mode-toggle"
            onClick={() => this.handleBasicInfoToggle('edit')}
          >
            <FontAwesomeIcon icon="cog" /> Change basic information
          </button>
        </header>

        {basicInfoMode === 'view' ? (
          <div className="user-account__basic-view">
            <div className="field">
              <div className="field__label">Email:</div>
              <div className="field__value">{email}</div>
            </div>

            <div className="field">
              <div className="field__label">Name:</div>
              <div className="field__value">{name}</div>
            </div>

            <div className="field">
              <div className="field__label">Phone:</div>
              <div className="field__value">{phone}</div>
            </div>

            <div className="field">
              <div className="field__label">Address:</div>
              <div className="field__value">{address}</div>
            </div>
          </div>
        ) : (
          <div className="user-account__basic-edit">
            <Formik initialValues={userData} onSubmit={this.handleSubmit}>
              {({ handleSubmit }) => (
                <Form
                  noValidate
                  onSubmit={handleSubmit}
                  className="user-account__basic-form"
                >
                  <Form.Group className="field field--email" controlId="email">
                    <Form.Label className="field__label">Email</Form.Label>
                    <Field name="email">
                      {({ field }) => (
                        <Form.Control
                          {...field}
                          type="text"
                          className="field__value field__input"
                        />
                      )}
                    </Field>
                  </Form.Group>

                  <Form.Group className="field field--name" controlId="name">
                    <Form.Label className="field__label">Name</Form.Label>
                    <Field name="name">
                      {({ field }) => (
                        <Form.Control
                          {...field}
                          type="text"
                          className="field__value field__input"
                        />
                      )}
                    </Field>
                  </Form.Group>

                  <Form.Group className="field field--phone" controlId="phone">
                    <Form.Label className="field__label">Phone</Form.Label>
                    <Field name="phone">
                      {({ field }) => (
                        <Form.Control
                          {...field}
                          type="text"
                          className="field__value field__input"
                        />
                      )}
                    </Field>
                  </Form.Group>

                  <Form.Group
                    className="field field--address"
                    controlId="address"
                  >
                    <Form.Label className="field__label">Address</Form.Label>
                    <Field name="address">
                      {({ field }) => (
                        <Form.Control
                          {...field}
                          as="textarea"
                          className="field__value field__input field__input--textarea"
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
                        className="user-account__form-btn user-account__form-btn--primary user-account__basic-form-btn"
                      >
                        Submit
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        className="user-account__form-btn user-account__form-btn--light user-account__basic-form-btn"
                        onClick={() => this.handleBasicInfoToggle('view')}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBasicSetting);
