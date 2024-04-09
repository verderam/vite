// Initializes the `corsi` service on path `/corsi`
const createService = require('feathers-mongodb');
const hooks = require('./corsi.hooks');
const filters = require('./corsi.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/corsi', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('corsi');

  mongoClient.then(db => {
    service.Model = db.collection('corsi');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
