/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

const mapStateToProps = (state, ownProps) => {
  const { baseUrl } = ownProps;

  switch (baseUrl) {
    case '/home':
      return {
        page: state.petList.page,
        pages: state.petList.pages,
      };

    case '/user/pet':
      return {
        page: state.userPetList.page,
        pages: state.userPetList.pages,
      };

    default:
      return {};
  }
};

function Pagination(props) {
  const { page, pages, className } = props;
  const isFirstPage = page === 1;
  const isLastPage = page === pages;

  const handleChangePage = (nextPage) => {
    const { history, location, baseUrl } = props;
    const pathname = `${baseUrl}/${nextPage}`;

    history.push({ ...location, pathname });
  };

  return (
    <div className={`pagination ${className}`}>
      <Button
        variant="primary"
        className="pagination__btn"
        disabled={isFirstPage}
        onClick={() => handleChangePage(1)}
      >
        <span className="pagination__icon pagination__icon--double">
          <FontAwesomeIcon icon="chevron-left" />
          <FontAwesomeIcon icon="chevron-left" />
        </span>
        <span className="pagination__text">First</span>
      </Button>

      <Button
        variant="primary"
        className="pagination__btn"
        disabled={isFirstPage}
        onClick={() => handleChangePage(page - 1)}
      >
        <span className="pagination__icon">
          <FontAwesomeIcon icon="chevron-left" />
        </span>
        <span className="pagination__text">Prev</span>
      </Button>

      <span className="pagination__info">
        Page <strong>{page}</strong> out of <strong>{pages}</strong>
      </span>

      <Button
        variant="primary"
        className="pagination__btn"
        disabled={isLastPage}
        onClick={() => handleChangePage(page + 1)}
      >
        <span className="pagination__icon">
          <FontAwesomeIcon icon="chevron-right" />
        </span>
        <span className="pagination__text">Next</span>
      </Button>

      <Button
        variant="primary"
        className="pagination__btn"
        disabled={isLastPage}
        onClick={() => handleChangePage(pages)}
      >
        <span className="pagination__icon">
          <FontAwesomeIcon icon="chevron-right" />
          <FontAwesomeIcon icon="chevron-right" />
        </span>
        <span className="pagination__text">Last</span>
      </Button>
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(Pagination));
