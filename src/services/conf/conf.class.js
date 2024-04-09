/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  find (params) {
    return Promise.resolve([{ver:this.options.ver}]);
  }

  get (id, params) {
    //console.log('GET: ',id, params)
    return Promise.resolve({_id:this.options[id]});
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
