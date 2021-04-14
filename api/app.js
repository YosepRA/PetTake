require('dotenv').config();

const express = require('express');

const startApolloServer = require('./apiHandler');
const mongoConnect = require('./mongoConnect');

const app = express();
const PORT = process.env.PORT || 3000;

mongoConnect();

startApolloServer(app);

app.listen(PORT, () => {
  console.log(`API server is listening on port ${PORT}...`);
});
