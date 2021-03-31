

// importing all the dependencies

const path = require ('path');

// defining the checkScope middleware function

const checkScope = (scope = undefined) => {

    return (req, res, next) => {

        try {

            // if the user doc inserted into the request
            // by the middleware
            // does not have scope
            // that is specified in scopes array in its document
            // then throw an Error of "no permission"

            if (!req.user.roleId.scopes.includes (scope)) {
                throw new Error (`please add the scope "${scope}" to the role to perform this operation`);
            }

            // else if the user doc inserted into the request
            // by the login middleware
            // has the scope 
            // in its scope array
            // then proceed
            
            next ();
        }
        catch (error) {

            return res.status (401).send ({
                status: 'failure',
                message: error.message
            })

        }

    }

}

// exporting the checkScope middleware function

module.exports = {
    checkScope
}