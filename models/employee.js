const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_config');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateCreated: {
        type: DataTypes.DATE,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Employee;