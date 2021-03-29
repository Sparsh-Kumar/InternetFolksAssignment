

// importing all the dependencies

const path = require ('path');
const mongoose = require ('mongoose');
const { User } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'User'));
const { config } = require (path.resolve (__dirname, '..', 'config', 'config'));
const jwt = require ('jsonwebtoken');


// defining the refreshToken controller

const refreshToken = (req, res) => {

    try {
        
        // if no refresh token is present
        // in the request, then throwing the error

        if (!req.params.refresh_token) {
            throw new Error ('no refresh token is present');
        }

        // getting the refresh token and decoding the refresh token

        const token = req.params.refresh_token;
        const decodedToken = jwt.verify (token, config.REFRESH_TOKEN_SECRET);

        // finding the user specified in the id of the decoded token
        User.findOne ({
            _id: decodedToken._id
        }).then ((user) => {
            
            // if the user with the given id is not found
            // then throw error

            if (!user) {
                throw new Error ('the user with this id does not exists anymore');
            }

            // if the user exists
            // then generating the new access token

            const access_token = jwt.sign ({
                _id: user._id
            }, config.ACCESS_TOKEN_SECRET, { expiresIn: 240 });

            // returning the access token and refresh tokens to the client

            return res.status (200).send ({
                status: 'success',
                access_token,
                refresh_token: token
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

// exporting the refreshToken controller

module.exports = {
    refreshToken
}