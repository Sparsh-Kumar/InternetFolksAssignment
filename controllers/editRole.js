

// importing all the dependencies

const path = require ('path');
const { Role } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Role'));
const _  = require ('lodash');

// defining the editRole controller 

const editRole = (req, res) => {

    try {

        // getting the name and scopes array from request body
        const { name, scopes } = _.pick (req.body, ['name', 'scopes']);

        // if there are no scopes or there are empty array scopes
        // then throw an error

        if (!scopes || !scopes.length) {
            throw new Error ('please enter the scopes array in the request body');
        }

        Role.findOne ({
            name
        }).then ((foundRole) => {

            if (!foundRole) {
                throw new Error ('There is no role with this name');
            }

            return Role.findOneAndUpdate ({
                _id: foundRole._id
            }, {
                $set: {
                    scopes
                }
            }, { upsert: true, new: true, runValidators: true, context: 'query' })

        }).then ((updatedRole) => {

            // returning the updated Role
            return res.status (200).send ({
                status: 'success',
                updatedRole
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

// exporting the editRole controller

module.exports = {
    editRole
}