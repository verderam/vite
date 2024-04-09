const { authenticate } = require('feathers-authentication').hooks;

const normalize=function(context){
  var d=context.data
  d.corso=parseInt(d.corso||0)
  d.label=parseInt(d.label||0)
  d.giustifica=parseInt(d.giustifica||0)
}
const preDel=function(context){
  if (!context.id) throw new Error('ID non specificato.')
}


module.exports = {
  before: {
    all: [authenticate(config.strategies)],
    find: [],
    get: [],
    create: [normalize],
    update: [normalize],
    patch: [],
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
