const Sequelize = require('sequelize');
var sequelize = require('../db');

exports.getUser = function (userId, cb) {
    User.findAll().then(users => {
        return cb(users, null);
    });
};