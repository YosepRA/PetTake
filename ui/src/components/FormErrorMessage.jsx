import React from 'react';
import { Alert } from 'react-bootstrap';

export default function FormErrorMessage({ message }) {
  return (
    <Alert variant="danger" className="form-error-message">
      {message}
    </Alert>
  );
}
