const fs = require('fs');
const carbone = require('carbone');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  get (id, params) {
    let rp='./public/reports/tpl'
    let ro='./public/reports/out'
    let rn=''
    switch (true){
      case (id==='test'):
        rn='test.odt'
    }
    if (!params.query) return
    var data=null
    carbone.render(rp+'/'+rn, params.query, function(err, result){
      if (err) {
        //console.log(err);
        return Promise.reject({error:err});
      }
      //fs.writeFileSync(ro+'/'+rn, result)
      //console.log('result: ',result)
      return Promise.resolve(result)
    });
    //return Promise.resolve({name:ro+'/'+rn})
  }
  
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
