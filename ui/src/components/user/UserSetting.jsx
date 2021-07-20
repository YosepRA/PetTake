import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import '../../css/user-account.min.css';

import UserBasicSetting from './UserBasicSetting';
import UserPasswordSetting from './UserPasswordSetting';
import DashboardNav from './DashboardNav';

export default class UserPetList extends Component {
  componentDidMount() {
    document.body.classList.add('page-user-account');
  }

  componentWillUnmount() {
    document.body.classList.remove('page-user-account');
  }

  render() {
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
              <section className="user-account">
                <UserBasicSetting />
                <UserPasswordSetting />
              </section>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}
