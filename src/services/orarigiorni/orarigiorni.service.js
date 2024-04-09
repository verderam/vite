const createService = require('feathers-mongodb');
const hooks = require('./orarigiorni.hooks');
const filters = require('./orarigiorni.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  app.use('/orarigiorni', createService(options));

  const service = app.service('orarigiorni');

  mongoClient.then(db => {
    service.Model = db.collection('orarigiorni');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
