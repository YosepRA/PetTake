# PetTake API

Pet finder app built using MERN stack and GraphQL.

---

### *Repository Discontinued*

PetTake monorepo is now discontinued. The project is now split between `server` and `ui`, and both of them will be further developed from there onwards. Here are the following repositories for each new apps.

1. PetTake Server  
https://github.com/YosepRA/pettake-server
2. PetTake Web UI  
https://github.com/YosepRA/pettake-web-ui

Thank you for your attention and have a nice day.

---

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
