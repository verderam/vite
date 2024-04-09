// Initializes the `orari` service on path `/orari`
const createService = require('feathers-mongodb');
const hooks = require('./orari.hooks');
const filters = require('./orari.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/orari', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('orari');

  mongoClient.then(db => {
    service.Model = db.collection('orari');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
