

// importing all the dependencies

const mongoose = require ('mongoose');
const path = require ('path');
const _ = require ('lodash');
const { registerUsers } = require (path.resolve (__dirname, '..', 'utils', 'registerUsers'));

// defining the registerPrincipal controller

const registerPrincipal = (req, res) => {

    try {

        const { first_name, last_name, email, mobile, password } = _.pick ( req.body, ['first_name', 'last_name', 'email', 'mobile', 'password']);
        
        // if all the fields are valid and user is created successfully
        // then return the created user to the client
        
        registerUsers (first_name, last_name, email, mobile, password, 'principal')
        .then ((created_user) => {
            return res.status (200).send ({
                status: 'success',
                created_user
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

// exporting the registerPrincipal controller

module.exports = {
    registerPrincipal
}