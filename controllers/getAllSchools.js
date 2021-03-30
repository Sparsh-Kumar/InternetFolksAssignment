


// importing all the dependencies

const path = require ('path');
const { School } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'School'));

// defining the getAllSchools controller

const getAllSchools = (req, res) => {

    try {

        School.find ({}).then ((schools) => {

            return res.status (200).send ({
                status: 'success',
                schools
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

// exporting the getAllSchools controller

module.exports = {
    getAllSchools
}