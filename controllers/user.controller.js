var config = require('../config');
var request = require('request');
var moment = require('moment');
var jwt = require('jwt-simple');
const Sequelize = require('sequelize');
var sequelize = require('../db');

var User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    picture: {
        type: Sequelize.STRING
    },
    facebook_auth: {
        type: Sequelize.STRING,
        unique: true
    },
    google_auth: {
        type: Sequelize.STRING,
        unique: true
    }
});

function createJWT(user) {
    var payload = {
        sub: user,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
}

exports.loginFacebook = function (req, res) {
    User.findOne({ where: { email: req.body.email }}).then(existingUser => {
        if (existingUser && existingUser.facebook_auth) {
            var token = createJWT(existingUser);
            res.send({ token: token });
        } else if (existingUser && !existingUser.facebook_auth) {
            var user = {};
            user.facebook_auth = req.body.facebook_auth;
            user.email = req.body.email;
            user.picture = req.body.picture;
            user.name = req.body.name;

            User.update(user, { where: { email: req.body.email } }).then(existingUser => {
                var token = createJWT(existingUser);
                res.send({ token: token });
            });
        } else {
            var user = new User();
            user.facebook_auth = req.body.facebook_auth;
            user.email = req.body.email;
            user.picture = req.body.picture;
            user.name = req.body.name;

            user.save(function(err) {
                var token = createJWT(user);
                res.send({ token: token });
            });
        }
    });

};