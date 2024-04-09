// Initializes the `descrizioni` service on path `/descrizioni`
const createService = require('feathers-mongodb');
const hooks = require('./descrizioni.hooks');
const filters = require('./descrizioni.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/descrizioni', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('descrizioni');

  mongoClient.then(db => {
    service.Model = db.collection('descrizioni');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
