'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./lib/data-collection.js');
const userModel = require('./users/model.js');
const noteModel = require('./notes/model.js')

const DATABASE_URL = process.env.DATABASE_URL;

const DATABASE_CONFIG = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
}

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const users = userModel(sequelize, DataTypes);
const note = noteModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: users,
  note: new Collection(note)
}