

// importing all the dependencies

const path = require ('path');
const { Role } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Role'));
const _ = require ('lodash');

// defining the removeRole controller

const removeRole = (req, res) => {

    try {

        // getting the role name to remove that role
        const { role } = _.pick (req.body, ['role']);

        // finding if the role user want to remove exists or not

        Role.findOne ({
            name: role
        }).then ((role) => {

            // if no Role exists with the name specified, then throw error
            if (!role) {
                throw new Error ('there is no role with the specified name');
            }

            // if there exists a role then return a promise to remove that role
            return Role.findOneAndRemove ({
                _id: role._id
            })

        }).then ((removed_role) => {

            return res.status (200).send ({
                status: 'success',
                message: 'role is deleted successfully',
                removed_role
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

// exporting the removeRole controller

module.exports = {
    removeRole
}