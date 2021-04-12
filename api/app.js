const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', async (req, res) => {
  res.send('API server is running');
});

app.listen(app.get('port'), () => {
  console.log(`API server is listening on port ${app.get('port')}...`);
});
