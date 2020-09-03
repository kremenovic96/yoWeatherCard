const geocodingRouter = require('express').Router();
const geocodingService = require('../services/geocodingService');

geocodingRouter.get('', async (req, res, next) => {

    if (req.query.place) {
        return geocodingService
        .getLatAndLon(req.query.place)
        .then(geoResponse => res.status(200).json(geoResponse));
    }

    else {
        return res.status(400).end();
    }

});

module.exports = geocodingRouter;