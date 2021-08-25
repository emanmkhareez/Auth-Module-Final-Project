"use strict";

const express = require("express");
const app = express();
app.use(express.json());
const notFound = require("./error-handlers/404.js");
const internalServerError = require("./error-handlers/500.js");
const logger = require("./middelware/logger.js");
const authRouters = require('./routes/authRoutes.js');

app.use(authRouters);
app.get("/", (req, res) => {
  res.status(200).send("All Good 😂");
});
app.use(logger);
app.use("*", notFound);
app.use(internalServerError);

module.exports = {
    server: app,
  start: (port) => {
    app.listen(port, () => console.log(`Server Is Listining On Port ${port}`));
  },
};
