

// importing all the dependencies

const path = require ('path');
const { Profile } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Profile'));

// defining the getAllProfiles controller

const getAllProfiles = (req, res) => {

    try {

        Profile.find ({}).populate ('userId').populate ('schoolId').exec ().then ((profiles) => {

            return res.status (200).send ({
                status: 'success',
                profiles
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

// exporting the getAllProfiles controller

module.exports = {
    getAllProfiles
}