const mongoose = require('mongoose');

function mongoConnect(mongoUrl) {
  mongoose.connect(mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  const dbConnection = mongoose.connection;
  dbConnection.on('error', () => console.error('Database connection error.'));
  dbConnection.on('open', () => {
    console.log('Successfully connected to database...');
  });
  dbConnection.on('close', () => {
    console.log('Connection to database is closed.');
  });

  return { dbConnection };
}

// MongoDB connection.

module.exports = mongoConnect;
