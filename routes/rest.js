var express = require('express');
var router = express.Router();

router.get('/app', function (req, res, next) {
  var challange;
  console.log("in rest/app req.params :: ",
  req.param('hub.verify_token'), req.param('hub.challenge'));
  var verify_token = req.param('hub.verify_token');
  if (verify_token === '12345678' && req.param('hub.challenge')) {
    challange = parseInt(req.param('hub.challenge'));
  }
  var newRes = {
    status: 200,
    body: challange
  };
  console.log('newRes');
  console.log(newRes);
  //res.json(newRes);
  // res.status(200).send(challange);
  res.status(200).send(challange);
});

module.exports = router;