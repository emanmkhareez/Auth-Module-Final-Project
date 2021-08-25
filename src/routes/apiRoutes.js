"use strict";

const express = require("express");
const router = express.Router();
const dataModels = require("../models");

router.param("model", (req, res, next) => {
  const modelName = req.params.model;
  if (dataModels[modelName]) {
    req.model = dataModels[modelName];
    next();
  } else {
    next("Invalid Model");
  }
});

router.get("/:model");
router.get("");
router.get("");
router.get("");
router.get("");
