/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/contact.min.css';

const initialValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const formModel = [
  { name: 'name', controlId: 'name', label: 'Name', type: 'text', as: 'input' },
  {
    name: 'email',
    controlId: 'email',
    label: 'Email',
    type: 'email',
    as: 'input',
  },
  {
    name: 'subject',
    controlId: 'subject',
    label: 'Subject',
    type: 'text',
    as: 'input',
  },
  { name: 'message', controlId: 'message', label: 'Message', as: 'textarea' },
];

function createFormFields(data) {
  return data.map(({ name, controlId, label, type, as }) => (
    <Form.Group key={name} controlId={controlId} className="form__group">
      <Form.Label className="form__label">{label}</Form.Label>
      <Field name={name}>
        {({ field }) => (
          <Form.Control
            type={type || 'text'}
            as={as}
            className={`form__field form__field--${name}`}
            {...field}
          />
        )}
      </Field>
    </Form.Group>
  ));
}

export default class Contact extends Component {
  componentDidMount() {
    document.body.classList.add('page-contact');
  }

  componentWillUnmount() {
    document.body.classList.remove('page-contact');
  }

  handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
  };

  render() {
    const formFields = createFormFields(formModel);

    return (
      <main className="main-container">
        <Container>
          <Row>
            <Col xs="12" md="4" lg="3">
              <section className="information">
                <h2 className="section-header information__header">
                  Contact Information
                </h2>
                <p className="information__intro">
                  We will be happy to answer your questions. You may use our
                  contacts below or the form right next up.
                </p>
                <ul className="information__contact-list">
                  <li className="information__contact-item">
                    <span className="information__contact-icon">
                      <FontAwesomeIcon icon={['far', 'envelope']} />
                    </span>
                    <span className="information__contact-text">
                      customer@pettake.com
                    </span>
                  </li>

                  <li className="information__contact-item">
                    <span className="information__contact-icon">
                      <FontAwesomeIcon icon="phone" />
                    </span>
                    <span className="information__contact-text">
                      +1 2233 44231
                    </span>
                  </li>
                </ul>
              </section>
            </Col>

            <Col xs="12" md="8" lg="7">
              <section className="form">
                <h2 className="section-header form__header">Contact Form</h2>

                <Formik
                  initialValues={initialValues}
                  onSubmit={this.handleSubmit}
                >
                  {({ handleSubmit }) => (
                    <Form
                      noValidate
                      onSubmit={handleSubmit}
                      className="form__form"
                    >
                      {formFields}

                      <div className="form__control">
                        <Button
                          variant="primary"
                          type="submit"
                          className="form__btn form__btn--submit"
                        >
                          Send
                        </Button>
                        <Button
                          type="button"
                          className="form__btn form__btn--cancel"
                        >
                          Cancel
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </section>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}
