const { authenticate } = require('feathers-authentication').hooks;

const normalize=function(context){
  var d=context.data
  d.ora=parseInt(d.ora)
}
const preDel=function(context){
  if (!context.id) throw new Error('ID non specificato.')
}

module.exports = {
  before: {
    all: [authenticate('config.strategies')],
    find: [],
    get: [],
    patch: [  ],
    create: [ normalize ],
    update: [normalize ],
    remove: [preDel]
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
