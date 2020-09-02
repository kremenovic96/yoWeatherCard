const weatherRouter = require('express').Router();
const externalWeatherApi = require('../weatherService/externalWeatherApi');
const weatherService = require('../services/weatherService');

weatherRouter.get('', async (req, res, next) => {

    if (req.query.basicTodayWeatherData) {
        return weatherService.getTodayWeatherData(req.query.lat, req.query.lon)
            .then(resp =>
                res.send(resp)
            )
    }
    else if (req.query.weeklyWeatherData) {
        return weatherService.getWeekWeatherData(req.query.lat, req.query.lon)
            .then(resp => res.status(200).json(resp))

    }
    else {
        return res.status(400).end();
    }

});

module.exports = weatherRouter;