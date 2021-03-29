

// making the configuration object

const config = {
    PORT:80,
    DATABASE_URL: 'mongodb://localhost:27017/testing',
    SALT_ROUNDS: 5
}


// exporting the configuration object

module.exports = {
    config
}