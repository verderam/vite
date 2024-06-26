// Initializes the `sedi` service on path `/sedi`
const createService = require('feathers-mongodb');
const hooks = require('./sedi.hooks');
const filters = require('./sedi.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/sedi', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('sedi');

  mongoClient.then(db => {
    service.Model = db.collection('sedi');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
