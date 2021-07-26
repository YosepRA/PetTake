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

const mapStateToProps = ({ userPetList }) => ({
  userPetList,
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
        baseUrl="/user/pet/manage/edit"
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
    const {
      variables: prevVars,
      match: {
        params: { page: prevPage },
      },
    } = prevProps;
    const {
      variables: currentVars,
      match: {
        params: { page: currentPage },
      },
    } = this.props;

    if (prevVars !== currentVars || prevPage !== currentPage) this.loadData();
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
    const {
      getUserPetList,
      variables,
      match: {
        params: { page },
      },
    } = this.props;
    const gqlVariables = { ...variables, page: Number(page) };

    getUserPetList(gqlVariables);
  };

  render() {
    const {
      userPetList: { docs },
    } = this.props;

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
                <ListControl
                  baseUrl="/user/pet"
                  newButton
                  className="user-pet__control"
                />

                <div className="user-pet__list">
                  <Row>
                    {docs.length === 0 ? (
                      <Col>
                        <NoDataFound />
                      </Col>
                    ) : (
                      createPetItems(docs, this.handleDelete)
                    )}
                  </Row>
                </div>

                <Pagination
                  baseUrl="/user/pet"
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
