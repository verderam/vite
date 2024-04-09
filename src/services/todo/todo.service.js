// Initializes the `todo` service on path `/todo`
const createService = require('feathers-mongodb');
const hooks = require('./todo.hooks');
const filters = require('./todo.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/todo', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('todo');

  mongoClient.then(db => {
    service.Model = db.collection('todo');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
