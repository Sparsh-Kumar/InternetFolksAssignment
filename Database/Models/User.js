

// importing all the dependencies

const path = require ('path');
const mongoose = require ('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');
const bcrypt = require ('bcrypt');
const { config } = require (path.resolve (__dirname, '..', '..', 'config', 'config'));
const { validateEmail, validatePassword, validateNames, validatePhone } = require (path.resolve (__dirname, '..', '..', 'validators', 'validator'));


// defining the UserSchema

const UserSchema = new mongoose.Schema ({

    first_name: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (first_name) => {
                return validateNames (first_name)
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
                return validateNames (last_name)
            },
            message: '{VALUE} is not a valid last name'
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: (email) => {
                return validateEmail (email);
            },
            message: '{VALUE} is not a valid email address'
        }
    },

    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: (mobile) => {
                return validatePhone (mobile);
            },
            message: '{VALUE} is not a valid mobile number'
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (password) => {
                return validatePassword (password);
            },
            message: '{VALUE} is not a valid password'
        }
    },

    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
        default: null
    }

}, { timestamps: true});

// making use of mongoose-unique-validator plugin

UserSchema.plugin (uniqueValidator);

// making use of bcrypt module to hash the password before saving into the database

UserSchema.pre ('save', function (next) {
    let user = this;
    bcrypt.hash (user.password, config.SALT_ROUNDS, (error, hashed_password) => {
        if (error) {
            return next (error);
        } else {
            user.password = hashed_password;
            next ();
        }
    })
})

// defining a static function for checking bcrypt password hash match

UserSchema.statics.comparePassword = function (text, hash) {
    return bcrypt.compare (text, hash); // it will return a promise
}

// defining the User Model

const User = mongoose.model ('user', UserSchema);

// exporting the User Model

module.exports = {
    User
}
