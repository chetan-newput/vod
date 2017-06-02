// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        //'clientID'      : '1462840080458882', // your App ID
        'clientID': '429551507424553',
        'clientSecret'  : '4579c94107332762a91e5abb9c27381e', // your App Secret
        'callbackURL'   : '/facebook-connect'
    }
};