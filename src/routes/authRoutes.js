"use strict";

const express = require("express");
const signupCheck = require("../middelware/signupCheck.js");
const { User } = require("../models/index.js");
const router = express.Router();
const basicAuth = require("../middelware/basic.js");

router.post("/signup", signupCheck(User), (req, res) => {
  if (req.user) {
    res.status(201).send(req.user);
  }
});

router.post("/signin", basicAuth(User), (req, res) => {
  res.status(200).send(req.user);
});

module.exports = router;
