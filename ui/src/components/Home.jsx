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

function createPetItems(petArray) {
  return petArray.map((pet) => (
    <Col key={pet.name} sm="6" md="4">
      <PetCard pet={pet} baseUrl="/pet" />
    </Col>
  ));
}

const mapStateToProps = ({ petList }) => ({
  petList,
});
const mapDispatchToProps = {
  getPetList: actionCreator.getPetList,
};

class Home extends Component {
  componentDidMount() {
    document.body.classList.add('page-home');

    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { variables: prevVars } = prevProps;
    const { variables: currentVars } = this.props;

    if (prevVars !== currentVars) this.loadData();
  }

  componentWillUnmount() {
    document.body.classList.remove('page-home');
  }

  loadData = () => {
    const { getPetList, variables } = this.props;

    getPetList(variables);
  };

  render() {
    const { petList } = this.props;
    const petItems = createPetItems(petList);

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
                <ListControl urlBase="/" className="pet-list__control" />
              </Col>
            </Row>

            <div className="pet-list__items">
              <Row>
                {petList.length === 0 ? (
                  <Col>
                    <NoDataFound />
                  </Col>
                ) : (
                  petItems
                )}
              </Row>
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

export default withSearchToVariables(
  connect(mapStateToProps, mapDispatchToProps)(Home),
);
