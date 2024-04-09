const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');

const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const mongodb = require('./mongodb');

const carbone = require('carbone');
const fs = require('fs');

const authentication = require('./authentication');

const app = feathers();

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

/*
//CARBONE
app.use('/carbone/:report', function (req, res, next) {
  //console.log('Carbone...', req);
  let rp='./public/reports/tpl'
  let ro='./public/reports/out'
  let rn=''
  let fmt='odt'
  switch (true){
    case (req.params.report==='test'):
      rn='test.odt'
      fmt='application/vnd.oasis.opendocument.text'
  }
  //if (!req.body) return
  carbone.render(rp+'/'+rn, req.body, function(err, result){
    if (err) {
      return console.log(err);
    }
    fs.writeFileSync(ro+'/'+rn, result)
    res.download(ro+'/'+rn);

    //res.setHeader('Content-disposition', 'inline; filename='+rn)
    //res.set('Content-Type', fmt)
    //res.status(200).send(result).end()

  });
  end();
});
*/
// Host the public folder
app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
app.configure(mongodb);
app.configure(rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(handler());

app.hooks(appHooks);

//VS CARBONE test
/*
app.get('/carbone',function(req, res) {
    let rp='./public/reports/tpl'
    let ro='./public/reports/out'
    let rn=''
    switch (true){
      case (req.id==='test'):
        rn='test.odt'
    }
    if (!req.data) return
    carbone.render(rp+'/'+rn, req.data, function(err, result){
      if (err) {
        return console.log(err);
      }
      //fs.writeFileSync(ro+'/'+rn, result)
      res.download(result);
    });
  });

*/

module.exports = app;
