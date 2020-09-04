const weatherRouter = require('express').Router();
const externalWeatherApi = require('../weatherService/externalWeatherApi');
const weatherService = require('../services/weatherService');

weatherRouter.get('', async (req, res, next) => {

    if (req.query.date && req.query.lat && req.query.lon) {
        return weatherService
            .getWeatherDataForDate({ geolocation: { lat: req.query.lat, lon: req.query.lon } }, new Date(req.query.date))
            .then(weatherData => res.json(weatherData));
    }
    else if (req.query.date && req.query.address) {
        return weatherService
            .getWeatherDataForDate({ address: req.query.address }, new Date(req.query.date))
            .then(weatherData => res.json(weatherData));
    }
    else {
        return res.status(400).end();
    }

});

module.exports = weatherRouter;