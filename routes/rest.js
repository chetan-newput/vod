var express = require('express');
var router = express.Router();

router.get('/app', function (req, res, next) {
  var challange;
  console.log("in rest/app req.params :: ",req.params['hub.verify_token']);
  var verify_token = req.params['hub.verify_token'];
  if (verify_token === '12345678' && params['hub.challenge']) {
    challange = parseInt(req.params['hub.challenge']);
  }
  res.json({
    statusCode: 200,
    body: challange
  });
});

module.exports = router;