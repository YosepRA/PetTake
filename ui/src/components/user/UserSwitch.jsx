import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import '../../css/user.min.css';

import UserPetList from './UserPetList';
import UserSetting from './UserSetting';

export default class PetForm extends Component {
  componentDidMount() {
    document.body.classList.add('page-user');
  }

  componentWillUnmount() {
    document.body.classList.remove('page-user');
  }

  render() {
    const {
      match: { path, url },
    } = this.props;

    return (
      <main className="main-container">
        <Container>
          <Row>
            <Col>
              <Nav variant="tabs" className="user-nav">
                <Nav.Item className="user-nav__item">
                  <LinkContainer to={`${url}/pet`}>
                    <Nav.Link eventKey="pet-list" className="user-nav__link">
                      Pet list
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>

                <Nav.Item className="user-nav__item">
                  <LinkContainer to={`${url}/setting`}>
                    <Nav.Link eventKey="setting" className="user-nav__link">
                      Account setting
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>

          <Row>
            <Col>
              <Switch>
                <Route path={`${path}/pet`} component={UserPetList} />
                <Route path={`${path}/setting`} component={UserSetting} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}
