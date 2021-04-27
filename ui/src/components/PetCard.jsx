import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PetCard({ pet: { name, breed, images } }) {
  return (
    <Card className="pet">
      <Card.Img variant="top" src={images[0]} className="pet__image" />
      <Card.Body className="pet__body">
        <Link to="/pet/123" className="pet__body-name">
          <Card.Title className="pet__body-title">{name}</Card.Title>
        </Link>

        <Card.Text className="pet__body-breed">
          <small>{breed}</small>
        </Card.Text>
      </Card.Body>

      <div className="pet__control-overlay">
        <Link
          to="/pet/123"
          className="btn btn-outline-light pet__control-btn"
        >
          Details
        </Link>
      </div>
    </Card>
  );
}
