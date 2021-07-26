import React from 'react';
import { Formik, Field } from 'formik';
import { Row, Col, Dropdown, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Demo parameters.
const breeds = [
  'Irish Terrier',
  'Georgian Shepherd',
  'Leonberger',
  'Dogo Guatemalteco',
  'Cretan Hound',
];
const ages = ['Puppy', 'Young', 'Mature'];
const genders = ['Male', 'Female'];
const coatLengths = ['Short', 'Medium', 'Long'];
const preferHomes = ['Other dogs', 'Other cats', 'Children'];
const healths = ['Spayed/Neutered', 'Vaccinated'];

const initialValues = {
  breed: '',
  gender: '',
  age: '',
  coatLength: '',
  preferHomeWith: [],
  preferHomeWithout: [],
  health: [],
};

function createFilterSelectOptions(data) {
  return data.map((value) => (
    <option key={value} value={value}>
      {value}
    </option>
  ));
}

function createCheckbox(data, fieldName, selectedValues = []) {
  return data.map((d) => (
    <Field key={d} name={fieldName}>
      {({ field }) => (
        <Form.Check
          {...field}
          type="checkbox"
          label={d}
          id={`${fieldName}-${d}`}
          className="pet-form___field pet-form__field--checkbox"
          value={d}
          checked={selectedValues.includes(d)}
        />
      )}
    </Field>
  ));
}

export default function ListControlFilter(props) {
  const breedOptions = createFilterSelectOptions(breeds);
  const ageOptions = createFilterSelectOptions(ages);
  const genderOptions = createFilterSelectOptions(genders);
  const coatLengthOptions = createFilterSelectOptions(coatLengths);

  const { handleReset: handleFormReset } = props;

  const handleFormSubmit = (values) => {
    const { applyControl } = props;

    applyControl(values);
  };

  return (
    <Dropdown className="list-control__dropdown list-control__dropdown--filter">
      <Dropdown.Toggle
        variant="primary"
        id="list-filter"
        className="list-control__btn "
      >
        <FontAwesomeIcon icon="filter" /> Filter
      </Dropdown.Toggle>

      <Dropdown.Menu className="list-control__menu list-control__menu--filter">
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          onReset={handleFormReset}
        >
          {({ handleSubmit, handleReset, values }) => (
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Row>
                <Col xs="12" md="6">
                  <Form.Group controlId="breed">
                    <Form.Label>Breed</Form.Label>
                    <Field name="breed">
                      {({ field }) => (
                        <Form.Control {...field} as="select">
                          <option value="">All</option>
                          {breedOptions}
                        </Form.Control>
                      )}
                    </Field>
                  </Form.Group>
                </Col>

                <Col xs="12" md="6">
                  <Form.Group controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Field name="age">
                      {({ field }) => (
                        <Form.Control {...field} as="select">
                          <option value="">All</option>
                          {ageOptions}
                        </Form.Control>
                      )}
                    </Field>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col xs="12" md="6">
                  <Form.Group controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Field name="gender">
                      {({ field }) => (
                        <Form.Control {...field} as="select">
                          <option value="">All</option>
                          {genderOptions}
                        </Form.Control>
                      )}
                    </Field>
                  </Form.Group>
                </Col>

                <Col xs="12" md="6">
                  <Form.Group controlId="coat-length">
                    <Form.Label>Coat length</Form.Label>
                    <Field name="coatLength">
                      {({ field }) => (
                        <Form.Control {...field} as="select">
                          <option value="">All</option>
                          {coatLengthOptions}
                        </Form.Control>
                      )}
                    </Field>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col xs="12" md="6">
                  <Form.Group controlId="prefer-home-with">
                    <Form.Label>Prefer home with</Form.Label>
                    {createCheckbox(
                      preferHomes,
                      'preferHomeWith',
                      values.preferHomeWith,
                    )}
                  </Form.Group>
                </Col>

                <Col xs="12" md="6">
                  <Form.Group controlId="prefer-home-without">
                    <Form.Label>Prefer home without</Form.Label>
                    {createCheckbox(
                      preferHomes,
                      'preferHomeWithout',
                      values.preferHomeWithout,
                    )}
                  </Form.Group>
                </Col>

                <Col xs="12" md="6">
                  <Form.Group controlId="health">
                    <Form.Label>Health</Form.Label>
                    {createCheckbox(healths, 'health', values.health)}
                  </Form.Group>
                </Col>
              </Form.Row>

              <div className="list-control__menu-control">
                <Row>
                  <Col xs="12" md="6" lg="4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="list-control__menu-btn list-control__menu-btn--apply"
                    >
                      Apply
                    </Button>
                  </Col>

                  <Col xs="12" md="6" lg="4">
                    <Button
                      type="button"
                      variant="secondary"
                      className="list-control__menu-btn list-control__menu-btn--reset"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>
              </div>
            </Form>
          )}
        </Formik>
      </Dropdown.Menu>
    </Dropdown>
  );
}
