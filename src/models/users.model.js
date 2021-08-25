"use strict";
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "emanKhaledTariq";
// const { DataTypes } = require('sequelize/types')
const userModel = (Sequelize, DataTypes) => {
  const model = Sequelize.define("medicalStaff", {
    username: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    },
    role: {
      type: DataTypes.ENUM("user", "writer", "editor", "admin"),
      required: true,
      defaultValue: "user",
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(tokenObj) {
        return jwt.sign(tokenObj, SECRET);
      },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ["read"],
          writer: ["read", "create"],
          editor: ["read", "create", "update"],
          admin: ["read", "create", "update", "delete"],
        };
        return acl[this.role];
      },
    },
  });
  model.beforeCreate(async (user) => {
    let hashPass = await bcrypt.hash(user.password, 10);
    user.password = hashPass;
  });
  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }
    throw new Error("invalid user");
  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = await this.findOne({ username: parsedToken.username });
      if (user) {
        return user;
      }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message);
    }
  };
  return model;
};

module.exports = userModel;
