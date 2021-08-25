'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');
const UsersSchema = require('../src/models/users/model');

const DATABASE_URL_TEST = process.env.DATABASE_URL_TEST;

const DATABASE_CONFIG = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
}

const sequelize = new Sequelize(`${DATABASE_URL_TEST}`, DATABASE_CONFIG);

const Users = UsersSchema(sequelize, DataTypes);

beforeAll(async () => {
    await sequelize.sync();
});

afterAll(async () => {
    sequelize.drop();
});

describe('Bearer Auth', () => {
    let userInfo = {
        username: 'userTest',
        password: 'passtest',
        role: 'user'
    }

    it('should create a user with a hashed password', async () => {
        // arrange

        // act
        let user = await Users.create(userInfo);

        let isValid = await bcrypt.compare(userInfo.password, user.password);

        // assert
        expect(user.id).toBeTruthy();
        //check user name and password
        expect(isValid).toBeTruthy();
    });

    it('should attach a teken on find', async () => {
        //arrange 

        //act
        let user = await Users.findOne({ where: { username: userInfo.username } });
        let decodedJwt = jwt.decode(user.token);

        // assert
        expect(user.username).toEqual(userInfo.username);
        expect(user.token).toBeTruthy();
        expect(decodedJwt.username).toEqual(userInfo.username);
    });
});