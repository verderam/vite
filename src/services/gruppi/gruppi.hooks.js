const { authenticate } = require('feathers-authentication').hooks;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    all: [ authenticate(config.authentication.strategies) ],
    all: [ authenticate(config.authentication.strategies) ],
    all: [ authenticate(config.authentication.strategies) ],
    all: [ authenticate(config.authentication.strategies) ],
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
