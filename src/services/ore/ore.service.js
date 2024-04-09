// Initializes the `ore` service on path `/ore`
const createService = require('feathers-mongodb');
const hooks = require('./ore.hooks');
const filters = require('./ore.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/ore', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('ore');

  mongoClient.then(db => {
    service.Model = db.collection('ore');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
