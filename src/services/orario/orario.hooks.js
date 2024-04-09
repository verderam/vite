const { authenticate } = require('feathers-authentication').hooks;

const validate = function(hook){
  //console.log(hook.data);
}

module.exports = {
  before: {
    all: [ authenticate(config.strategies) ],
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
    create: [validate],
    update: [validate],
    patch: [validate],
    remove: [validate]
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
