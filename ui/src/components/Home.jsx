/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import '../css/home.min.css';

import actionCreator from './store/actionCreator';
import ListControl from './ListControl';
import PetCard from './PetCard';
import Pagination from './Pagination';
import NoDataFound from './NoDataFound';
import withSearchToVariables from './withSearchToVariables';

const mapStateToProps = ({ petList }) => ({
  petList,
});
const mapDispatchToProps = {
  getPetList: actionCreator.getPetList,
};

function createPetItems(petArray) {
  return petArray.map((pet) => (
    <Col key={pet._id} sm="6" md="4">
      <PetCard pet={pet} baseUrl="/pet" />
    </Col>
  ));
}

class Home extends Component {
  componentDidMount() {
    document.body.classList.add('page-home');

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
    document.body.classList.remove('page-home');
  }

  loadData = () => {
    const {
      getPetList,
      variables,
      match: {
        params: { page },
      },
    } = this.props;
    const gqlVariables = { ...variables, page: Number(page) };

    getPetList(gqlVariables);
  };

  render() {
    const {
      petList: { docs },
    } = this.props;
    const petItems = createPetItems(docs);

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
                <ListControl baseUrl="/home" className="pet-list__control" />
              </Col>
            </Row>

            <div className="pet-list__items">
              <Row>
                {docs.length === 0 ? (
                  <Col>
                    <NoDataFound />
                  </Col>
                ) : (
                  petItems
                )}
              </Row>
            </div>

            <Pagination baseUrl="/home" className="pet-list__pagination" />
          </Container>
        </section>
      </main>
    );
  }
}

export default withSearchToVariables(
  connect(mapStateToProps, mapDispatchToProps)(Home),
);
