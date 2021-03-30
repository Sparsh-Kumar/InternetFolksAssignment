

// importing all the dependencies

const path = require ('path');
const { Profile } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Profile'));
const { School } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'School'));


// defining the getAllStudents controller

const getAllStudents = (req, res) => {

    try {

        // getting the schoolId from the req.params
        // and checking if req.params.schoolId
        // should not be empty

        if (!req.params.schoolId) {
            throw new Error ('please specify the school Id');
        }
        const schoolId = req.params.schoolId;

        // Checking is there any school
        // associated with the school Id 
        // given by the user in the req.params

        School.findOne ({
            _id: schoolId
        }).then ((school) => {
            
            // checking if there is a school associated with the
            // given id or not
            // if there is no school
            // then throw error "There is no school associated with this id"

            if (!school) {
                throw new Error ('There is no school associated with this id');
            }

            // if there is a school associated 
            // then find all the students profile
            // associated with that schoolId

            return Profile.find ({
                schoolId
            })
            
        }).then ((students_profile) => {

            // returning the students_profile
            return res.status (200).send ({
                status: 'success',
                students_profile
            })

        }).catch ((error) => {

            return res.status (401).send ({
                status: 'failure',
                message: error.message
            })

        })

    } catch (error) {

        // returning the error
        return res.status (401).send ({
            status: 'failure',
            message: error.message
        })

    }
}

// exporting the getAllStudents controller

module.exports = {
    getAllStudents
}