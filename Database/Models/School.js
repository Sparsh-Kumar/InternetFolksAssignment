

// importing all the dependencies

const mongoose = require ('mongoose');
const path = require ('path');
const { config } = require (path.resolve (__dirname, '..', '..', 'config', 'config'));
const { validateNames } = require (path.resolve (__dirname, '..', '..', 'validators', 'validator'));
const { uniqueValidator } = require ('mongoose-unique-validator');


// defining the SchoolSchema

const SchoolSchema = new mongoose.Schema ({

    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: (name) => {
                return validateNames (name);
            },
            message: '{VALUE} is not a valid name of the school'
        }
    },

    city: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (city) => {
                return validateNames (city);
            },
            message: '{VALUE} is not a valid city name'
        }
    },

    state: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (state) => {
                return validateNames (state);
            },
            message: '{VALUE} is not a valid state name'
        }
    },

    country: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (country) => {
                return validateNames (country);
            },
            message: '{VALUE} is not a valid country name'
        }
    }

}, { timestamps: true });


// making use of mongoose-unique-validator plugin
SchoolSchema.plugin (uniqueValidator);

// making the School model using SchoolSchema

const School = mongoose.model ('school', SchoolSchema, 'schools');

// exporting the School model

module.exports = {
    School
}