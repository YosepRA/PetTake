import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LoginModalBody from './LoginModalBody';
import RegisterModalBody from './RegisterModalBody';
import withModal from './withModal';

class UserModal extends Component {
  constructor() {
    super();
    this.state = {
      page: 'login',
    };
  }

  handleModalShow = (page) => {
    const { handleShow } = this.props;

    this.setState({ page });
    handleShow();
  };

  changePage = (page) => {
    this.setState({ page });
  };

  render() {
    const { page } = this.state;
    const { isOpen, handleClose } = this.props;

    return (
      <>
        <button
          type="button"
          className="navbar__menu-item navbar__menu-button"
          onClick={() => this.handleModalShow('login')}
        >
          Login
        </button>

        <button
          type="button"
          className="navbar__menu-item navbar__menu-button"
          onClick={() => this.handleModalShow('register')}
        >
          Register
        </button>

        <Modal
          show={isOpen}
          onHide={handleClose}
          centered
          className={`navbar__modal navbar__modal--${page}`}
        >
          <Modal.Header className="navbar__modal-header">
            <h1 className="navbar__modal-logo">PetTake</h1>
            <Modal.Title className="navbar__modal-title">
              {page === 'login' ? 'Welcome Back!' : 'Create Account'}
            </Modal.Title>
            <button
              type="button"
              className="navbar__modal-close"
              onClick={handleClose}
            >
              <FontAwesomeIcon icon="times" />
            </button>
          </Modal.Header>

          {page === 'login' && (
            <LoginModalBody
              modal
              changePage={this.changePage}
              handleClose={handleClose}
            />
          )}
          {page === 'register' && (
            <RegisterModalBody
              modal
              changePage={this.changePage}
              handleClose={handleClose}
            />
          )}
        </Modal>
      </>
    );
  }
}

export default withModal(UserModal);
