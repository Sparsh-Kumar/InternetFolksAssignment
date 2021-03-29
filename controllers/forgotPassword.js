

// importing all the dependencies

const path = require ('path');
const _ = require ('lodash');
const { mailer } = require (path.resolve (__dirname, '..', 'mailer', 'mailer'));
const jwt = require ('jsonwebtoken');
const { validateEmail, validatePassword } = require (path.resolve (__dirname, '..', 'validators', 'validator'));
const { config } = require (path.resolve (__dirname, '..', 'config', 'config'));
const { User } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'User'));


// defining the forgotPassword controller

const forgotPassword = (req, res) => {

    try {

        // getting the email from the request body
        // and validate it

        const { email } = _.pick (req.body, ['email']);
        if (!email) {
            throw new Error ('Please enter your account email for password reset');
        } else if (!validateEmail (email)) {
            throw new Error ('Email entered is not of proper format');
        }

        let port = process.env.PORT || config.PORT;

        // finding the user with the given email address
        User.findOne ({
            email
        }).then ((foundUser) => {
            
            // if no user found with this email
            // then throw an Error

            if (!foundUser) {
                throw new Error ('User with the specified email address does not exists');
            }

            // else if everything is good
            // then generate a token and sent to the email address specified

            // NOTE - IN ORDER FOR PROPER AND SECURE PASSWORD RESET
            // WE HAVE TO MAKE THE PASSWORD RESET LINK ONLY 1 TIME USABLE
            // SECURE WAY TO DO PASSWORD RESET IS

            let secret_key = `${foundUser.password}${foundUser.createdAt.getTime ()}`;
            let reset_token = jwt.sign ({
                _id: foundUser._id
            }, secret_key, { expiresIn: 240 }) // expiring the token in 240 seconds or 4 mins.

            // send mail to the user
            return mailer (config.SENDER_USER, email, 'Request for password reset (BY SPARSH KUMAR)', 'Reset your password by clicking on the link below (BY SPARSH KUMAR)', `<p>Reset your password Click here <a href='${config.PROJECT_URL}:${port}/api/resetpassword/${foundUser._id}/${reset_token}'>Reset Password</a></p>`);

        }).then ((data) => {

            // return the data returned by the mailer
            return res.status (200).send ({
                status: 'success',
                data
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

// exporting the forgotPassword controller

module.exports = {
    forgotPassword
}