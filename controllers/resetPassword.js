

// importing all the dependencies

const path = require ('path');
const { User } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'User'));
const _ = require ('lodash');
const jwt = require ('jsonwebtoken');
const { validatePassword } = require (path.resolve (__dirname, '..', 'validators', 'validator'));
const bcrypt = require ('bcrypt');
const { config } = require (path.resolve (__dirname, '..', 'config', 'config'));

// defining the resetPassword controller

const resetPassword = (req, res) => {

    try {

        // if no id or token present in the request then throw error
        if (!req.params.id || !req.params.token) {
            throw new Error ('no id or token present in the request parameters');
        }

        // getting the new password value and checking its validity
        const { new_password } = _.pick (req.body, ['new_password']);
        if ((!new_password) || (!validatePassword (new_password))) {
            throw new Error ('new password is not a valid password');
        }

        const _id = req.params.id;
        const token = req.params.token;
        let userdoc = undefined;

        // if the id and the token are present in the request
        // then trying to find the User with the given id

        User.findOne ({
            _id
        }).then ((user) => {

            // if no user found with the given id then throw an error
            if (!user) {
                throw new Error ('User not found with the given id');
            }

            userdoc = user;
            return User.comparePassword (new_password, user.password);

        }).then ((isSameBefore) => {
            if (isSameBefore) { // ensuring the user does not enter the previous password again as it will make the password reset link more usable than 1 time.
                throw new Error ('please enter some other password this password is not secure for you anymore');
            }

            // if the new password is not same as before password
            // then try to decode the token
            // using the combination of user's current password and createdAt's getTime ();

            const secret_key = `${userdoc.password}${userdoc.createdAt.getTime ()}`;
            const decoded_token = jwt.verify (token, secret_key);

            // checking if id in decoded token and the req.params.id should be same
            if (decoded_token._id !== _id) {
                throw new Error ('you are not authorized to reset the password for this user')
            }

            // if it gets verified successfully
            // then proceed to change the password

            return bcrypt.hash (new_password, config.SALT_ROUNDS); // it returns a promise to make a new password hash

        }).then ((hashed_password) => {
            return User.findOneAndUpdate ({
                _id: userdoc._id
            }, {
                $set: {
                    password: hashed_password
                }
            }, { upsert: true, new: true, runValidators: true, context: 'query' });
        }).then ((updated_user) => {
            
            // return the updated user to the client
            return res.status (200).send ({
                status: 'success',
                updated_user
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

// exporting the resetPassword controller

module.exports = {
    resetPassword
}