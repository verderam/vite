const { authenticate } = require('feathers-authentication').hooks;
const isAdmin =function(hook){
  //console.info('cattedre-hook: ',hook)
  //const user = hook && hook.params && hook.params.payload && hook.params.payload.username
  //console.info('orari hook: ', hook)
  //var user = hook.app.get('username')
  var user = hook.app.settings.username
  user = user && user.toLowerCase()
  
  if (user && hook.app.settings && hook.app.settings.admins){
    retVal=hook.app.settings.admins.indexOf(user)+1
    return retVal
  }
  if (!user) {
    console.log('orari - user: ',user)
    console.log('HOOK: ',hook)
    throw new Error('Operazione non consentita. Utente disconnesso')
  }
  return hook
}
const validate = function(hook){
  var cd=new Date() //current date
  var dy=cd.getDate() //current day 
  var cm=cd.getMonth() //current month
  var nd= new Date(hook.data.giorno) //date to be inserted
  var nm=nd.getMonth(); //month to be inserted
  //console.log(nm,cm);
  if (! isAdmin(hook)) {
    //console.info('non admin')
    //console.info('NON ADMIN - nm: ',nm,' cm: ',cm, nm!=cm)
      if (nm!=cm){
        //console.info('mese differente')
        if (dy>5 ) {
          if ((cm-nm)>1 || (cm!=0 && nm!=11)){
            
            throw new Error('Elemento non modificabile!'+cm+' - '+nm) 
          }
        }
      }    
  }
  return hook
}
const preDel=function(context){
  if (!context.id && (!isAdmin(hook))) throw new Error('ID non specificato.')
}
module.exports = {
  before: {
    all: [ authenticate(config.strategies) ],
    find: [],
    get: [],
    create: [validate],
    update: [],
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
