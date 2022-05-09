/* eslint-disable indent */

import React, { Component } from 'react';
import { Container, Form, Col, Button } from 'react-bootstrap';
import { Formik, Field } from 'formik';

import '../../css/pet-form.min.css';

import DataSource from '../store/DataSource';
import actionTypes from '../store/actionTypes';
import queries from '../store/graphqlQueries';
import mutations from '../store/graphqlMutations';
import PetFormImageInput from './PetFormImageInput';

const { REACT_APP_IS_DEMO } = process.env;
const isDemo = REACT_APP_IS_DEMO === 'true';

const dataSource = new DataSource();

// ===== Input options. =====

const breeds = [
  'Irish Terrier',
  'Georgian Shepherd',
  'Leonberger',
  'Dogo Guatemalteco',
  'Cretan Hound',
];
const genders = [
  {
    label: 'Male',
    id: 'male',
    value: 'Male',
  },
  {
    label: 'Female',
    id: 'female',
    value: 'Female',
  },
];
const ages = [
  {
    label: 'Puppy',
    id: 'puppy',
    value: 'Puppy',
  },
  {
    label: 'Young',
    id: 'young',
    value: 'Young',
  },
  {
    label: 'Mature',
    id: 'mature',
    value: 'Mature',
  },
];
const coatLengths = [
  {
    label: 'Short',
    id: 'short',
    value: 'Short',
  },
  {
    label: 'Medium',
    id: 'medium',
    value: 'Medium',
  },
  {
    label: 'Long',
    id: 'long',
    value: 'Long',
  },
];
const healths = [
  {
    label: 'Vaccinated',
    id: 'vaccinated',
    value: 'Vaccinated',
  },
  {
    label: 'Spayed/Neutered',
    id: 'spayed/neutered',
    value: 'Spayed/Neutered',
  },
];
const preferHomes = [
  {
    label: 'Other dogs',
    id: 'other-dogs',
    value: 'Other dogs',
  },
  {
    label: 'Other cats',
    id: 'other-cats',
    value: 'Other cats',
  },
  {
    label: 'Children',
    id: 'children',
    value: 'Children',
  },
];

// ====== Helpers. ======

function createSelectOptions(data) {
  return data.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));
}

function createRadioOptions(groupLabel, name, data) {
  const radios = data.map(({ label, id, value }) => (
    <Field key={id} name={name}>
      {({ field }) => (
        <Form.Check
          {...field}
          type="radio"
          label={label}
          id={`${name}-${id}`}
          value={value}
          className="pet-form___field pet-form__field--radio"
          defaultChecked={field.value === value}
        />
      )}
    </Field>
  ));

  return (
    <>
      <Form.Label className="pet-form__label">{groupLabel}</Form.Label>
      {radios}
    </>
  );
}

function createCheckboxOptions(groupLabel, name, activeValues, data) {
  const checkboxes = data.map(({ label, id, value }) => (
    <Field key={id} name={name}>
      {({ field }) => (
        <Form.Check
          {...field}
          type="checkbox"
          label={label}
          id={`${name}-${id}`}
          value={value}
          className="pet-form___field pet-form__field--checkbox"
          defaultChecked={activeValues.includes(value)}
        />
      )}
    </Field>
  ));

  return (
    <>
      <Form.Label className="pet-form__label">{groupLabel}</Form.Label>
      {checkboxes}
    </>
  );
}

export default class PetForm extends Component {
  constructor() {
    super();
    this.state = {
      status: '',
      initialValues: {
        name: '',
        breed: '',
        gender: 'Male',
        age: 'Puppy',
        coatLength: 'Short',
        health: [],
        preferHomeWith: [],
        preferHomeWithout: [],
        description: '',
        images: [],
      },
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { mode, id },
      },
    } = this.props;

    if (mode === 'edit') {
      const data = await dataSource.graphQLFetch(
        queries[actionTypes.PET_DETAILS],
        { _id: id },
      );
      if (data && data.pet) {
        this.setState({ initialValues: data.pet, status: 'loaded' });
      }
    }

