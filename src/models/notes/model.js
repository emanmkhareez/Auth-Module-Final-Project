'use strict';

const notesModel = (sequelize, DataTypes) => sequelize.define('Notes', {
    sentence: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
    }
});

module.exports = notesModel;
