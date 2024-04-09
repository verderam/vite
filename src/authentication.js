const authentication = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');
const ldap = require('feathers-authentication-ldap');


module.exports = function () {
  const app = this;
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(ldap());  
  app.configure(local(config.local));
/**/
  const getLoginData=function(rsp){
    console.log('loginData: ',rsp)
  }

  app.on('login',getLoginData)

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate('jwt')
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    },
    after: {
      create: [
        context => {
          //console.log('context...:', context.data)
          app.set('username',context.data.username && context.data.username.toLowerCase())
          //console.log(app.get('username'),' ha effettuato il login.')
        }
      ]
    }
  });
};
