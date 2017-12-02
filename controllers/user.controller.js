var User = require('../models/user');
var config = require('../config');
var request = require('request');
var moment = require('moment');
var jwt = require('jwt-simple');

function createJWT(user) {
    var payload = {
        sub: user,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
}