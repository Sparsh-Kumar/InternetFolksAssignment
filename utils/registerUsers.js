

// importing all the dependencies

const mongoose = require ('mongoose');
const path = require ('path');
const { validateEmail, validatePhone, validatePassword, validateNames } = require (path.resolve (__dirname, '..', 'validators', 'validator'));
const { User } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'User'));
const { Role } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Role'));

// defining the registerUsers function

const registerUsers = (first_name = undefined, last_name = undefined, email = undefined, mobile = undefined, password = undefined, role = undefined) => {
    try {

        // if validation fail for any of the value then throw error

        if ((!validateNames (first_name)) || (!validateNames (last_name)) || (!validateEmail (email)) || (!validatePhone (mobile)) || (!validatePassword (password))) {
            throw new Error ('please enter all the values in a proper format');
        }

        // if every thing is in correct format then
        // if there is already a user with the given email address

        return User.findOne ({
            $or: [
                { email },
                { mobile }
            ]            
        }).then ((user) => {

            // throw an error if the user already exists

            if (user) {
                throw new Error ('User already exists');
            }

            return Role.findOne ({
                name: role
            })

        }).then ((foundRole) => {

            // if no role found, then throw error
            if (!foundRole) {
                throw new Error ('no role found');
            }

            // if the role is found then return a promise to create a user
            return User.create ({
                first_name,
                last_name,
                email,
                mobile,
                password,
                roleId: mongoose.Types.ObjectId (foundRole._id)
            })

        }).then ((created_user) => {
            return created_user;
        }).catch ((error) => {
            return new Promise ((resolve, reject) => {
                reject (error);
            })
        })


    } catch (error) {
        return new Promise ((resolve, reject) => {
            reject (error);
        })
    }
}

// exporting the registerUsers function

module.exports = {
    registerUsers
}