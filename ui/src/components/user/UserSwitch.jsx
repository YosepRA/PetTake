import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import '../../css/user.min.css';

import UserPetList from './UserPetList';
import UserSetting from './UserSetting';
import PetForm from './PetForm';

const mapStateToProps = ({ isAuthenticated }) => ({
  isAuthenticated,
});

class UserSwitch extends Component {
  componentDidMount() {
    document.body.classList.add('page-user');
  }

  componentWillUnmount() {
    document.body.classList.remove('page-user');
  }

  render() {
    const {
      isAuthenticated,
      match: { path },
    } = this.props;

    return (
      <Switch>
        {!isAuthenticated && <Redirect to="/login" />}

        <Route path={`${path}/pet/manage/:mode/:id?`} component={PetForm} />
        <Route path={`${path}/pet/:page`} component={UserPetList} />
        <Route path={`${path}/setting`} component={UserSetting} />

        <Redirect exact from="/user" to="/user/pet/1" />
        <Redirect exact from="/user/pet" to="/user/pet/1" />
      </Switch>
    );
  }
}

export default connect(mapStateToProps)(UserSwitch);
