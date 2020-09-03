const weatherRouter = require('express').Router();
const externalWeatherApi = require('../weatherService/externalWeatherApi');
const weatherService = require('../services/weatherService');

weatherRouter.get('', async (req, res, next) => {

    //TODO: Check for lat and lon params

    if (req.query.basicTodayWeatherData) {
        return weatherService.getTodayWeatherData(req.query.lat, req.query.lon)
            .then(resp =>
                res.send(resp)
            )
    }
    else if (req.query.weeklyWeatherData) {
        // const a = await weatherService.getWeatherDataForGivenDate(new Date(), req.query.lat, req.query.lon)
        // console.log(a)
        return weatherService.getWeekWeatherData(req.query.lat, req.query.lon)
            .then(resp => {
                return res.status(200).json(resp)
            })
    }
    else if (req.query.date) {
        return weatherService
            .getWeatherDataForGivenDate(new Date(req.query.date), req.query.lat, req.query.lon)
            .then(weatherData => res.json(weatherData[0]));
    }
    else {
        return res.status(400).end();
    }

});

module.exports = weatherRouter;