import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import '../../css/user.min.css';

import UserPetList from './UserPetList';
import UserSetting from './UserSetting';
import PetForm from './PetForm';
// import DataSource from '../store/DataSource';
// import actionCreator from '../store/actionCreator';

// const dataSource = new DataSource();

const mapStateToProps = ({ isAuthenticated }) => ({
  isAuthenticated,
});
// const mapDispatchToProps = {
//   setAuthenticate: actionCreator.setAuthenticate,
// };

class UserSwitch extends Component {
  componentDidMount() {
    // const {
    //   setAuthenticate,
    //   location: { pathname },
    //   history,
    // } = this.props;

    // const result = await dataSource.getData('/user', {
    //   withCredentials: true,
    // });
    // if (result.success) {
    //   setAuthenticate(true, result.user);
    //   history.push({ pathname });
    // }

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

        <Route path={`${path}/pet/:mode/:id?`} component={PetForm} />
        <Route path={`${path}/pet`} component={UserPetList} />
        <Route path={`${path}/setting`} component={UserSetting} />

        <Redirect exact from="/user" to="/user/pet" />
      </Switch>
    );
  }
}

export default connect(mapStateToProps)(UserSwitch);
