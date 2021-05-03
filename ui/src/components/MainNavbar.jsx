/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserModal from './UserModal';

export default class MainNavbar extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.pagesLinks = [
      {
        label: 'Home',
        props: {
          to: '/',
          exact: true,
          className: 'navbar__menu-item navbar__menu-link',
        },
      },
      {
        label: 'Contact',
        props: {
          to: '/contact',
          className: 'navbar__menu-item navbar__menu-link',
        },
      },
    ];
  }

  toggleMenu = (state) => {
    this.setState({ isOpen: state });

    if (state === true) {
      document.body.classList.add('disable-scroll');
    } else {
      document.body.classList.remove('disable-scroll');
    }
  };

  createLinks = (links) =>
    links.map(({ label, props }) => {
      return (
        <NavLink {...props} key={label} onClick={() => this.toggleMenu(false)}>
          {label}
        </NavLink>
      );
    });

  render() {
    const { isOpen } = this.state;
    const pagesLinks = this.createLinks(this.pagesLinks);

    return (
      <>
        <div
          className={`overlay ${isOpen ? 'show' : ''}`}
          onClick={() => this.toggleMenu(false)}
        />

        <header className="page-header">
          <nav className="navbar">
            <Container>
              <Link to="/" className="navbar__brand">
                PetTake
              </Link>

              <button
                type="button"
                className="navbar__toggle"
                onClick={() => this.toggleMenu(true)}
              >
                <FontAwesomeIcon icon="bars" />
              </button>

              <section className={`navbar__menu ${isOpen ? 'open' : ''}`}>
                <header className="navbar__menu-header">
                  <h1 className="navbar__menu-title">Menu</h1>
                  <button
                    type="button"
                    className="navbar__menu-close-btn"
                    onClick={() => this.toggleMenu(false)}
                  >
                    <FontAwesomeIcon icon="times" />
                  </button>
                </header>

                <div className="navbar__menu-pages">{pagesLinks}</div>

                <div className="navbar__menu-user">
                  <UserModal />
                </div>
              </section>
            </Container>
          </nav>
        </header>
      </>
    );
  }
}
