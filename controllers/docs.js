


const path = require ('path');
const { config } = require (path.resolve (__dirname, '..', 'config', 'config'));

const docs = (req, res) => {
    try {
        return res.status (200).redirect (config.API_DOCS_URL);
    } catch (error) {
        return res.status (401).send ({
            status: 'failure',
            message: error.message
        })
    }
}


module.exports = {
    docs
}