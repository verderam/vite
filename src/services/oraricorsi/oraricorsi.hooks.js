const { authenticate } = require('feathers-authentication').hooks;

const normalize=function(context){
  var d=context.data
  //console.log('normalize', d)
  d.ora=parseInt(d.ora)
  d.ordine=parseInt(d.ordine)
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    patch: [  ],
    create: [ normalize ],
    update: [normalize ],
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
