import React, { Component } from 'react';

export default function withModal(WrappedComponent) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        isOpen: false,
      };
    }

    handleShow = () => {
      this.setState({ isOpen: true });
    };

    handleClose = () => {
      this.setState({ isOpen: false });
    };

    render() {
      const { isOpen } = this.state;

      return (
        <WrappedComponent
          isOpen={isOpen}
          handleShow={this.handleShow}
          handleClose={this.handleClose}
        />
      );
    }
  };
}
