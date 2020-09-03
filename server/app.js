const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const weatherRouter = require('./controllers/weatherController');
const config = require('./utils/config');
const geocodingRouter = require('./controllers/geoCodingController');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch(error => {
        console.log('error in mongodb happened: ', error.message)
    });

app.use(cors());
app.use(bodyParser.json());

app.use('/api/weather', weatherRouter);
app.use('/api/geocoding', geocodingRouter);
app.use('/image', express.static('images'));

module.exports = app;