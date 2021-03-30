

// importing all the dependencies

const mongoose = require ('mongoose');
const path = require ('path');
const { config } = require (path.resolve (__dirname, '..', '..', 'config', 'config'));

// defining the Role Schema

const RoleSchema = new mongoose.Schema ({

    name: {
        type: String,
        required: true,
        trim: true,
        enum: [
            'student',
            'admin',
            'principal'
        ],
        default: 'student'
    },

    scopes: {
        type: Array,
        default: [] // the default scope for a Role is no scope
    }

}, { timestamps: true });

// making the Role Model

const Role = mongoose.model ('role', RoleSchema, 'roles');

// exporting the Role

module.exports = {
    Role
}