// import 

var express  = require ('express');
var userCtrl = require ('./routes/usersCtrl');


// Router

exports.router = (function(){
var  apiRouter = express.Router();



// users routes
apiRouter.route('/users/register/').post(userCtrl.register);
apiRouter.route('/users/login/').post(userCtrl.login);
apiRouter.route('/users/me/').get(userCtrl.getUserProfile);

return apiRouter;
})();