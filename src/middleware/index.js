module.exports = function () {
  // Add your custom middleware here. Remember, that
  // in Express the order matters
  const app = this; // eslint-disable-line no-unused-vars
  /*
  app.use( (req,res,next) => {
    req.headers.Authorization = req.headers.cookie;
    console.log('middl:', req,res,next)
    next(); 
  });  
  */
};
