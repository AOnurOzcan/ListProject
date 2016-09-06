// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    'facebookAuth' : {
        'clientID'        : '1002437523209057', // your App ID
        'clientSecret'    : '7418a4b0ec2ada040632dbae58d0e3c1', // your App Secret
        'callbackURL'     : 'http://localhost:3000/auth/facebook/callback'
    }
};
