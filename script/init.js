const Sequelize = require('sequelize');
var sequelize = require('../db');

const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});

User.sync({force: false}).then(() => {
    return User.create({
        firstName: 'Phelipe',
        lastName: 'Rocha'
    });
});