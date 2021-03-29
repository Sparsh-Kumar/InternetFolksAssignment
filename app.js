

// importing all the dependencies

const express = require ('express');
const mongoose = require ('mongoose');
const port = process.env.PORT || 80;
const bodyParser = require ('body-parser');
const cors = require ('cors');
const path = require ('path');
const { config } = require (path.resolve (__dirname, 'config', 'config'));
const helmet = require ('helmet');
const xss = require ('xss-clean');

// importing the routeHandler

const { RouteHandler } = require (path.resolve (__dirname, 'RouteHandler', 'RouteHandler'));

// configuring the mongoose to use Promises

mongoose.Promise = global.Promise;
mongoose.connect (config.DATABASE_URL).then (() => {
    console.log (`Connected: ${config.DATABASE_URL}`);
}).catch ((error) => {
    console.log (`Error: ${error.message}`);
})

// making the app instance

const app = express ();
app.use (helmet ());
app.use (cors ());
app.use (xss ());
app.use (bodyParser.json ({ limit: '10kb' }));

// defining the /api endpoint

app.use ('/api', RouteHandler);

// making the server listen on a particular port

app.listen (port, () => {
    console.log (`http://localhost:${port}`);
})