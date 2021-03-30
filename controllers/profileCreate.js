

// importing all the dependencies

const path = require ('path');
const { School } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'School'));
const { Profile } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Profile'));
const { validateNames } = require (path.resolve (__dirname, '..', 'validators', 'validator'));
const _ = require ('lodash');

// defining the ProfileCreate controller

const profileCreate = (req, res) => {

    try {
        
        // getting the classRoom name from the user, he want to add to his profile

        const { classroom, name } = _.pick (req.body, ['classroom', 'name']);
        if ((!validateNames (classroom)) || (!validateNames (name))) {
            throw new Error ('please enter a valid classroom or school name');
        }

        // getting the user id from the request.user._id given by login middleware

        const userId = req.user._id;
        Profile.findOne ({
            userId
        }).then ((profile) => {

            // if the logged in user has already a profile
            // then throw Error "user already has a profile"

            if (profile) {
                throw new Error ('user has already a profile');
            }

            // finding the school where student wants to apply for

            return School.findOne ({
                name
            })

        }).then ((school) => {

            // if there is no school whose name the logged in student passed
            // then throw an Error
            if (!school) {
                throw new Error ('There is no school whose name you just passed');
            }

            return Profile.create ({
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                classroom,
                userId,
                schoolId: school._id
            })

        }).then ((createdProfile) => {

            // return the created profile to the client

            return res.status (200).send ({
                status: 'success',
                createdProfile
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

// exporting the profileCreate controller

module.exports = {
    profileCreate
}