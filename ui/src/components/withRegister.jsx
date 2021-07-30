import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DataSource from './store/DataSource';
import actionCreator from './store/actionCreator';

const dataSource = new DataSource();

const mapDispatchToProps = {
  setAuthenticate: actionCreator.setAuthenticate,
};

function withRegister(WrappedComponent) {
  return class withRegisterHOC extends Component {
    constructor() {
      super();
      this.state = {
        error: {
          show: false,
          message: '',
        },
      };
    }

    handleFormSubmit = (values) => {
      const { setAuthenticate, modal, handleClose, history } = this.props;

      this.toggleError(false, '', async () => {
        // We don't need passwordrepeat.
        const { passwordRepeat, ...user } = values;
        const result = await dataSource.postData('/user/register', { user });
        // If it's failed (unique data clash).
        if (!result.success) {
          this.toggleError(true, result.message);
          return undefined;
        }

        setAuthenticate(true, result.user);
        // Close modal.
        if (modal && handleClose) handleClose();
        history.push('/user');

        return undefined;
      });
    };

    toggleError = (show, message = '', done) => {
      this.setState(
        {
          error: {
            show,
            message,
          },
        },
        done,
      );
    };

    render() {
      const { error } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          handleFormSubmit={this.handleFormSubmit}
          error={error}
        />
      );
    }
  };
}

export default (WrappedComponent) =>
  connect(null, mapDispatchToProps)(withRouter(withRegister(WrappedComponent)));
