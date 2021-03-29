

// importing all the dependencies

const path = require ('path');
const { User } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'User'));
const jwt = require ('jsonwebtoken');
const _ = require ('lodash');
const { validateEmail, validatePassword, validateRole } = require (path.resolve (__dirname, '..', 'validators', 'validator'));
const { config } = require (path.resolve (__dirname, '..', 'config', 'config'));

// defining the signin controller

const signin = (req, res) => {

    try {
        const { email, password, role } = _.pick (req.body, ['email', 'password', 'role']);
        
        // if the values that are passed in are not valid, then throw an error
        if ((!validateEmail (email)) || (!validatePassword (password)) || (!validateRole (role))) {
            throw new Error ('please enter your data in correct format');
        }

        // if the values passed in are correct
        // then find the doc with the specified email

        let foundUser = undefined;

        User.findOne ({
            email
        }).populate ('roleId').exec ().then ((found_user) => {
            
            // if no user found with the email address
            // then throw error

            if (!found_user) {
                throw new Error ('no user exists with this email address');
            }

            foundUser = found_user;
            return User.comparePassword (password, foundUser.password); // it will return a promise 

        }).then ((isValid) => {

            // if the password hash match fails, then throw an error
            if (!isValid) {
                throw new Error ('the password entered is invalid');
            }

            // if the password match succeed then check the role with which the user is logging in
            // and the role of that user in the database should be same

            if ((!foundUser.roleId) || (foundUser.roleId.name !== role)) {
                throw new Error ('the role given by the user is incorrect');
            }

            // if everything goes well then generate access token and refresh token
            // and send them to client

            const access_token = jwt.sign ({
                _id: foundUser._id
            }, config.ACCESS_TOKEN_SECRET, { expiresIn: 240 }); // expiring the access token in 240 seconds or 4 mins

            const refresh_token = jwt.sign ({
                _id: foundUser._id
            }, config.REFRESH_TOKEN_SECRET) // generating a never expiring refresh token, that will be used to get new access token when previous access token expires

            // returning the access token and refresh token to the client

            return res.status (200).send ({
                status: 'success',
                access_token,
                refresh_token
            })

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

// exporting the signin controller

module.exports = {
    signin
}