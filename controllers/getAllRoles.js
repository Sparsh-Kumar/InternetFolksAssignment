

// importing all the dependencies

const path = require ('path');
const { Role } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Role'));


// defining the getAllRoles controller

const getAllRoles = (req, res) => {

    try {

        Role.find ({}).then ((roles) => {

            return res.status (200).send ({
                status: 'success',
                roles
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

// exporting the getAllRoles controller

module.exports = {
    getAllRoles
}