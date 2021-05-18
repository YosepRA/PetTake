/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function PetFormImageInput({ petName, images, setFieldValue }) {
  const handleAdd = (event) => {
    console.log('Pet image handle add.', event.target.files);
  };

  const handleDelete = () => {
    console.log('Pet image handle delete.');
  };

  const controlTooltip = (text) => (
    <Tooltip id={`tooltip-${text}`}>{text}</Tooltip>
  );

  const createImages = () =>
    images.map((imgUrl) => (
      <div key={imgUrl} className="pet-form__image-wrapper">
        <img src={imgUrl} alt={petName} className="pet-form__image-item" />

        <div className="pet-form__image-control">
          <OverlayTrigger placement="left" overlay={controlTooltip('Delete')}>
            <button
              type="button"
              className="pet-form__image-control-btn pet-form__image-control-btn--delete"
              onClick={handleDelete}
            >
              <FontAwesomeIcon icon="trash" />
            </button>
          </OverlayTrigger>
        </div>
      </div>
    ));

  // const imageItems = createImages();

  return (
    <Form.Group controlId="images" className="pet-form__group pet-form__image">
      <Form.Label className="pet-form__label">Images</Form.Label>

      <div className="pet-form__image-list">
        {images && images.length > 0 && createImages()}

        <label htmlFor="image-add" className="pet-form__image-label">
          <input
            type="file"
            id="image-add"
            className="pet-form__image-add"
            onChange={handleAdd}
          />
          <FontAwesomeIcon
            icon="camera"
            className="pet-form__image-label-icon"
          />
          <span className="pet-form__image-label-text">Add image</span>
        </label>
      </div>
    </Form.Group>
  );
}
