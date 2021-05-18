import React, { Component } from 'react';
import { Container, Form, Col, Button } from 'react-bootstrap';
import { Formik, Field } from 'formik';

import '../../css/pet-form.min.css';

import generatePets from '../../fakeData';
import PetFormImageInput from './PetFormImageInput';

const demoPet = generatePets(1)[0];
const breeds = [
  'Irish Terrier',
  'Georgian Shepherd',
  'Leonberger',
  'Dogo Guatemalteco',
  'Cretan Hound',
];
const initialValues = {
  name: '',
  breed: '',
  gender: 'male',
  age: 'puppy',
  coatLength: 'short',
  health: [],
  preferHomeWith: [],
  preferHomeWithout: [],
  description: '',
  iamges: [],
  useAccountContact: true,
  email: '',
  phone: '',
  address: '',
};

function createSelectOptions(data) {
  return data.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));
}

export default class PetForm extends Component {
  componentDidMount() {
    document.body.classList.add('page-pet-form');
  }

  componentWillUnmount() {
    document.body.classList.remove('page-pet-form');
  }

  handleSubmit = (values) => {
    console.log('PetForm values: ', JSON.stringify(values, null, 2));
  };

  render() {
    const breedOptions = createSelectOptions(breeds);

    return (
      <main className="main-container">
        <Container>
          <h1 className="page-title">New Pet Form</h1>

          <Formik onSubmit={this.handleSubmit} initialValues={initialValues}>
            {({ values, handleSubmit, setFieldValue }) => (
              <Form noValidate onSubmit={handleSubmit} className="pet-form">
                <section className="pet-form__section pet-form__basic">
                  <h2 className="pet-form__section-title">Basic Information</h2>

                  <Form.Group
                    controlId="name"
                    className="pet-form__group pet-form__name"
                  >
                    <Form.Label className="pet-form__label">Name</Form.Label>
                    <Field name="name">
                      {({ field }) => (
                        <Form.Control
                          {...field}
                          type="text"
                          className="pet-form___field pet-form__field--text"
                        />
                      )}
                    </Field>
                  </Form.Group>

                  <Form.Group
                    controlId="breed"
                    className="pet-form__group pet-form__breed"
                  >
                    <Form.Label className="pet-form__label">Breed</Form.Label>
                    <Field name="breed">
                      {({ field }) => (
                        <Form.Control
                          {...field}
                          as="select"
                          className="pet-form___field pet-form__field--select"
                        >
                          <option value="">None</option>
                          {breedOptions}
                        </Form.Control>
                      )}
                    </Field>
                  </Form.Group>

                  <Form.Row>
                    <Col xs="12" sm="6" md="3">
                      <Form.Group
                        controlId="gender"
                        className="pet-form__group pet-form__gender"
                      >
                        <Form.Label className="pet-form__label">
                          Gender
                        </Form.Label>

                        <Field name="gender">
                          {({ field }) => (
                            <Form.Check
                              {...field}
                              type="radio"
                              label="Male"
                              id="male"
                              value="male"
                              className="pet-form___field pet-form__field--radio"
                              defaultChecked={field.value === 'male'}
                            />
                          )}
                        </Field>

                        <Field name="gender">
                          {({ field }) => (
                            <Form.Check
                              {...field}
                              type="radio"
                              label="Female"
                              id="female"
                              value="female"
                              className="pet-form___field pet-form__field--radio"
                              defaultChecked={field.value === 'female'}
                            />
                          )}
                        </Field>
                      </Form.Group>
                    </Col>

                    <Col xs="12" sm="6" md="3">
                      <Form.Group
                        controlId="age"
                        className="pet-form__group pet-form__age"
                      >
                        <Form.Label className="pet-form__label">Age</Form.Label>

                        <Field name="age">
                          {({ field }) => (
                            <Form.Check
                              {...field}
                              type="radio"
                              label="Puppy"
                              id="puppy"
                              value="puppy"
                              className="pet-form___field pet-form__field--radio"
                              defaultChecked={field.value === 'puppy'}
                            />
                          )}
                        </Field>

                        <Field name="age">
                          {({ field }) => (
                            <Form.Check
                              {...field}
                              type="radio"
                              label="Young"
                              id="young"
                              value="young"
                              className="pet-form___field pet-form__field--radio"
                              defaultChecked={field.value === 'young'}
                            />
                          )}
                        </Field>

                        <Field name="age">
                          {({ field }) => (
                            <Form.Check
                              {...field}
                              type="radio"
                              label="Mature"
                              id="mature"
                              value="mature"
                              className="pet-form___field pet-form__field--radio"
                              defaultChecked={field.value === 'mature'}
                            />
                          )}
                        </Field>
                      </Form.Group>
                    </Col>

                    <Col xs="12" sm="6" md="3">
                      <Form.Group
                        controlId="coat-length"
                        className="pet-form__group pet-form__coat-length"
                      >
                        <Form.Label className="pet-form__label">
                          Coat Length
                        </Form.Label>

                        <Field name="coatLength">
                          {({ field }) => (
                            <Form.Check
                              {...field}
                              type="radio"
                              label="Short"
                              id="short"
                              value="short"
                              className="pet-form___field pet-form__field--radio"
                              defaultChecked={field.value === 'short'}
                            />
                          )}
                        </Field>

                        <Field name="coatLength">
                          {({ field }) => (
                            <Form.Check
                              {...field}
                              type="radio"
                              label="Medium"
                              id="medium"
                              value="medium"
                              className="pet-form___field pet-form__field--radio"
                              defaultChecked={field.value === 'medium'}
                            />
                          )}
                        </Field>

                        <Field name="coatLength">
                          {({ field }) => (
                            <Form.Check
                              {...field}
                              type="radio"
                              label="Long"
                              id="long"
                              value="long"
                              className="pet-form___field pet-form__field--radio"
                              defaultChecked={field.value === 'long'}
                            />
                          )}
                        </Field>
                      </Form.Group>
                    </Col>

                    <Col xs="12" sm="6" md="3">
                      <Form.Group
                        controlId="health"
                        className="pet-form__group pet-form__health"
                      >
                        <Form.Label className="pet-form__label">
                          Health
                        </Form.Label>

                        <Field name="health">
                          {({ field }) => (
                            <Form.Check
                              {...field}
                              type="checkbox"
                              label="Vaccinated"
                              id="vaccinated"
                              value="vaccinated"
                              className="pet-form___field pet-form__field--checkbox"
                            />
                          )}
                        </Field>

                        <Field name="health">
                          {({ field }) => (
                            <Form.Check
                              {...field}
                              type="checkbox"
                              label="Spayed/Neutered"
                              id="spayed/neutered"
                              value="spayed/neutered"
                              className="pet-form___field pet-form__field--checkbox"
                            />
                          )}
                        </Field>
                      </Form.Group>
                    </Col>
                  </Form.Row>

                  <Form.Row>
                    <Col xs="12" sm="6">
                      <Form.Group
                        controlId="prefer-home-with"
                        className="pet-form__group pet-form__prefer-home-with"
                      >
                        <Form.Label className="pet-form__label">
                          Prefer in a home with
                        </Form.Label>

                        <Field name="preferHomeWith">
                          {({ field }) => (
                            <Form.Check
                              {...field}
                              type="checkbox"
                              label="Other dogs"
                              id="other dogs"
                              value="other dogs"
                              className="pet-form___field pet-form__field--checkbox"
                            />
                          )}
                        </Field>

                        <Field name="preferHomeWith">
                          {({ field }) => (
                            <Form.Check
                              {...field}
                              type="checkbox"
                              label="Other cats"
                              id="other cats"
                              value="other cats"
                              className="pet-form___field pet-form__field--checkbox"
                            />
                          )}
                        </Field>

                        <Field name="preferHomeWith">
                          {({ field }) => (
                            <Form.Check
                              {...field}
                              type="checkbox"
                              label="Children"
                              id="children"
                              value="children"
                              className="pet-form___field pet-form__field--checkbox"
                            />
                          )}
                        </Field>
                      </Form.Group>
                    </Col>

                    <Col xs="12" sm="6">
                      <Form.Group
                        controlId="prefer-home-without"
                        className="pet-form__group pet-form__prefer-home-without"
                      >
                        <Form.Label className="pet-form__label">
                          Prefer in a home without
                        </Form.Label>

                        <Field name="preferHomeWithout">
                          {({ field }) => (
                            <Form.Check
                              {...field}
                              type="checkbox"
                              label="Other dogs"
                              id="other dogs"
                              value="other dogs"
                              className="pet-form___field pet-form__field--checkbox"
                            />
                          )}
                        </Field>

                        <Field name="preferHomeWithout">
                          {({ field }) => (
                            <Form.Check
                              {...field}
                              type="checkbox"
                              label="Other cats"
                              id="other cats"
                              value="other cats"
                              className="pet-form___field pet-form__field--checkbox"
                            />
                          )}
                        </Field>

                        <Field name="preferHomeWithout">
                          {({ field }) => (
                            <Form.Check
                              {...field}
                              type="checkbox"
                              label="Children"
                              id="children"
                              value="children"
                              className="pet-form___field pet-form__field--checkbox"
                            />
                          )}
                        </Field>
                      </Form.Group>
                    </Col>
                  </Form.Row>

                  <Form.Group
                    controlId="description"
                    className="pet-form__group pet-form__description"
                  >
                    <Form.Label className="pet-form__label">
                      Description
                    </Form.Label>
                    <Field name="description">
                      {({ field }) => (
                        <Form.Control
                          {...field}
                          as="textarea"
                          className="pet-form___field pet-form__field--textarea"
                        />
                      )}
                    </Field>
                  </Form.Group>

                  <PetFormImageInput
                    petName={values.name}
                    images={demoPet.images}
                    setFieldValue={setFieldValue}
                  />
                </section>

                <section className="pet-form__section pet-form__contact">
                  <h2 className="pet-form__section-title">
                    Contact Information
                  </h2>

                  <Form.Group
                    controlId="use-account-contact"
                    className="pet-form__group pet-form__use-account-contact"
                  >
                    <Field name="useAccountContact">
                      {({ field }) => (
                        <Form.Check
                          {...field}
                          type="checkbox"
                          label="Use account contact information"
                          id="use-account-contact-information"
                          className="pet-form___field pet-form__field--checkbox"
                          defaultChecked={field.value}
                        />
                      )}
                    </Field>
                  </Form.Group>

                  {!values.useAccountContact && (
                    <>
                      <Form.Group
                        controlId="email"
                        className="pet-form__group pet-form__email"
                      >
                        <Form.Label className="pet-form__label">
                          Email
                        </Form.Label>
                        <Field name="email">
                          {({ field }) => (
                            <Form.Control
                              {...field}
                              type="email"
                              className="pet-form___field pet-form__field--email"
                            />
                          )}
                        </Field>
                      </Form.Group>

                      <Form.Group
                        controlId="phone"
                        className="pet-form__group pet-form__phone"
                      >
                        <Form.Label className="pet-form__label">
                          Phone
                        </Form.Label>
                        <Field name="phone">
                          {({ field }) => (
                            <Form.Control
                              {...field}
                              type="text"
                              className="pet-form___field pet-form__field--text"
                            />
                          )}
                        </Field>
                      </Form.Group>

                      <Form.Group
                        controlId="address"
                        className="pet-form__group pet-form__address"
                      >
                        <Form.Label className="pet-form__label">
                          Address
                        </Form.Label>
                        <Field name="address">
                          {({ field }) => (
                            <Form.Control
                              {...field}
                              as="textarea"
                              className="pet-form___field pet-form__field--textarea"
                            />
                          )}
                        </Field>
                      </Form.Group>
                    </>
                  )}
                </section>

                <section className="pet-form__control">
                  <Button
                    variant="primary"
                    type="submit"
                    className="pet-form__control-btn pet-form__control-btn--create"
                  >
                    Create
                  </Button>

                  <Button
                    variant="primary"
                    type="button"
                    className="pet-form__control-btn pet-form__control-btn--cancel"
                  >
                    Cancel
                  </Button>
                </section>
              </Form>
            )}
          </Formik>
        </Container>
      </main>
    );
  }
}
