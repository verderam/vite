const createService = require('./reports.class.js');
const hooks = require('./reports.hooks');
const filters = require('./reports.filters');


module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'reports',
    paginate
  };

  app.use('/reports', createService(options), function(req,res){

    //console.log('reports REQ RES: ',req,res)
  });
  const service = app.service('reports');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
