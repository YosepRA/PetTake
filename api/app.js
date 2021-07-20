require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');

const mongoConnect = require('./mongoConnect');
const startApolloServer = require('./apiHandler');
const passport = require('./passport');

const imageRouter = require('./routes/image');
const userRouter = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;
let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  console.log(
    'You are using unsafe session secret. Provide application with safe secret using environment variable.',
  );
  sessionSecret = 'unsafe_secret';
}

mongoConnect();

// ===== Midldewares ======

app.use(express.json());
// Set CORS credentials accordingly on production build.
app.use(
  cors({
    origin: 'http://localhost:8000',
    credentials: true,
  }),
);
app.use(
  session({
    secret: sessionSecret,
    saveUninitialized: false,
    resave: false,
  }),
);

app.use(express.static('public'));

/* ========== Passport initialization ========== */

app.use(passport.initialize());
app.use(passport.session());

// ===== Routes ======

startApolloServer(app);
app.use('/image', imageRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`API server is listening on port ${PORT}...`);
});
