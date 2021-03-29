

// importing all the dependencies

const RouteHandler = require ('express').Router ();
const path = require ('path');

// importing the registration controllers for various roles

const { registerAdmin } = require (path.resolve (__dirname, '..',  'controllers', 'registerAdmin'));
const { registerStudent } = require (path.resolve (__dirname, '..', 'controllers', 'registerStudent'));
const { registerPrincipal } = require (path.resolve (__dirname, '..', 'controllers', 'registerPrincipal'));
const { signin } = require (path.resolve (__dirname, '..', 'controllers', 'signin')); // importing the sign in controller
const { refreshToken } = require (path.resolve (__dirname, '..', 'controllers', 'refreshToken')); // importing the refreshToken controller
const { loginMiddleware } = require (path.resolve (__dirname, '..', 'middlewares', 'loginMiddleware')); // importing the login Middleware to check for authenticity
const { getSingle } = require (path.resolve (__dirname, '..', 'controllers', 'getSingle')); // importing the getSingle controller to get the account details of a particulat user (but no confidential details such as passwords).

// defining the register route for admin, student and principal

RouteHandler.post ('/signup/admin', registerAdmin);
RouteHandler.post ('/signup/student', registerStudent);
RouteHandler.post ('/signup/principal', registerPrincipal);
RouteHandler.post ('/signin', signin); // defining the common login route for admin, student and principal
RouteHandler.get ('/refreshtoken/:refresh_token', refreshToken) // defining the route for refreshing the access_tokens making use of refresh tokens

// defining all the dashboard routes, these all api endpoints need authentication and scopes for permission
RouteHandler.get ('/dashboard/getsingle/:userId', loginMiddleware, getSingle); // add checkscopePermission middleware after loginMiddleware



// exporting the RouteHandler
module.exports = {
    RouteHandler
}