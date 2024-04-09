const { authenticate } = require('feathers-authentication').hooks;

const validate = function(hook){
  if (!hook.data.username) throw new Error('Specificare un nome utente univoco')
}
const isAdmin =function(hook){
  const user = hook.app.get('username')
  if (!user) throw new Error('Operazione non consentita.')
  if (user && hook.app.settings && hook.app.settings.admins){
    retVal=hook.app.settings.admins.indexOf(user)+1
    if (!retVal) throw new Error('Utente non autorizzato.')
  }
}
const preDel=function(context){
  if (!context.id) throw new Error('ID non specificato.')  
}
module.exports = {
  before: {
    all: [ authenticate('config.strategies') ],
    find: [],
    get: [],
    create: [isAdmin,validate],
    update: [isAdmin,validate],
    patch: [isAdmin,validate],
    remove: [isAdmin,preDel]
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
