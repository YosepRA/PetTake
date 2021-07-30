import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Field } from 'formik';

function LoginForm({ handleSubmit, touched, errors, className }) {
  return (
    <Form noValidate onSubmit={handleSubmit} className={className}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Field name="username">
          {({ field }) => (
            <Form.Control
              {...field}
              isInvalid={touched.username && errors.username}
            />
          )}
        </Field>

        <Form.Control.Feedback type="invalid">
          {errors.username}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Field name="password">
          {({ field }) => (
            <Form.Control
              {...field}
              type="password"
              isInvalid={touched.password && errors.password}
            />
          )}
        </Field>

        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="primary" className={`${className}-submit`}>
        Login
      </Button>
    </Form>
  );
}

export default LoginForm;
