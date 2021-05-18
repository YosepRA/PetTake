import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ListControlFilter from './ListControlFilter';
import ListControlSort from './ListControlSort';

export default function ListControl({ newButton, className }) {
  return (
    <div className={`list-control ${className}`}>
      <div className="list-control__filter-sort">
        <ListControlFilter />

        <ListControlSort />
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
