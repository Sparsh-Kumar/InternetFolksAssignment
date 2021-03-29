

const getSingle = (req, res) => {
    try {
        return res.status (200).send ({
            status: 'success',
            message: 'get single api endpoint'
        })
    } catch (error) {
        return res.status (401).send ({
            status: 'success',
            message: error.message
        })
    }
}

// exporting th getSingle Controller

module.exports = {
    getSingle
}