

// importing all the dependencies

const path = require ('path');
const { User } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'User'));
const { Profile } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Profile'));
const { validateNames } = require (path.resolve (__dirname, '..', 'validators', 'validator'));
const _ = require ('lodash');

// defining the updateUser controller

const updateUser = (req, res) => {

    try {

        // getting the first name and last name values

        const { first_name, last_name } = _.pick (req.body, ['first_name', 'last_name']);

        // checking for the validity of first name and last name
        // if first_name or last_name is not valid
        // then throw error

        if ((!validateNames (first_name)) || (!validateNames (last_name))) {
            throw new Error ('first name and last name are not valid names');
        }

        // if the first_name and last_name are of valid format
        // then proceed and make QueryObj

        let updated_user = undefined;
        let updated_profile = undefined;
        let QueryObj = {};
        if (first_name) {
            QueryObj [first_name] = first_name;
        }
        if (last_name) {
            QueryObj [last_name] = last_name;
        }

        // Updating the user values
        // according to the QueryObj

        User.findOneAndUpdate ({
            _id: req.user._id
        },
        { $set: QueryObj },
        {
            upsert: true, new: true, runValidators: true, context: 'query'
        }).then ((updatedUser) => {

            // if the document is updated successfully
            // then find the profile linked with that user

            updated_user = updatedUser;

            // return a promise to find the profile associated with the logged in user
            return Profile.findOne ({
                userId: req.user._id
            })

        }).then ((profile) => {

            // if there has been no profile set up for the  user
            // then 
            if (!profile) {
                return new Promise ((resolve, reject) => {
                    resolve ('no profiles, no profiles updation');
                })
            } else if (profile) { // if there is a profile
                return Profile.findOneAndUpdate ({
                    _id: profile._id
                }, {
                    $set: QueryObj
                }, { upsert: true, new: true, runValidators: true, context: 'query' });
            }

        }).then ((profileData) => {

            // return to the user
            return res.status (200).send ({
                status: 'success',
                updated_user,
                profileData
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

// exporting the updateUser controller

module.exports = {
    updateUser
}