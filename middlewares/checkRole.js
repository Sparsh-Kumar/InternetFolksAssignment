

// importing all the dependencies

const path = require ('path');

// importing the checkRole middleware

const checkRole = (roles = []) => {

    return (req, res, next) => {

        try {

            // if the roles array given in the argument does not match the role name
            // given for the user
            // then throw error

            if (!roles.includes (req.user.roleId.name)) {
                throw new Error ('Sorry your role is not authorized to access this api endpoint');
            }

            // if the roles array given in the argument has a value that matches the role name
            // given for the user
            // then proceed
            
            next ()
        }
        catch (error) {

            return res.status (401).send ({
                status: 'failure',
                message: error.message
            })

        }

    }

}

// exporting the checkRole middleware

module.exports = {
    checkRole
}