/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import '../../css/user-pet-list.min.css';

import actionCreator from '../store/actionCreator';
import ListControl from '../ListControl';
import PetCard from '../PetCard';
import Pagination from '../Pagination';
import NoDataFound from '../NoDataFound';
import withSearchToVariables from '../withSearchToVariables';
import DashboardNav from './DashboardNav';

const demoPetIds = [
  '60c48b54bebb4f117cb118d5',
  '60c48b54bebb4f117cb118db',
  '60c48b54bebb4f117cb118df',
  '60c48b54bebb4f117cb118e1',
  '60c48b54bebb4f117cb118d9',
];

const mapStateToProps = ({ userPetList, user }) => ({
  userPetList,
  petIds: user.pets,
});
const mapDispatchToProps = {
  getUserPetList: actionCreator.getUserPetList,
  deletePet: actionCreator.deletePet,
};

function createPetItems(petArray, handleDelete) {
  return petArray.map((pet) => (
    <Col key={pet._id} sm="6" md="4">
      <PetCard
        pet={pet}
        baseUrl="/user/pet/edit"
        handleDelete={handleDelete}
        controlOverlay
      />
    </Col>
  ));
}

class UserPetList extends Component {
  componentDidMount() {
    document.body.classList.add('page-user-pet-list');

    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { variables: prevVars } = prevProps;
    const { variables: currentVars } = this.props;

    if (prevVars !== currentVars) this.loadData();
  }

  componentWillUnmount() {
    document.body.classList.remove('page-user-pet-list');
  }

  handleDelete = async (_id) => {
    try {
      const { deletePet } = this.props;

      await deletePet(_id);
    } catch (error) {
      alert(`UserPetList error: ${error.message}`);
    }
  };

  loadData = () => {
    const { getUserPetList, variables } = this.props;
    // Change demo ids later...
    const userPetListVars = { ...variables, petIds: demoPetIds };

    getUserPetList(userPetListVars);
  };

  render() {
    const { userPetList } = this.props;

    return (
      <main className="main-container">
        <Container>
          <Row>
            <Col>
              <DashboardNav />
            </Col>
          </Row>

          <Row>
            <Col>
              <section className="user-pet">
                <ListControl newButton className="user-pet__control" />

                <div className="user-pet__list">
                  <Row>
                    {userPetList.length === 0 ? (
                      <Col>
                        <NoDataFound />
                      </Col>
                    ) : (
                      createPetItems(userPetList, this.handleDelete)
                    )}
                  </Row>
                </div>

                <Pagination
                  currentPage={1}
                  totalPage={42}
                  className="user-pet__pagination"
                />
              </section>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}

export default withSearchToVariables(
  connect(mapStateToProps, mapDispatchToProps)(UserPetList),
);
