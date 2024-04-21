// Check.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_config'); // Assuming your Sequelize configuration is in a separate file
const Employee = require('./employee');

const Check = sequelize.define('Check', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    checkin: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    checkout: {
        type: DataTypes.DATE,
        allowNull: true, // Allow null for initial checkin
    },
    timeDifference: {
        type: DataTypes.VIRTUAL, // This will be a virtual field
        get() {
            const checkin = this.getDataValue('checkin');
            const checkout = this.getDataValue('checkout');
            if (checkin && checkout) {
                return Math.abs(checkout - checkin);
            }
            return null;
        }
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// Define the association with the Employee model
Check.belongsTo(Employee, { foreignKey: 'employee_id' });

module.exports = Check;