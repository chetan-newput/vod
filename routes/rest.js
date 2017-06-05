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
  console.log("in post rest/app req.body :: ", req.body);
  console.log("req.body.entry[0].messaging ::", req.body.entry[0].messaging);
  var data = req.body;

  if (data.object === 'page') {
    data.entry.forEach(function (entry) {
      console.log("In data.entry.forEach event :: ",entry);
      var pageId = entry.id;
      var timeOfEvent = entry.time;

      entry.messaging.forEach(function (event) {
        if (event.message) {
          console.log("In entry.messaging.forEach event :: ",event);
          // Handle the message
          var accessToken = "EAAGGrMEDRSkBAM19T8OWTyi1NK8FpoVuVZCKbxZCNjiIlbTOaonmiw8x1cBEF3O5shnskhKza3Buyfgr7eoK0rf7fn2ZBZBli3nQYOwJJJlZALkDPWcPZAKTP6E22wEBFh8ZBZA8vZBwgB1hi6Jal7RqPB9p5EUyDMNFfYP4my9zWEgZDZD";
          var options = {
            url: 'https://graph.facebook.com/v2.9/me/messages?access_token=' + accessToken,
            method: 'POST',
            json: {
              "recipient": {
                //1242112299247499
                "id": event.sender.id
              },
              "message": {
                "text": "hello, world1!"
              }
            }
          };

          request(options, function (err, result) {
            //file is a Buffer 
            if (err) {
              console.log("curl error :: ", err);
            }
            console.log("curl result :: ", result);
          });
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    res.sendStatus(200);
  }
});

module.exports = router;