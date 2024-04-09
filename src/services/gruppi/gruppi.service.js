// Initializes the `gruppi` service on path `/gruppi`
const createService = require('feathers-mongodb');
const hooks = require('./gruppi.hooks');
const filters = require('./gruppi.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/gruppi', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('gruppi');

  mongoClient.then(db => {
    service.Model = db.collection('gruppi');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
