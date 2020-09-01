const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const weatherRouter = require('./controllers/weatherController');


app.use(cors());
app.use(bodyParser.json());

app.use('/api/weather', weatherRouter);


module.exports = app;