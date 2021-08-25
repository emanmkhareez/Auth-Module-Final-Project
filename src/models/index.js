require('dotenv').config()
const{Sequelize,DataTypes}=require('sequelize');
const userModel = require('./users.model.js');
const POSTGRES_URI = process.env.POSTGRES_URI;

const DATABASE_CONFIG = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
}

const sequelize = new Sequelize(POSTGRES_URI, DATABASE_CONFIG);
let user = userModel(sequelize, DataTypes);

module.exports={
    db: sequelize,
    User: user,
}