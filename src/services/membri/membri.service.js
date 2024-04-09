// Initializes the `membri` service on path `/membri`
const createService = require('feathers-mongodb');
const hooks = require('./membri.hooks');
const filters = require('./membri.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/membri', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('membri');

  mongoClient.then(db => {
    service.Model = db.collection('membri');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
