

// importing all the dependencies

const path = require ('path');
const { User } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'User'));
const { Profile } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Profile'));

// defining the removeAccount controller

const removeAccount = (req, res) => {
    
    try {

        // finding the user and removing the user account

        User.findOneAndRemove ({
            _id: req.user._id
        }).then ((removedUser) => {

            // if the user is removed successfully
            // then remove the profile associated with the userId
            
            return Profile.findOneAndRemove ({
                userId: req.user._id
            })

        }).then ((removedProfile) => {

            return res.status (200).send ({
                status: 'success',
                message: 'successfully removed your user account and profile associated with it'
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

// exporting the removeAccount controller

module.exports = {
    removeAccount
}