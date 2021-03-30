


// importing all the dependencies

const path = require ('path');
const { User } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'User'));


// defining the getList controller

const getList = (req, res) => {

    try {

        User.find ({}, {
            first_name: 1,
            last_name: 1,
            email: 1,
            mobile: 1,
            roleId: 1
        }).populate ('roleId').exec ().then ((foundUsers) => {

            return res.status (200).send ({
                status: 'success',
                foundUsers
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

// exporting the getList controller

module.exports = {
    getList
}