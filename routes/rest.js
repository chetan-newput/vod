var express = require('express');
var router = express.Router();
var curl = require('curlrequest');

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
    req.params, "res.body :: ", JSON.parse(req.body), "req.query :: ", req.query);
  var accessToken = "EAAGGrMEDRSkBAM19T8OWTyi1NK8FpoVuVZCKbxZCNjiIlbTOaonmiw8x1cBEF3O5shnskhKza3Buyfgr7eoK0rf7fn2ZBZBli3nQYOwJJJlZALkDPWcPZAKTP6E22wEBFh8ZBZA8vZBwgB1hi6Jal7RqPB9p5EUyDMNFfYP4my9zWEgZDZD";
  var options = {
    url: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + accessToken,
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    data:{
            "recipient":{
                "id":"10209972083680707"
            },
            "message":{
                "text":"hello, world!"
            }
          },
    encoding: null
  };

  curl.request(options, function (err, result) {
    //file is a Buffer 
    if(err){
      console.log("curl error :: ",err);
      //res.status('500').json({error : err});
    }
    console.log("curl result :: ",result);
  });
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