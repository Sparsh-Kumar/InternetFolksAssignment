

// importing all the dependencies

const path = require ('path');
const { Role } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Role'));
const _ = require ('lodash');

// defining the createRole controller

const createRole = (req, res) => {

    try {

        const { name, scopes } = _.pick (req.body, ['name', 'scopes']);

        // finding if already there is a role already with the given name

        Role.findOne ({
            name
        }).then ((role) => {

            // if there already a role with the name
            // then throw error "role with the name already exists"

            if (role) {
                throw new Error ('role with the name already exists');
            }

            // if there is no role with this name already
            // then creating a new role
            // with fields provided by the user

            return Role.create ({
                name,
                scopes
            })

        }).then ((createdRole) => {

            // returning the new createdRole to the client

            return res.status (200).send ({
                status: 'success',
                createRole
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

// exporting the createRole controller

module.exports = {
    createRole
}