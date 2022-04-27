# PetTake API

Pet finder app built using MERN stack and GraphQL.

### Environment Variables

#### Production:

- `NODE_ENV`  
  Node environment. Either `development` or `production`.
- `IS_DEMO`  
  Whether to use demo build to disable a few features or not.
- `MONGODB_URL`  
  URL to MongoDB instance, local or cloud.
- `SESSION_SECRET`  
  Session secret.
- `ETHEREAL_HOST`  
  Ethereal fake SMTP server host.
- `ETHEREAL_USER`  
  Ethereal fake SMTP server user.
- `ETHERAL_PASS`  
  Ethereal fake SMTP server password.

#### Development only:

- `CORS_ORIGIN`  
  CRA development server origin.
- `CORS_CREDENTIALS`  
  Whether to allow credentials on cross-origin.
