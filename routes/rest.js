var express = require('express');
var router = express.Router();

var restController = require('../controllers/rest_controller');

router.get('/app', restController.verifyToken );

router.post('/app', restController.handleEventRequest);

module.exports = router;