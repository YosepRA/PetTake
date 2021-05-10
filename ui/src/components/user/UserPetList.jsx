import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import '../../css/user-pet-list.min.css';

import generatePets from '../../fakeData';
import ListControl from '../ListControl';
import PetCard from '../PetCard';
import Pagination from '../Pagination';

const demoPets = generatePets(5);

function createPetItems(petArray) {
  return petArray.map((pet) => (
    <Col key={pet.name} sm="6" md="4">
      <PetCard pet={pet} baseUrl="/user/pet/edit" controlOverlay />
    </Col>
  ));
}

export default class UserPetList extends Component {
  componentDidMount() {
    document.body.classList.add('page-user-pet-list');
  }

  componentWillUnmount() {
    document.body.classList.remove('page-user-pet-list');
  }

  render() {
    return (
      <section className="user-pet">
        <ListControl newButton className="user-pet__control" />

        <div className="user-pet__list">
          <Row>{createPetItems(demoPets)}</Row>
        </div>

        <Pagination
          currentPage={1}
          totalPage={42}
          className="user-pet__pagination"
        />
      </section>
    );
  }
}
