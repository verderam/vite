const { authenticate } = require('feathers-authentication').hooks;

const normalize=function(context){
/*
  var d=context.data
  d.corso=parseInt(d.corso||0)
  d.label=parseInt(d.label||0)
  d.giustifica=parseInt(d.giustifica||0)
*/
}

module.exports = {
  before: {
    all: [authenticate(config.authentication.strategies)],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
