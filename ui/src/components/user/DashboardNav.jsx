import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom';

function DashboardNav() {
  return (
    <Nav variant="tabs" className="user-nav">
      <Nav.Item className="user-nav__item">
        <LinkContainer to="/user/pet">
          <Nav.Link eventKey="pet-list" className="user-nav__link">
            Pet list
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>

      <Nav.Item className="user-nav__item">
        <LinkContainer to="/user/setting">
          <Nav.Link eventKey="setting" className="user-nav__link">
            Account setting
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  );
}

export default withRouter(DashboardNav);
