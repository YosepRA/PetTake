require('dotenv').config();

const express = require('express');
const cors = require('cors');

const mongoConnect = require('./mongoConnect');
const imageRouter = require('./routes/image');
const startApolloServer = require('./apiHandler');

const app = express();
const PORT = process.env.PORT || 3000;

mongoConnect();

// ===== Midldewares ======

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

// ===== Routes ======

startApolloServer(app);
app.use('/image', imageRouter);

app.listen(PORT, () => {
  console.log(`API server is listening on port ${PORT}...`);
});
