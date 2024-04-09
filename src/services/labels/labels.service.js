// Initializes the `labels` service on path `/labels`
const createService = require('feathers-mongodb');
const hooks = require('./labels.hooks');
const filters = require('./labels.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/labels', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('labels');

  mongoClient.then(db => {
    service.Model = db.collection('labels');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};