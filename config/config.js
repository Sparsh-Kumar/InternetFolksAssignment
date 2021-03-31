

// making the configuration object

const config = {
    PORT:80,
    DATABASE_URL: 'mongodb://localhost:27017/testing',
    SALT_ROUNDS: 5,
    ACCESS_TOKEN_SECRET: 'ZvS7JLwM@pww?!8%D%J=K7?A@rjm4@G?jT$sLm-!zJX#=uAyFCypCagQxG88jcX#pj%gGdC29AL*d*FNf9xVx+Pr',
    REFRESH_TOKEN_SECRET: 'XxhTsaU@T4H_9%L@AheR$AT-Ja6Equ328TL!^_Z%!ubZ#W39@?LbZf&89BnNDUERp=ZFVXMm&YJ7N#=W+?hZ?zRG',
    PROJECT_URL: 'http://localhost',
    MAIL_SERVICE: 'gmail',
    SENDER_USER: 'SENDER_EMAIL',
    SENDER_PASSWORD: 'SENDER_PASSWORD',
    API_DOCS_URL: 'https://documenter.getpostman.com/view/11784786/TzCMcnv4'
}


// exporting the configuration object

module.exports = {
    config
}