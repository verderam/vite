// Initializes the `conf` service on path `/conf`
const createService = require('./conf.class.js');
const hooks = require('./conf.hooks');
const filters = require('./conf.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'conf',
    paginate,
    ver: app.get('ver'),
    admins: app.get('admins'),
    directors: app.get('directors'),
    username: app.get('username'),
    user: app.get('username'),
    domain: app.get('domain'),
    prefix: app.get('prefix'),
    slogan: app.get('slogan'),
    booking: app.get('booking'),
    reportUrl: app.get('reportUrl')
  };

  // Initialize our service with any options it requires
  app.use('/conf', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('conf');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
