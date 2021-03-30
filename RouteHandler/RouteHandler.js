

// importing all the dependencies

const RouteHandler = require ('express').Router ();
const path = require ('path');

// importing the registration controllers for various roles

const { registerAdmin } = require (path.resolve (__dirname, '..',  'controllers', 'registerAdmin'));
const { registerStudent } = require (path.resolve (__dirname, '..', 'controllers', 'registerStudent'));
const { registerPrincipal } = require (path.resolve (__dirname, '..', 'controllers', 'registerPrincipal'));
const { signin } = require (path.resolve (__dirname, '..', 'controllers', 'signin')); // importing the sign in controller
const { refreshToken } = require (path.resolve (__dirname, '..', 'controllers', 'refreshToken')); // importing the refreshToken controller
const { forgotPassword } = require (path.resolve (__dirname, '..', 'controllers', 'forgotPassword')); // importing the forgotPassword controller
const { resetPassword } = require (path.resolve (__dirname, '..', 'controllers', 'resetPassword')); // importing the resetPassword controller
const { loginMiddleware } = require (path.resolve (__dirname, '..', 'middlewares', 'loginMiddleware')); // importing the login Middleware to check for authenticity
const { getSingle } = require (path.resolve (__dirname, '..', 'controllers', 'getSingle')); // importing the getSingle controller to get the account details of a particulat user (but no confidential details such as passwords).
const { checkRole } = require (path.resolve (__dirname, '..', 'middlewares', 'checkRole')); // importing the checkRole middleware to check for route accessing permissions
const { checkScope } = require (path.resolve (__dirname, '..', 'middlewares', 'checkScope')); // importing the checkScope middleware to check for operation permissions

// defining the register route for admin, student and principal

RouteHandler.post ('/signup/admin', registerAdmin);
RouteHandler.post ('/signup/student', registerStudent);
RouteHandler.post ('/signup/principal', registerPrincipal);
RouteHandler.post ('/signin', signin); // defining the common login route for admin, student and principal
RouteHandler.get ('/refreshtoken/:refresh_token', refreshToken); // defining the route for refreshing the access_tokens making use of refresh tokens
RouteHandler.patch ('/forgotpassword', forgotPassword); // defining the route for forgot password
RouteHandler.patch ('/resetpassword/:id/:token', resetPassword); // defining the route for resetting the password with new password

// defining all the dashboard routes, these all api endpoints need authentication and scopes for permission
RouteHandler.get ('/dashboard/getsingle/:userId', loginMiddleware, checkRole (['admin', 'student', 'principal']), checkScope ('user-get'), getSingle); // add checkscopePermission middleware after loginMiddleware



// exporting the RouteHandler
module.exports = {
    RouteHandler
}