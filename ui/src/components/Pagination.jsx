/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Pagination({ currentPage, totalPage }) {
  return (
    <section className="pagination">
      <Link to="/" className="btn btn-primary pagination__btn" title="First">
        <span className="pagination__icon pagination__icon--double">
          <FontAwesomeIcon icon="chevron-left" />
          <FontAwesomeIcon icon="chevron-left" />
        </span>
        <span className="pagination__text">First</span>
      </Link>

      <Link to="/" className="btn btn-primary pagination__btn" title="Previous">
        <span className="pagination__icon">
          <FontAwesomeIcon icon="chevron-left" />
        </span>
        <span className="pagination__text">Prev</span>
      </Link>

      <span className="pagination__info">
        Page <strong>{currentPage}</strong> out of <strong>{totalPage}</strong>
      </span>

      <Link to="/" className="btn btn-primary pagination__btn" title="Next">
        <span className="pagination__icon">
          <FontAwesomeIcon icon="chevron-right" />
        </span>
        <span className="pagination__text">Next</span>
      </Link>

      <Link to="/" className="btn btn-primary pagination__btn" title="Last">
        <span className="pagination__icon">
          <FontAwesomeIcon icon="chevron-right" />
          <FontAwesomeIcon icon="chevron-right" />
        </span>
        <span className="pagination__text">Last</span>
      </Link>
    </section>
  );
}
