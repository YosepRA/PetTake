/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import '../../css/user-pet-list.min.css';

import actionCreator from '../store/actionCreator';
import ListControl from '../ListControl';
import PetCard from '../PetCard';
import Pagination from '../Pagination';
import NoDataFound from '../NoDataFound';
import withSearchToVariables from '../withSearchToVariables';

const demoPetIds = [
  '60af60e81950eb1a70922b4c',
  '60af60e81950eb1a70922b4d',
  '60af60e81950eb1a70922b4e',
  '60af60e81950eb1a70922b4f',
  '60af60e81950eb1a70922b50',
];

const mapStateToProps = ({ userPetList, user }) => ({
  userPetList,
  petIds: user.pets,
});
const mapDispatchToProps = {
  getUserPetList: actionCreator.getUserPetList,
};

function createPetItems(petArray) {
  return petArray.map((pet) => (
    <Col key={pet._id} sm="6" md="4">
      <PetCard pet={pet} baseUrl="/user/pet/edit" controlOverlay />
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

  loadData = () => {
    const { getUserPetList, variables } = this.props;
    const userPetListVars = { ...variables, petIds: demoPetIds };

    getUserPetList(userPetListVars);
  };

  render() {
    const { userPetList } = this.props;

    return (
      <section className="user-pet">
        <ListControl newButton className="user-pet__control" />

        <div className="user-pet__list">
          <Row>
            {userPetList.length === 0 ? (
              <Col>
                <NoDataFound />
              </Col>
            ) : (
              createPetItems(userPetList)
            )}
          </Row>
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

export default withSearchToVariables(
  connect(mapStateToProps, mapDispatchToProps)(UserPetList),
);
