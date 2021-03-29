

// importing all the dependencies

const RouteHandler = require ('express').Router ();
const path = require ('path');

// importing the registration controllers for various roles

const { registerAdmin } = require (path.resolve (__dirname, '..',  'controllers', 'registerAdmin'));
const { registerStudent } = require (path.resolve (__dirname, '..', 'controllers', 'registerStudent'));
const { registerPrincipal } = require (path.resolve (__dirname, '..', 'controllers', 'registerPrincipal'));

// importing the sign in controller

const { signin } = require (path.resolve (__dirname, '..', 'controllers', 'signin'));

// defining the register route for admin, student and principal

RouteHandler.post ('/signup/admin', registerAdmin);
RouteHandler.post ('/signup/student', registerStudent);
RouteHandler.post ('/signup/principal', registerPrincipal);

// defining the common login route for admin, student and principal

RouteHandler.post ('/signin', signin);

// exporting the RouteHandler
module.exports = {
    RouteHandler
}