import React from 'react';
import { Field } from 'formik';
import { Form, Button } from 'react-bootstrap';

function RegisterForm({ handleSubmit, touched, errors, className }) {
  return (
    <Form noValidate onSubmit={handleSubmit} className={className}>
      <Form.Group controlId="name">
        <Form.Label>Full Name</Form.Label>
        <Field name="name">
          {({ field }) => (
            <Form.Control {...field} isInvalid={touched.name && errors.name} />
          )}
        </Field>

        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>

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

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Field name="email">
          {({ field }) => (
            <Form.Control
              {...field}
              type="email"
              isInvalid={touched.email && errors.email}
            />
          )}
        </Field>

        <Form.Control.Feedback type="invalid">
          {errors.email}
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

      <Form.Group controlId="password-repeat">
        <Form.Label>Repeat password</Form.Label>
        <Field name="passwordRepeat">
          {({ field }) => (
            <Form.Control
              {...field}
              type="password"
              isInvalid={touched.passwordRepeat && errors.passwordRepeat}
            />
          )}
        </Field>

        <Form.Control.Feedback type="invalid">
          {errors.passwordRepeat}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="primary" className={`${className}-submit`}>
        Register
      </Button>
    </Form>
  );
}

export default RegisterForm;
