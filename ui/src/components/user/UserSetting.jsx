import React, { Component } from 'react';

import '../../css/user-account.min.css';

import UserBasicSetting from './UserBasicSetting';
import UserPasswordSetting from './UserPasswordSetting';

export default class UserPetList extends Component {
  componentDidMount() {
    document.body.classList.add('page-user-account');
  }

  componentWillUnmount() {
    document.body.classList.remove('page-user-account');
  }

  render() {
    return (
      <section className="user-account">
        <UserBasicSetting />
        <UserPasswordSetting />
      </section>
    );
  }
}
