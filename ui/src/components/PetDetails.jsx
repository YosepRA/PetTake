import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Carousel } from 'react-bootstrap';

import '../css/pet-details.min.css';

import actionCreator from './store/actionCreator';
import { API_ENDPOINT } from './store/DataSource';

const mapStateToProps = ({ petDetails }) => ({
  petDetails,
});
const mapDispatchToProps = {
  getPetDetails: actionCreator.getPetDetails,
};

function createCarouselItems(data, petName) {
  return data.map((image, index) => (
    <Carousel.Item key={image.filename} className="pet-carousel__item">
      <img
        src={`${API_ENDPOINT}${image.path}`}
        alt={`${petName}-${index + 1}`}
        className="pet-carousel__image"
      />
    </Carousel.Item>
  ));
}

function createDataSections(data, sectionName) {
  return data.map(({ field, value, cssModifier }) => {
    const className = `data-section ${sectionName}__info ${sectionName}-info--${cssModifier}`;
    return (
      <div key={field} className={className}>
        <div className={`${sectionName}__info-field`}>{field}:</div>
        <div className={`${sectionName}__info-value`}>{value}</div>
      </div>
    );
  });
}

function arrayToCommaString(array) {
  return array.join(', ');
}

class PetDetails extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      getPetDetails,
    } = this.props;

    getPetDetails(id);

    document.body.classList.add('page-pet-details');
  }

  componentWillUnmount() {
    document.body.classList.remove('page-pet-details');
  }

  render() {
    const { petDetails } = this.props;

    if (!petDetails || Object.keys(petDetails).length === 0) return null;

    const {
      name,
      breed,
      gender,
      age,
      coatLength,
      preferHomeWith,
      preferHomeWithout,
      health,
      images,
      description,
      author: { email, phone, address },
    } = petDetails;
    const carouselItems = createCarouselItems(images, name);
    const aboutData = [
      { field: 'Breed', value: breed, cssModifier: 'breed' },
      { field: 'Gender', value: gender, cssModifier: 'gender' },
      { field: 'Age', value: age, cssModifier: 'age' },
      { field: 'Coat length', value: coatLength, cssModifier: 'coat-length' },
      {
        field: 'Health',
        value: arrayToCommaString(health),
        cssModifier: 'health',
      },
      {
        field: 'Prefer home with',
        value: arrayToCommaString(preferHomeWith),
        cssModifier: 'prefer-home-with',
      },
      {
        field: 'Prefer home without',
        value: arrayToCommaString(preferHomeWithout),
        cssModifier: 'prefer-home-without',
      },
    ];
    const contactData = [
      { field: 'Email', value: email, cssModifier: 'email' },
      { field: 'Phone', value: phone, cssModifier: 'phone' },
      { field: 'Address', value: address, cssModifier: 'address' },
    ];

    const aboutDataSections = createDataSections(aboutData, 'about');
    const contactDataSections = createDataSections(contactData, 'contact');

    return (
      <main className="main-container">
        <Container>
          <Row>
            <Col>
              <Carousel interval={null} className="pet-carousel">
                {carouselItems}
              </Carousel>
            </Col>
          </Row>

          <Row>
            <Col>
              <h1 className="name">{name}</h1>
            </Col>
          </Row>

          <Row>
            <Col xs="12" md="7">
              <section className="about info-section">
                <h2 className="section-header about__title">About</h2>

                {aboutDataSections}
              </section>

              <section className="description info-section">
                <h2 className="section-header description__title">
                  Description
                </h2>

                <p>{description}</p>
              </section>
            </Col>

            <Col xs="12" md="5">
              <section className="contact info-section">
                <h2 className="section-header contact__title">Contact</h2>

                {contactDataSections}
              </section>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PetDetails);
