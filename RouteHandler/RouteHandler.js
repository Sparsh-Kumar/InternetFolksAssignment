

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
const { getList } = require (path.resolve (__dirname, '..', 'controllers', 'getList')); // importing the getList controller to get the account details of all users (but no confidential information such as passwords).
const { checkRole } = require (path.resolve (__dirname, '..', 'middlewares', 'checkRole')); // importing the checkRole middleware to check for route accessing permissions
const { checkScope } = require (path.resolve (__dirname, '..', 'middlewares', 'checkScope')); // importing the checkScope middleware to check for operation permissions
const { profileCreate } = require (path.resolve (__dirname, '..', 'controllers', 'profileCreate')); // importing the profile create controller for creating profile of a logged in user
const { getAllSchools } = require (path.resolve (__dirname, '..', 'controllers', 'getAllSchools')); // importing the getAllSchools controller for getting a list of all schools 
const { removeAccount } = require (path.resolve (__dirname, '..', 'controllers', 'removeAccount')); // importing the removeAccount controller for removing a account of any role permanently from database
const { getAllProfiles } = require (path.resolve (__dirname, '..', 'controllers', 'getAllProfiles')); // importing the getAllProfiles controller for getting all the profiles
const { createSchool } = require (path.resolve (__dirname, '..', 'controllers', 'createSchool')); // importing the createSchool controller for creating schools, only principal can create schools
const { getAllStudents } = require (path.resolve (__dirname, '..', 'controllers', 'getAllStudents')); // importing the getAllStudents controller for getting students in a particular school using schoolId

// defining the register route for admin, student and principal

RouteHandler.post ('/signup/admin', registerAdmin);
RouteHandler.post ('/signup/student', registerStudent);
RouteHandler.post ('/signup/principal', registerPrincipal);
RouteHandler.post ('/signin', signin); // defining the common login route for admin, student and principal
RouteHandler.get ('/refreshtoken/:refresh_token', refreshToken); // defining the route for refreshing the access_tokens making use of refresh tokens
RouteHandler.patch ('/forgotpassword', forgotPassword); // defining the route for forgot password
RouteHandler.patch ('/resetpassword/:id/:token', resetPassword); // defining the route for resetting the password with new password

// defining all the dashboard routes, these all api endpoints need authentication and scopes for permission
// getting a single user info (but no confidential info)
// admin, student and principal role are allowed to access this endpoint

RouteHandler.get ('/dashboard/getsingle/:userId', loginMiddleware, checkRole (['admin', 'student', 'principal']), checkScope ('user-get'), getSingle); // add checkScope middleware after loginMiddleware

// getting all users info (but no confidential info)
// admin, student and principal role are allowed to access this endpoint

RouteHandler.get ('/dashboard/getuserslist', loginMiddleware, checkRole (['admin', 'student', 'principal']), checkScope ('user-get'), getList); // added checkScope middleware after loginMiddleware


// route for making Profile of a user, a logged in user can make its profile only, no other user can make someone else's profile
// only student role can make their profiles

RouteHandler.post ('/dashboard/profilecreate', loginMiddleware, checkRole (['student']), checkScope ('profile-create'), profileCreate); // this is the endpoint for creating profile of a logged in user only

// route for getting a list of all schools 
// anyone admin, principal or student can make this request

RouteHandler.get ('/dashboard/getallschools', loginMiddleware, checkRole (['admin', 'student', 'principal']), checkScope ('school-get'), getAllSchools); // this is the endpoint for getting all the Schools

// route for getting all the profiles 
// anyone admin, principal can make this request
// as there is no need for the students to see other student's profiles

RouteHandler.get ('/dashboard/getallprofiles', loginMiddleware, checkRole (['admin', 'principal']), checkScope ('profile-get'), getAllProfiles); // this is the endpoint for getting all profiles


// route for removing your own account
// anyone admin, student, principal can remove their accounts

RouteHandler.delete ('/dashboard/removeaccount', loginMiddleware, checkRole (['student', 'admin', 'principal']), checkScope ('user-remove'), removeAccount); // this is the api endpoint for removing the account associated

// route for creating a school document
// only principal can create school documents

RouteHandler.post ('/dashboard/createschool', loginMiddleware, checkRole (['principal']), checkScope ('school-create'), createSchool); // this is the api endpoint for creating schools, only principal role can create school

// route for getting students in a particular school
// only principal can get students in a particular school

RouteHandler.get ('/dashboard/getallstudents/:schoolId', loginMiddleware, checkRole (['principal']), checkScope ('school-get'), getAllStudents) // this is the api endpoint for getting all students in a particular school

// exporting the RouteHandler
module.exports = {
    RouteHandler
}