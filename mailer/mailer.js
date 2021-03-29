

// importing all the dependencies

const nodemailer = require ('nodemailer');
const path = require ('path');
const { config } = require (path.resolve (__dirname, '..', 'config', 'config'));

// defining the mailer function

const mailer = (from = undefined, to = undefined, subject = undefined, text = undefined, html = undefined) => {

    try {

        // validating the values
        
        if (!from || !to || !subject || !text || !html) {
            throw new Error ('please enter all the fields');
        }

        // IMPORTANT
        // --------------
        // HERE I AM MAKING USE OF GMAIL SERVICE TO SEND THE FORGOT PASSWORD MAIL
        // YOU CAN CUSTOMIZE IT A LITTLE BIT FOR USING WITH SENDGRID


        // making the mail Transporter

        let mailTransporter = nodemailer.createTransport ({
            service: config.MAIL_SERVICE,
            auth: {
                user: config.SENDER_USER,
                pass: config.SENDER_PASSWORD
            }
        })

        // defining the mail Details

        const mailDetails = {
            from,
            to,
            subject,
            text,
            html
        }

        // return a new Promise for sending the forgot password mail to the specified email address
         
        return new Promise ((resolve, reject) => {
            mailTransporter.sendMail (mailDetails, (error, data) => {
                if (error) {
                    reject (error);
                } else {
                    resolve (data);
                }
            })
        });


    } catch (error) {
        return new Promise ((resolve, reject) => {
            reject (error);
        })
    }

}

// exporting the mailer function

module.exports = {
    mailer
}