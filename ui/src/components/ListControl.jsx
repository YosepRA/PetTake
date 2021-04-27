import React, { Component } from 'react';
import produce from 'immer';
import { Row, Col, Dropdown, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Demo data.
const breeds = [
  'Irish Terrier',
  'Georgian Shepherd',
  'Leonberger',
  'Dogo Guatemalteco',
  'Cretan Hound',
];
const ages = ['Puppy', 'Young', 'Adult', 'Senior'];
const genders = ['Male', 'Female'];
const coatLengths = ['Short', 'Medium', 'Long'];
const preferHomes = ['Other dogs', 'Other cats', 'Children'];
const healths = ['Spayed/Neutered', 'Vaccinated'];
const sortKeys = [
  { label: 'Newest', value: '-createdDate' },
  { label: 'Oldest', value: 'createdDate' },
  { label: 'A-Z', value: 'name' },
  { label: 'Z-A', value: '-name' },
];

// function createCheckbox(values) {

// }

function createFilterSelectOptions(data) {
  return data.map((value) => (
    <option key={value} value={value}>
      {value}
    </option>
  ));
}

function mapArrayToCheckboxState(data) {
  const checkboxState = {};

  data.forEach((field) => {
    checkboxState[field] = false;
  });

  return checkboxState;
}

export default class ListControl extends Component {
  constructor() {
    super();

    this.state = {
      filter: {
        breed: '',
        age: '',
        gender: '',
        coatLength: '',
        preferHomeWith: mapArrayToCheckboxState(preferHomes),
        preferHomeWithout: mapArrayToCheckboxState(preferHomes),
        health: mapArrayToCheckboxState(healths),
      },
      sort: sortKeys[0].value,
    };
  }

  onFilterSelectChange = ({ target: { name, value } }) => {
    this.setState(
      produce((draft) => {
        draft.filter[name] = value;
      }),
    );
  };

  onFilterCheckboxChange = ({ target: { name, value, checked } }) => {
    this.setState(
      produce((draft) => {
        draft.filter[name][value] = checked;
      }),
    );
  };

  onSortChange = ({ target: { value } }) => {
    this.setState({ sort: value });
  };

  createCheckbox(data, fieldName) {
    return Object.keys(data).map((field) => (
      <Form.Check
        key={field}
        id={`${fieldName}-${field}`}
        label={field}
        name={fieldName}
        value={field}
        checked={data[field]}
        onChange={this.onFilterCheckboxChange}
      />
    ));
  }

  createSortOptions(data, currentValue) {
    return data.map(({ label, value }) => (
      <Form.Check
        key={value}
        type="radio"
        id={label}
        label={label}
        name="sort"
        value={value}
        checked={currentValue === value}
        onChange={this.onSortChange}
      />
    ));
  }

  render() {
    const {
      filter: {
        breed,
        age,
        gender,
        coatLength,
        preferHomeWith,
        preferHomeWithout,
        health,
      },
      sort,
    } = this.state;

    const breedOptions = createFilterSelectOptions(breeds);
    const ageOptions = createFilterSelectOptions(ages);
    const genderOptions = createFilterSelectOptions(genders);
    const coatLengthOptions = createFilterSelectOptions(coatLengths);
    const preferHomeWithCheckbox = this.createCheckbox(
      preferHomeWith,
      'preferHomeWith',
    );
    const preferHomeWithoutCheckbox = this.createCheckbox(
      preferHomeWithout,
      'preferHomeWithout',
    );
    const healthCheckbox = this.createCheckbox(health, 'health');
    const sortOptions = this.createSortOptions(sortKeys, sort);

    return (
      <div className="list-control">
        <Dropdown className="list-control__dropdown list-control__dropdown--filter">
          <Dropdown.Toggle
            variant="primary"
            id="list-filter"
            className="list-control__btn "
          >
            <FontAwesomeIcon icon="filter" /> Filter
          </Dropdown.Toggle>

          <Dropdown.Menu className="list-control__menu list-control__menu--filter">
            <Form.Row>
              <Col xs="12" md="6">
                <Form.Group controlId="breed">
                  <Form.Label>Breed</Form.Label>
                  <Form.Control
                    as="select"
                    name="breed"
                    value={breed}
                    onChange={this.onFilterSelectChange}
                  >
                    <option value="">All</option>
                    {breedOptions}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col xs="12" md="6">
                <Form.Group controlId="age">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    as="select"
                    name="age"
                    value={age}
                    onChange={this.onFilterSelectChange}
                  >
                    <option value="">All</option>
                    {ageOptions}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col xs="12" md="6">
                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={gender}
                    onChange={this.onFilterSelectChange}
                  >
                    <option value="">All</option>
                    {genderOptions}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col xs="12" md="6">
                <Form.Group controlId="coatLength">
                  <Form.Label>Coat Length</Form.Label>
                  <Form.Control
                    as="select"
                    name="coatLength"
                    value={coatLength}
                    onChange={this.onFilterSelectChange}
                  >
                    <option value="">All</option>
                    {coatLengthOptions}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col xs="12" md="6">
                <Form.Group controlId="prefer-home-with">
                  <Form.Label>Prefer home with</Form.Label>
                  {preferHomeWithCheckbox}
                </Form.Group>
              </Col>

              <Col xs="12" md="6">
                <Form.Group controlId="prefer-home-without">
                  <Form.Label>Prefer home without</Form.Label>
                  {preferHomeWithoutCheckbox}
                </Form.Group>
              </Col>

              <Col xs="12" md="6">
                <Form.Group controlId="health">
                  <Form.Label>Health</Form.Label>
                  {healthCheckbox}
                </Form.Group>
              </Col>
            </Form.Row>

            <div className="list-control__menu-control">
              <Row>
                <Col xs="12" md="6" lg="4">
                  <Button
                    variant="primary"
                    className="list-control__menu-btn list-control__menu-btn--apply"
                  >
                    Apply
                  </Button>
                </Col>

                <Col xs="12" md="6" lg="4">
                  <Button
                    variant="secondary"
                    className="list-control__menu-btn list-control__menu-btn--reset"
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="list-control__dropdown list-control__dropdown--filter">
          <Dropdown.Toggle
            variant="primary"
            id="list-sort"
            className="list-control__btn"
          >
            <FontAwesomeIcon icon="sort-alpha-down" /> Sort
          </Dropdown.Toggle>

          <Dropdown.Menu className="list-control__menu list-control__menu--sort">
            {sortOptions}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}
