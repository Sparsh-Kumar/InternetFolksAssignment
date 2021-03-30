

// importing all the dependencies

const path = require ('path');
const { School } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'School'));
const { validateNames } = require (path.resolve (__dirname, '..', 'validators', 'validator'));
const _ = require ('lodash');


// defining the create School controller

const createSchool = (req, res) => {

    try {

        // getting the values name, city, state, country from the request body
        // validating these values
        // throwing the error if the validation fails

        const { name, city, state, country } = _.pick (req.body, ['name', 'city', 'state', 'country']);
        if ((!validateNames (name)) || (!validateNames (city)) || (!validateNames (state)) || (!validateNames (country))) {
            throw new Error ('please enter all name, city, state, country');
        }

        // checking if the school of that name already exists
        School.findOne ({
            name
        }).then ((foundSchool) => {

            if (foundSchool) {
                throw new Error ('school with that name already exists');
            }

            return School.create ({
                name,
                city,
                state,
                country
            })

        }).then ((createdSchool) => {

            // return the created School
            return res.status (200).send ({
                status: 'success',
                createdSchool
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

// exporting the createSchool controller

module.exports = {
    createSchool
}