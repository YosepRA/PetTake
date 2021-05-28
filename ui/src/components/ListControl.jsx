import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ListControlFilter from './ListControlFilter';
import ListControlSort from './ListControlSort';

const initialState = {
  breed: '',
  gender: '',
  age: '',
  coatLength: '',
  preferHomeWith: [],
  preferHomeWithout: [],
  health: [],
  sort: '-createdDate',
};

class ListControl extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  handleReset = () => {
    const { urlBase, history } = this.props;

    this.setState(initialState, () => {
      history.push(urlBase);
    });
  };

  applyControl = (changes) => {
    const { urlBase, history } = this.props;

    this.setState(changes, () => {
      const controls = this.state;
      const params = new URLSearchParams();

      Object.keys(controls).forEach((key) => {
        const value = controls[key];
        const isArray = Array.isArray(value);
        // If it's an array and it has values.
        if (isArray && value.length > 0) {
          value.forEach((arrayValue) => {
            params.append(key, arrayValue);
          });
        }
        // If it's anything other than array and it has value.
        if (!isArray && value) {
          params.set(key, value);
        }
      });
      const search = params.toString() ? `?${params.toString()}` : '';

      history.push({
        pathname: urlBase,
        search,
      });
    });
  };

  render() {
    const { newButton, className } = this.props;
    const { sort } = this.state;

    return (
      <div className={`list-control ${className}`}>
        <div className="list-control__filter-sort">
          <ListControlFilter
            handleReset={this.handleReset}
            applyControl={this.applyControl}
          />

          <ListControlSort sort={sort} applyControl={this.applyControl} />
        </div>

        {newButton && (
          <Link
            to="/user/pet/new"
            className="btn list-control__btn list-control__btn--new"
          >
            <FontAwesomeIcon icon="plus" /> New
          </Link>
        )}
      </div>
    );
  }
}

export default withRouter(ListControl);
