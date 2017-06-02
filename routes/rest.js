var express = require('express');
var router = express.Router();
var curl = require('curlrequest');
var request = require('request');

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
  console.log("in post rest/app req.params :: ",
    req.params, "res.body :: ", req.body, "req.query :: ", req.query);
  console.log(req.body.entry[0]);
  console.log('messaging');
  console.log(req.body.entry[0].messaging);
  // var msgBody = JSON.parse(req.body);
  // var newJson = msgBody.entry[0].messaging;
  // console.log(msgBody.entry[0].messaging);
  // console.log(JSON.parse(msgBody.entry[0].messaging));
  var accessToken = "EAAGGrMEDRSkBAM19T8OWTyi1NK8FpoVuVZCKbxZCNjiIlbTOaonmiw8x1cBEF3O5shnskhKza3Buyfgr7eoK0rf7fn2ZBZBli3nQYOwJJJlZALkDPWcPZAKTP6E22wEBFh8ZBZA8vZBwgB1hi6Jal7RqPB9p5EUyDMNFfYP4my9zWEgZDZD";
  var options = {
    url: 'https://graph.facebook.com/v2.9/me/messages?access_token=' + accessToken,
    method: 'POST',
    // headers: {
    //   "Content-Type": "application/json"
    // },
    json: {
            "recipient":{
                "id":"1242112299247499"
            },
            "message":{
                "text":"hello, world!"
            }
          }
  };

  request(options, function (err, result) {
    //file is a Buffer 
    if(err){
      console.log("curl error :: ",err);
      //res.status('500').json({error : err});
    }
    console.log("curl result :: ",result);
    res.sendStatus(200);
  });
  // req.param('hub.verify_token'), req.param('hub.challenge'));
  // var verify_token = req.param('hub.verify_token');
  // if (verify_token === '12345678' && req.param('hub.challenge')) {
  //   res.send(req.param('hub.challenge'));
  // } else {
  //   res.sendStatus(400);
  // }
  //res.send("test");
});

module.exports = router;