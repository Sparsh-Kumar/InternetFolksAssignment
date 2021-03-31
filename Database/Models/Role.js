

// importing all the dependencies

const mongoose = require ('mongoose');
const path = require ('path');
const { config } = require (path.resolve (__dirname, '..', '..', 'config', 'config'));
const uniqueValidator = require ('mongoose-unique-validator');

// defining the Role Schema

const RoleSchema = new mongoose.Schema ({

    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        default: 'student'
    },

    scopes: {
        type: Array,
        default: [] // the default scope for a Role is no scope
    }

}, { timestamps: true });

// making use of mongoose unique validator plugin

RoleSchema.plugin (uniqueValidator);

// making the Role Model

const Role = mongoose.model ('role', RoleSchema, 'roles');

// exporting the Role

module.exports = {
    Role
}