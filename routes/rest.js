var express = require('express');
var router = express.Router();

router.get('/app', function (req, res, next) {
  console.log("in rest/app req.params :: ",
  req.param('hub.verify_token'), req.param('hub.challenge'));
  var verify_token = req.param('hub.verify_token');
  if (verify_token === '12345678' && req.param('hub.challenge')) {
    res.send(req.param('hub.challenge'));
  } else {
    res.sendStatus(400);
  }
});

router.post('/app', function (req, res, next) {
  console.log("in rest/app req.params :: ");
  console.log(req);
  // EAAGGrMEDRSkBAM19T8OWTyi1NK8FpoVuVZCKbxZCNjiIlbTOaonmiw8x1cBEF3O5shnskhKza3Buyfgr7eoK0rf7fn2ZBZBli3nQYOwJJJlZALkDPWcPZAKTP6E22wEBFh8ZBZA8vZBwgB1hi6Jal7RqPB9p5EUyDMNFfYP4my9zWEgZDZD

  // req.param('hub.verify_token'), req.param('hub.challenge'));
  // var verify_token = req.param('hub.verify_token');
  // if (verify_token === '12345678' && req.param('hub.challenge')) {
  //   res.send(req.param('hub.challenge'));
  // } else {
  //   res.sendStatus(400);
  // }
  // res.send("test");
});

module.exports = router;