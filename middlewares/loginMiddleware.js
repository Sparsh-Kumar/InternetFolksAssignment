

// importing all the dependencies

const path = require ('path');
const { User } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'User'));
const jwt = require ('jsonwebtoken');
const { config } = require (path.resolve (__dirname, '..', 'config', 'config'));

// defining the loginMiddleware function

const loginMiddleware = (req, res, next) => {
    
    try {

        // if no x-auth header is present,
        // then throw the error
        if (!req.header ('x-auth')) {
            throw new Error ('no x-auth header is present in the request');
        }

        // getting the access token present in the x-auth
        // header in the request

        const token = req.header ('x-auth');
        const decodedToken = jwt.verify (token, config.ACCESS_TOKEN_SECRET);

        // finding the user having the id of the decoded token

        User.findOne ({
            _id: decodedToken._id
        }).then ((user) => {

            // if there is no user with the id specified in the token
            // then throw an error

            if (!user) {
                throw new Error ('no user exists with this id specified in the x-auth token');
            }

            // other wise if everything remain good
            req.user = user;
            next ();

        }).catch ((error) => {
            return res.status (401).send ({
                status: 'failure',
                message: error.message
            })
        })

    } catch (error) {
        return res.status (401).send ({
            status: 'failure',
            message: error.message
        })
    }

}

// exporting the loginMiddleware

module.exports = {
    loginMiddleware
}