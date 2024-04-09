// Initializes the `rubrica` service on path `/rubrica`
const createService = require('feathers-mongodb');
const hooks = require('./rubrica.hooks');
const filters = require('./rubrica.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/rubrica', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('rubrica');

  mongoClient.then(db => {
    service.Model = db.collection('rubrica');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
