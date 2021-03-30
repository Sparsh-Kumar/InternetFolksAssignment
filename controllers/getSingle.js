

// importing all the dependencies

const path = require ('path');
const { User } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'User'));


// defining the getSingle controller

const getSingle = (req, res) => {

    try {

        // if there is no user Id present in the request
        // then throw Error

        if (!req.params.userId) {
            throw new Error ('no user Id is specified in the request');
        }

        // else return the User with the given specified id
        User.findOne ({
            _id: req.params.userId
        }, {
            first_name: 1,
            last_name: 1,
            email: 1,
            mobile: 1,
            roleId: 1
        }).then ((foundUser) => {

            // if no user is found with the given id
            // then throwing the error

            if (!foundUser) {
                throw new Error ('no user found with the given id');
            }

            // else return the foundUser
            return res.status (200).send ({
                status: 'success',
                foundUser
            })

        }).catch ((error) => {

            // returning the error in case
            // there arise any error

            return res.status (401).send ({
                status: 'failure',
                message: error.message
            })
        })

    } catch (error) {
        return res.status (401).send ({
            status: 'success',
            message: error.message
        })
    }

}

// exporting th getSingle Controller

module.exports = {
    getSingle
}