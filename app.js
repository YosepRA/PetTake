require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const logger = require('morgan');
const history = require('connect-history-api-fallback');

const path = require('path');

const mongoConnect = require('./mongo-connect.js');
const startApolloServer = require('./graphql/apiHandler.js');
const passport = require('./passport/index.js');
const cloudinaryInit = require('./services/cloudinary/index.js');

const indexRouter = require('./routes/index.js');
const imageRouter = require('./routes/image.js');
const userRouter = require('./routes/user.js');

const app = express();

const {
  NODE_ENV,
  PORT,
  SESSION_SECRET,
  CORS_ORIGIN,
  CORS_CREDENTIALS,
  MONGODB_URL,
} = process.env;

const port = PORT || 3000;

let sessionSecret = SESSION_SECRET;
if (!sessionSecret) {
  console.log(
    'You are using unsafe session secret. Provide application with safe secret using environment variable.',
  );
  sessionSecret = 'unsafe_secret';
}

const corsConfig =
  NODE_ENV === 'development'
    ? {
        origin: [CORS_ORIGIN, /\.ngrok\.io/],
        credentials: CORS_CREDENTIALS === 'true',
      }
    : { origin: false };

const mongoUrl = MONGODB_URL;

mongoConnect(mongoUrl);

/* ========== Middlewares ========== */

app.use(express.json());
app.use(cors(corsConfig));
app.use(
  session({
    secret: sessionSecret,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: MONGODB_URL,
      ttl: 7 * 24 * 60 * 60,
    }),
  }),
);
app.use(logger('dev'));
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './ui/build')));
}

/* ========== Passport initialization ========== */

app.use(passport.initialize());
app.use(passport.session());

/* ========== Cloudinary initialization ========== */

cloudinaryInit();

/* ========== Routes ========== */

startApolloServer(app);

app.use('/', indexRouter);
app.use('/image', imageRouter);
app.use('/user', userRouter);

/* ========== Start server. ========== */

app.listen(port, () => {
  console.log(`API server is listening on port ${port}...`);
});
