import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/home.min.css';

import generatePets from '../fakeData';
import ListControl from './ListControl';
import PetCard from './PetCard';
import Pagination from './Pagination';

export default function PetList() {
  const pets = generatePets(5);

  const createPetItems = (petArray) =>
    petArray.map((pet) => (
      <Col key={pet.name} sm="6" md="4">
        <PetCard pet={pet} />
      </Col>
    ));

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
              <ListControl />
            </Col>
          </Row>

          <div className="pet-list__items">
            <Row>{createPetItems(pets)}</Row>
          </div>

          <Pagination currentPage={1} totalPage={42} />
        </Container>
      </section>
    </main>
  );
}
