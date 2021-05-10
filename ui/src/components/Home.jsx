import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import '../css/home.min.css';

import generatePets from '../fakeData';
import ListControl from './ListControl';
import PetCard from './PetCard';
import Pagination from './Pagination';

const demoPets = generatePets(5);

function createPetItems(petArray) {
  return petArray.map((pet) => (
    <Col key={pet.name} sm="6" md="4">
      <PetCard pet={pet} baseUrl="/pet" />
    </Col>
  ));
}

export default class Home extends Component {
  componentDidMount() {
    document.body.classList.add('page-home');
  }

  componentWillUnmount() {
    document.body.classList.remove('page-home');
  }

  render() {
    return (
      <main className="main-container">
        <section className="hero">
          <h2 className="hero__catchphrase">
            <strong>Your Pet Buddy</strong> is
          </h2>
          <h2 className="hero__catchphrase">waiting for you</h2>
        </section>

        <section className="pet-list">
          <Container>
            <Row>
              <Col>
                <h1 className="pet-list__title">Find Your Pet</h1>
              </Col>
            </Row>

            <Row>
              <Col>
                <ListControl className="pet-list__control" />
              </Col>
            </Row>

            <div className="pet-list__items">
              <Row>{createPetItems(demoPets)}</Row>
            </div>

            <Pagination
              currentPage={1}
              totalPage={42}
              className="pet-list__pagination"
            />
          </Container>
        </section>
      </main>
    );
  }
}
