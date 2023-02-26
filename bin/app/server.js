
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const project = require('../../package.json');
const basicAuth = require('../auth/basic_auth_helper');
const jwtAuth = require('../auth/jwt_auth_helper');
const wrapper = require('../helpers/utils/wrapper');
const userHandler = require('../modules/user/handlers/api_handler');
const cartHandler = require('../modules/cart/handlers/api_handler');
const checkoutHandler = require('../modules/checkout/handlers/api_handler');
const mongoConnectionPooling = require('../helpers/databases/mongodb/connection');

function AppServer() {
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version
  });

  this.server.serverKey = '';
  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser());
  this.server.use(restify.plugins.authorizationParser());

  // required for CORS configuration
  const corsConfig = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    // ['*'] -> to expose all header, any type header will be allow to access
    // X-Requested-With,content-type,GET, POST, PUT, PATCH, DELETE, OPTIONS -> header type
    allowHeaders: ['Authorization'],
    exposeHeaders: ['Authorization']
  });
  this.server.pre(corsConfig.preflight);
  this.server.use(corsConfig.actual);

  // // required for basic auth
  this.server.use(basicAuth.init());

  // anonymous can access the end point, place code bellow
  this.server.get('/', (req, res) => {
    wrapper.response(res, 'success', wrapper.data('Index'), 'This service is running properly');
  });

  // user
  this.server.post('/api/users/v1', basicAuth.isAuthenticated, userHandler.postDataLogin);
  this.server.get('/api/users/v1', userHandler.getUser);
  this.server.post('/api/users/v1/register', basicAuth.isAuthenticated, userHandler.registerUser);
  this.server.del('/api/users/v1/:id', userHandler.deleteUser);

  //cart
  this.server.get('/cart', cartHandler.getAllCart);
  this.server.get('/cart/find/:id', cartHandler.getCartById);
  this.server.post('/cart', cartHandler.createCart);
  this.server.put('/cart/:id', cartHandler.updateCart);
  this.server.del('/cart/:id', cartHandler.deleteCart);
  
  //checkout
  this.server.get('/checkout', checkoutHandler.getListCheckout);
  this.server.get('/checkout/find/:id', checkoutHandler.getLIstCheckoutByID);
  this.server.post('/checkout', checkoutHandler.Checkout);
  this.server.del('/checkout/:id', checkoutHandler.deleteCheckout);


  //Initiation
  mongoConnectionPooling.init(); 
}

module.exports = AppServer;
