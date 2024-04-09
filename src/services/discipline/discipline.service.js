// Initializes the `discipline` service on path `/discipline`
const createService = require('feathers-mongodb');
const hooks = require('./discipline.hooks');
const filters = require('./discipline.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/discipline', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('discipline');

  mongoClient.then(db => {
    service.Model = db.collection('discipline');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
