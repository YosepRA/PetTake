/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Form, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DataSource, { API_ENDPOINT } from '../store/DataSource';

const { REACT_APP_IS_DEMO } = process.env;
const isDemo = REACT_APP_IS_DEMO === 'true';

const dataSource = new DataSource();

function controlTooltip(text) {
  return <Tooltip id={`tooltip-${text}`}>{text}</Tooltip>;
}

class PetFormImageInput extends Component {
  constructor() {
    super();
    this.fileInputRef = React.createRef();
  }

  handleAdd = async ({ target: { files } }) => {
    try {
      const { images, setFieldValue } = this.props;

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
    // Reset file input file state.
    /* A silent error happens in this chronology:
    1. Upload "image-one.jpg". (name doesn't matter)
    2. Successful upload.
    3. Delete "image-one.jpg".
    4. Successful delete.
    5. Upload "image-one.jpg", again.
    6. The code does nothing.
    Conclusion: The file input does not fire the "change" event because it has the
    same "files" state as the previous file input change event. The problem doesn't
    occur if I use a different set of images, resulting in a different set of "files"
    state. */
    this.fileInputRef.current.value = null;
  };

  handleDelete = async (filename) => {
    try {
      const { images, setFieldValue } = this.props;

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

  createImages = () => {
    const { images, petName } = this.props;

    return images.map(({ path, filename }) => (
      <div key={filename} className="pet-form__image-wrapper">
        <img
          src={`${API_ENDPOINT}${path}`}
          alt={petName}
          className="pet-form__image-item"
        />

        {!isDemo && (
          <div className="pet-form__image-control">
            <OverlayTrigger placement="left" overlay={controlTooltip('Delete')}>
              <button
                type="button"
                className="pet-form__image-control-btn pet-form__image-control-btn--delete"
                onClick={() => this.handleDelete(filename)}
              >
                <FontAwesomeIcon icon="trash" />
              </button>
            </OverlayTrigger>
          </div>
        )}
      </div>
    ));
  };

  render() {
    const { images } = this.props;

    return (
      <Form.Group
        controlId="images"
        className="pet-form__group pet-form__image"
      >
        <Form.Label className="pet-form__label">Images</Form.Label>

        <div className="pet-form__image-list">
          {images && images.length > 0 && this.createImages()}

          {isDemo ? (
            <Button className="pet-form__upload-btn disabled">
              <FontAwesomeIcon
                icon="camera"
                className="pet-form__upload-btn-icon"
              />
              <span className="pet-form__upload-btn-text">
                Upload image is disabled on demo
              </span>
            </Button>
          ) : (
            <label
              htmlFor="image-add"
              className="pet-form__image-label pet-form__upload-btn"
            >
              <input
                type="file"
                id="image-add"
                className="pet-form__image-add"
                multiple
                ref={this.fileInputRef}
                onChange={this.handleAdd}
              />
              <FontAwesomeIcon
                icon="camera"
                className="pet-form__image-label-icon pet-form__upload-btn-icon"
              />
              <span className="pet-form__image-label-text pet-form__upload-btn-text">
                Add image
              </span>
            </label>
          )}
        </div>
      </Form.Group>
    );
  }
}

export default PetFormImageInput;
