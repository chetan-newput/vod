var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var multipart = require('connect-multiparty');

var multipartMiddleware = multipart();
var cert = process.env.jwtSecret ? process.env.jwtSecret : 'SECRET';
var auth = jwt({secret: cert, userProperty: 'payload'});
var userController = require('../controllers/userController');

router.get('/myprofile', auth, userController.getProfile);

router.get('/myhistory/', auth, userController.myHistory);

router.post('/myprofile', auth, multipartMiddleware, userController.updateProfile);

router.get('/myprofile', auth, userController.getProfile);

router.get('/*', userController.renderIndex);

router.post('/history/', auth, userController.renderHistory);

router.post('/register', userController.register);

router.post('/login', userController.login);

module.exports = router;