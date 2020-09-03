
const WeatherData = require('../models/weatherData');
const externalWeatherApi = require('../weatherService/externalWeatherApi');
const moment = require('moment');

const getTodayWeatherData = (lat, lon) => {
    return externalWeatherApi.getBasicTodayWeatherData(req.query.lat, req.query.lon);
}

const getWeekWeatherData = async (lat, lon) => {
    const cachedWeatherData = await getCompleteCachedWeatherData(lat, lon);
    if (cachedWeatherData) {
        console.log('there is cache')
        if (new Date(cachedWeatherData.expires).getTime() < new Date().getTime()) {
            const apiResponse = await externalWeatherApi.getCompleteWeatherData(lat, lon, cachedWeatherData.lastModified);
            if (apiResponse.status === 300) {
                console.log('cache does not need an update')

                return cachedWeatherData;
            }
            else if (apiResponse.status === 200) {
                const updatedCache = await WeatherData.findByIdAndUpdate(cachedWeatherData._id, truncateWeatherData({ ...apiResponse.data, expires: apiResponse.headers.expires, lastModified: apiResponse.headers['last-modified'] }), { useFindAndModify: false, new: true });
                console.log('cache updated')

                return updatedCache;
            }
            else {
                throw Error('Can not connect to external weather api');

            }
        }
        //cache has not expired yet
        else {
            return cachedWeatherData;
        }
    }
    else {
        console.log('no cache found')
        const apiResponse = await externalWeatherApi.getCompleteWeatherData(lat, lon);
        const newCache = new WeatherData(truncateWeatherData({ ...apiResponse.data, expires: apiResponse.headers.expires, lastModified: apiResponse.headers['last-modified'] }));
        return await newCache.save();
    }
}

/**
 * 
 * @param {*} date correct Date obj
 * @returns promise of db response
 */
const getWeatherDataForGivenDate = async (date, lat, lon) => {
    return WeatherData.aggregate([
        {
            "$match": {
                "$and": [
                    { "location.coordinates.0": { "$eq": Number(lon) } },
                    { "location.coordinates.1": { "$eq": Number(lat) } }
                ]

            }
        },
        {
            "$addFields": {
                "timeseries.exx": "$expires"
            }
        },
        { "$unwind": "$timeseries" },
        {
            "$project": {
                "date_diff": { "$abs": { "$subtract": ["$timeseries.time", date] } },
                "time": "$timeseries.time",
                "data": "$timeseries.data",
                "expires": "$$ROOT.expires",
                "lastModified": "$$ROOT.lastModified"

            }
        },
        { "$sort": { "date_diff": 1 } },
        {
            "$project": {
                "time": "$time",
                "data": "$data",
                "expires": "$expires",
                "lastModified": "$lastModified"
            }
        },
        { "$limit": 1 }
    ]);
}

const getCompleteCachedWeatherData = async (lat, lon) => {
    return WeatherData.findOne({ 'location.type': { $eq: 'Point' }, 'location.coordinates.0': { $eq: lon }, 'location.coordinates.1': { $eq: lat } });
}

const truncateWeatherData = (weatherJson) => {
    const truncatedData = {
        expires: weatherJson.expires,
        lastModified: weatherJson.lastModified,
        location: {
            type: 'Point', //weatherJson.geometry.type
            coordinates: weatherJson.geometry.coordinates
        },
        timeseries: [...weatherJson.properties.timeseries],
    }
    return truncatedData;
}

module.exports = {
    getTodayWeatherData,
    getWeekWeatherData,
    getWeatherDataForGivenDate
}