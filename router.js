var express = require('express');
var router = new express.Router();

var userController = require('./controllers/user.controller');

router.post('/auth/facebook', userController.loginFacebook);

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

module.exports = router;