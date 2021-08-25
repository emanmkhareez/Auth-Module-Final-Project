require('dotenv').config()
const{Sequelize,DataTypes}=require('sequelize');


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
module.exports={
    
}