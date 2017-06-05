var request = require('request');

var webhookConfig = require('../config/webhook_config');

var restController = {
  verifyToken: verifyToken,
  handleMessageResponse: handleMessageResponse,
  handleEventRequest: handleEventRequest,
};

function verifyToken(req, res, next) {
  console.log("in rest/app req.params :: ",
    req.param('hub.verify_token'), req.param('hub.challenge'));
  var verify_token = req.param('hub.verify_token');
  if (verify_token === webhookConfig.verifyToken && req.param('hub.challenge')) {
    res.status(200).send(req.param('hub.challenge'));
  } else {
    res.sendStatus(400);
  }
}

function handleMessageResponse(messageData) {
  console.log('handlemessageResponse :: ', messageData);
  var options = {
    url: 'https://graph.facebook.com/v2.9/me/messages?access_token=' + webhookConfig.accessToken,
    method: 'POST',
    json: messageData
  };

  request(options, function (err, result) {
    if (err) {
      console.log("curl error :: ", err);
    }
    //console.log("curl result :: ", result);
  });
};


function handleEventRequest(req, res, next) {
  console.log("in post rest/app req.body :: ", req.body);
  console.log("req.body.entry[0].messaging ::", req.body.entry[0].messaging);
  var data = req.body;
  var messageData;

  if (data.object === 'page') {

    data.entry.forEach(function (entry) {
      console.log("In data.entry.forEach event :: ", entry);
      var pageId = entry.id;
      var timeOfEvent = entry.time;

      entry.messaging.forEach(function (event) {

        console.log("In entry.messaging.forEach event :: ", event);
        if (event.message) {
          var messageBody = "";

          if(event.message.text){
            messageBody = event.message.text;
          }
          
          if(event.message.attachments){
            event.message.attachments.forEach(function (attachment) {
              console.log('event.attachments :: ',attachment); 
              if(attachment.type == 'image'){
                if(attachment.payload.sticker_id){
                  messageBody = "Sorry currently we are not serving stickers! :(";
                } else {
                  messageBody = "Sorry currently we are not serving images! :(";
                }
                
              } else if(attachment.type == 'audio'){
                messageBody = "Sorry currently we are not serving audio! :(";
              } else if(attachment.type == 'video'){
                messageBody = "Sorry currently we are not serving vedio! :(";
              }
            });
            
          }

          messageData = {
            "recipient": {
              //1242112299247499
              "id": event.sender.id
            },
            "message": {
              "text": messageBody
            }
          };
          restController.handleMessageResponse(messageData);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });
    res.sendStatus(200);
  }
};



module.exports = restController;