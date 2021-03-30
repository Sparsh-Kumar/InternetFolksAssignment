

// importing all the dependencies

const path = require ('path');
const mongoose = require ('mongoose');
const { config } = require (path.resolve (__dirname, '..', '..', 'config', 'config'));
const { User } = require (path.resolve (__dirname, 'User'));
const { School } = require (path.resolve (__dirname, 'School'));
const { validateNames } = require (path.resolve (__dirname, '..', '..', 'validators', 'validator'));

// defining the ProfileSchema

const ProfileSchema = new mongoose.Schema ({

    first_name: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (first_name) => {
                return validateNames (first_name);
            },
            message: '{VALUE} is not a valid first name'
        }
    },

    last_name: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (last_name) => {
                return validateNames (last_name);
            },
            message: '{VALUE} is not a valid last name'
        }
    },

    classroom: {
        type: String,
        default: ''
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'school',
        required: true
    }

}, { timestamps: true });

// making the Profile model using ProfileSchema

const Profile = mongoose.model ('profile', ProfileSchema, 'profiles');

// exporting the Profile model

module.exports = {
    Profile
}