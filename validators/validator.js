

// importing all the dependencies

const validator = require ('validator');
const passwordValidator = require ('password-validator');
const phone = require ('phone');

// defining the password Schema

const passwordSchema = new passwordValidator ();
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


// defining the function for email validation

const validateEmail = (email = undefined) => {
    if (!email) {
        return false;
    } else {
        return validator.isEmail (email);
    }
}

// defining the function for password validation

const validatePassword = (password = undefined) => {
    if (!password) {
        return false;
    } else {
        return passwordSchema.validate (password);
    }
}

// validate first name and last name

const validateNames = (name = undefined) => {
    if (!name) {
        return false;
    } else {
        return ((validator.isAlpha (name)) && (name.length < 70) && (name.length > 0)) ;
    }
}

// validate phone number function

const validatePhone = (phone_number = undefined) => {
    if (!phone_number) {
        return false;
    } else {
        let isValid = phone (phone_number, '').length ? true: false;
        return isValid;
    }
}

// validate the role function

const validateRole = (role = undefined) => {
    
    let role_Hash = {
        student: "6062bb795debf1524f083393", // id of student role
        admin: "6062bb795debf1524f083392", // id of admin role
        principal: "6062bb795debf1524f083394" // id of principal role
    };

    if (!role) {
        return false;
    } else {
        if (role_Hash [role]) { // if role is one of student, admin, principal
            return role_Hash [role];
        } else {
            return false;
        }
    }

}

// exporting these validators for use

module.exports = {
    validateEmail,
    validateNames,
    validatePassword,
    validatePhone,
    validateRole
}