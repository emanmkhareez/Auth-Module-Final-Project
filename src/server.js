"use strict";

// 3rd Party Resources
const express = require('express');
const cors = require('cors');


// Esoteric Resources
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middelware/logger');
const authRoutes = require('./routes/authRoutes.js');
const apiRoutes = require('./routes/apiRoutes.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(express.json());

app.use(logger);

// Routes
app.get('/', (req, res) => {
  const homeInfo = {
    Welcome: 'Hello this is HOME 🏠 root , All Working Good 😂',
    authRoutes: '🟢 /signup 🔵 /signin 🟠 /users 🔴 /secret',
    apiRoutes: '📝 /note & /note/:id'
  }
  res.status(200).json(homeInfo);
});

app.use(authRoutes);
app.use(apiRoutes);

app.get('/bad', (req, res, next) => {
  next('error from bad end point');
});

// Catchalls
app.use("*", notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
