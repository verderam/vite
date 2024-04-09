const { authenticate } = require('feathers-authentication').hooks;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    all: [ authenticate(config.strategies) ],
    all: [ authenticate(config.strategies) ],
    all: [ authenticate(config.strategies) ],
    all: [ authenticate(config.strategies) ],
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
