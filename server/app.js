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

app.use(express.static('build'));

app.use('/api/weather', weatherRouter);
app.use('/api/geocoding', geocodingRouter);
app.use('/image', express.static('images'));

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

module.exports = app;