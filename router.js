var express = require('express');
var router = new express.Router();
var authGuard = require('./middlewares/auth_guard');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

var userController = require('./controllers/user.controller');

var returnRouter = function(io) {
    router.get('/user', authGuard, userController.getUser);

    router.get('/', function (req, res) {
        return res.status(200).send({
            "app": "API",
            "description": "Hackthon Smart City"
        });
    });

    router.get('/*', function (req, res) {
        return res.status(404).send({
            "error": "Not Found"
        });
    });

    return router;
};

module.exports = returnRouter;