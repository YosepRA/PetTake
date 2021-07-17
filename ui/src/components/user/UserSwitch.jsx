import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
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
                {!isAuthenticated && <Redirect to="/login" />}

                <Route path={`${path}/pet/:mode/:id?`} component={PetForm} />
                <Route path={`${path}/pet`} component={UserPetList} />
                <Route path={`${path}/setting`} component={UserSetting} />

                <Redirect exact from="/user" to="/user/pet" />
              </Switch>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}

export default connect(mapStateToProps)(UserSwitch);
