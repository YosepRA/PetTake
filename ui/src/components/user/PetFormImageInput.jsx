/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DataSource, { API_ENDPOINT } from '../store/DataSource';

const dataSource = new DataSource();

export default function PetFormImageInput({ petName, images, setFieldValue }) {
  const handleAdd = async ({ target: { files } }) => {
    try {
      const form = new FormData();

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        form.append('images', file);
      }

      const result = await dataSource.postData('/image', form);

      setFieldValue('images', images.concat(result));
    } catch (error) {
      console.log(error);
      alert('PetFormImageInput image add error.');
    }
  };

  const handleDelete = async (filename) => {
    try {
      const result = await dataSource.deleteData('/image', { filename });

      if (result.success) {
        // Filter out the recently deleted image from pet form state.
        const filteredImages = images.filter(
          (img) => img.filename !== filename,
        );

        setFieldValue('images', filteredImages);
      }
    } catch (error) {
      console.log(error);
      alert('PetFormImageInput image delete error.');
    }
  };

  const controlTooltip = (text) => (
    <Tooltip id={`tooltip-${text}`}>{text}</Tooltip>
  );

  const createImages = () =>
    images.map(({ path, filename }) => (
      <div key={filename} className="pet-form__image-wrapper">
        <img
          src={`${API_ENDPOINT}${path}`}
          alt={petName}
          className="pet-form__image-item"
        />

        <div className="pet-form__image-control">
          <OverlayTrigger placement="left" overlay={controlTooltip('Delete')}>
            <button
              type="button"
              className="pet-form__image-control-btn pet-form__image-control-btn--delete"
              onClick={() => handleDelete(filename)}
            >
              <FontAwesomeIcon icon="trash" />
            </button>
          </OverlayTrigger>
        </div>
      </div>
    ));

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
            multiple
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
