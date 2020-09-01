const weatherRouter = require('express').Router();
const externalWeatherApi = require('../externalApis/externalWeatherApi');

weatherRouter.get('', async (req, res, next) => {

    externalWeatherApi.getEssentialWeatherData(req.query.lat, req.query.lon)
        .then(resp =>
            res.send(resp)
        )
});

module.exports = weatherRouter;