    document.body.classList.add('page-pet-form');
  }

  componentWillUnmount() {
    document.body.classList.remove('page-pet-form');
  }

  handleSubmit = async (values) => {
    if (isDemo) return undefined;

    try {
      const {
        history,
        match: {
          params: { mode, id },
        },
      } = this.props;
      const { author, ...petData } = values;

      const query =
        mode === 'new'
          ? mutations[actionTypes.PET_CREATE]
          : mutations[actionTypes.PET_UPDATE];
      const vars =
        mode === 'new'
          ? {
              pet: petData,
            }
          : {
              _id: id,
              changes: petData,
            };

      await dataSource.graphQLFetch(query, vars);

      history.push('/user/pet');
    } catch (error) {
      console.error('PetForm handle submit error.', error.message);
    }

    return undefined;
  };

  handleCancel = () => {
    const { history } = this.props;

    history.push('/user/pet');
  };

  render() {
    const {
      match: {
        params: { mode, id },
      },
    } = this.props;
    const { status, initialValues } = this.state;
    // Using key to force update Formik component.
    // I use this because it won't re-render even with new initialValues.
    const formikKey = status === 'loaded' ? `${id}-${status}` : id;
    const breedOptions = createSelectOptions(breeds);

    return (
      <main className="main-container">
        <Container>
          <h1 className="page-title">New Pet Form</h1>

          <Formik
            key={mode === 'edit' ? formikKey : 'new'}
            onSubmit={this.handleSubmit}
            initialValues={initialValues}
          >
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
                        {createRadioOptions('Gender', 'gender', genders)}
                      </Form.Group>
                    </Col>

                    <Col xs="12" sm="6" md="3">
                      <Form.Group
                        controlId="age"
                        className="pet-form__group pet-form__age"
                      >
                        {createRadioOptions('Age', 'age', ages)}
                      </Form.Group>
                    </Col>

                    <Col xs="12" sm="6" md="3">
                      <Form.Group
                        controlId="coat-length"
                        className="pet-form__group pet-form__coat-length"
                      >
                        {createRadioOptions(
                          'Coat length',
                          'coatLength',
                          coatLengths,
                        )}
                      </Form.Group>
                    </Col>

                    <Col xs="12" sm="6" md="3">
                      <Form.Group
                        controlId="health"
                        className="pet-form__group pet-form__health"
                      >
                        {createCheckboxOptions(
                          'Health',
                          'health',
                          values.health,
                          healths,
                        )}
                      </Form.Group>
                    </Col>
                  </Form.Row>

                  <Form.Row>
                    <Col xs="12" sm="6">
                      <Form.Group
                        controlId="prefer-home-with"
                        className="pet-form__group pet-form__prefer-home-with"
                      >
                        {createCheckboxOptions(
                          'Prefer in a home with',
                          'preferHomeWith',
                          values.preferHomeWith,
                          preferHomes,
                        )}
                      </Form.Group>
                    </Col>

                    <Col xs="12" sm="6">
                      <Form.Group
                        controlId="prefer-home-without"
                        className="pet-form__group pet-form__prefer-home-without"
                      >
                        {createCheckboxOptions(
                          'Prefer in a home without',
                          'preferHomeWithout',
                          values.preferHomeWithout,
                          preferHomes,
                        )}
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
                    images={values.images}
                    setFieldValue={setFieldValue}
                  />
                </section>

                <section className="pet-form__control">
                  <Button
                    variant="primary"
                    type="submit"
                    className="pet-form__control-btn pet-form__control-btn--create"
                    disabled={isDemo}
                  >
                    {mode === 'new' ? 'Create' : 'Edit'}
                  </Button>

                  <Button
                    variant="primary"
                    type="button"
                    className="pet-form__control-btn pet-form__control-btn--cancel"
                    onClick={this.handleCancel}
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
