import React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { REACT_APP_IS_DEMO } = process.env;
const isDemo = REACT_APP_IS_DEMO === 'true';

export default function PetCard({
  pet: { _id, name, breed, images },
  baseUrl,
  handleDelete,
  controlOverlay,
}) {
  const linkUrl = `${baseUrl}/${_id}`;

  const controlTooltip = (text) => (
    <Tooltip id={`tooltip-${text}`}>{text}</Tooltip>
  );

  return (
    <Card className="pet">
      <Link to={linkUrl}>
        <Card.Img variant="top" src={images[0].url} className="pet__image" />
      </Link>

      <Card.Body className="pet__body">
        <Link to={linkUrl} className="pet__body-name">
          <Card.Title className="pet__body-title">{name}</Card.Title>
        </Link>

        <Card.Text className="pet__body-breed">
          <small>{breed}</small>
        </Card.Text>
      </Card.Body>

      {controlOverlay && (
        <div className="pet__control">
          <OverlayTrigger placement="left" overlay={controlTooltip('Edit')}>
            <Link
              to={linkUrl}
              className="pet__control-btn pet__control-btn--edit"
            >
              <FontAwesomeIcon icon="edit" />
            </Link>
          </OverlayTrigger>

          {!isDemo && (
            <OverlayTrigger placement="left" overlay={controlTooltip('Delete')}>
              <button
                type="button"
                variant="primary"
                className="pet__control-btn pet__control-btn--delete"
                onClick={() => handleDelete(_id)}
              >
                <FontAwesomeIcon icon="trash" />
              </button>
            </OverlayTrigger>
          )}
        </div>
      )}
    </Card>
  );
}
