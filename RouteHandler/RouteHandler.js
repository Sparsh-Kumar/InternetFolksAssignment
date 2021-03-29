

// importing all the dependencies

const RouteHandler = require ('express').Router ();
const path = require ('path');

// importing the registration controllers for various roles

const { registerAdmin } = require (path.resolve (__dirname, '..',  'controllers', 'registerAdmin'));
const { registerStudent } = require (path.resolve (__dirname, '..', 'controllers', 'registerStudent'));
const { registerPrincipal } = require (path.resolve (__dirname, '..', 'controllers', 'registerPrincipal'));

// defining the register route for admin, student and principal

RouteHandler.post ('/register/admin', registerAdmin);
RouteHandler.post ('/register/student', registerStudent);
RouteHandler.post ('/register/principal', registerPrincipal);


// exporting the RouteHandler
module.exports = {
    RouteHandler
}