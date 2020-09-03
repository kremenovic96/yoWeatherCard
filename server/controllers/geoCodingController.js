const geocodingRouter = require('express').Router();
const geocodingService = require('../services/geocodingService');

geocodingRouter.get('/forward', async (req, res, next) => {

    if (req.query.place) {
        return geocodingService
            .forwardGeoCode(req.query.place)
            .then(geoResponse => res.status(200).json(geoResponse));
    }

    else {
        return res.status(400).end();
    }

});


geocodingRouter.get('/reverse', async (req, res, next) => {

    if (req.query.lat && req.query.lon) {
        return geocodingService
            .reverseGeoCode(req.query.lat, req.query.lon)
            .then(geoResponse => res.status(200).json(geoResponse));
    }

    else {
        return res.status(400).end();
    }

});


module.exports = geocodingRouter;