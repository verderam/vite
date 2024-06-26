// Initializes the `cattedre` service on path `/cattedre`
const createService = require('feathers-mongodb');
const hooks = require('./cattedre.hooks');
const filters = require('./cattedre.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/cattedre', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('cattedre');

  mongoClient.then(db => {
    service.Model = db.collection('cattedre');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
