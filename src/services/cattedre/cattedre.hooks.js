const { authenticate } = require('feathers-authentication').hooks;
const validate = function(hook){
  //console.log('validate',hook,'data: ',hook.data)
  if (!hook.data.username) throw new Error('Specificare il docente')
  if (!hook.data.anno) throw new Error('Specificare l\'anno')
  if (!hook.data.corsobreve) throw new Error('Specificare il corso')
  if (!hook.data.disciplinabreve) throw new Error('Specificare la disciplina')
  hook.data.ore=parseInt(hook.data.ore||0)
}
const isAdmin =function(hook){
  //console.info('cattedre-hook: ',hook)
  //const user = hook && hook.params && hook.params.payload && hook.params.payload.username
  const user = hook.app.get('username')
  //console.info('user: ',user)
  if (!user) throw new Error('Operazione non consentita.')
  if (user && hook.app.settings && hook.app.settings.admins){
    //app.get('admin').then(e => console.log('admin',e))
    retVal=hook.app.settings.admins.indexOf(user)+1
    //console.info('admin: ',retVal)
    if (!retVal) throw new Error('Utente non autorizzato.')
  }
}
const preDel=function(context){
  if (!context.id) throw new Error('ID non specificato.')
}

module.exports = {
  before: {
    all: [authenticate('jwt') ],
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
