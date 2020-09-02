
const WeatherData = require('../models/weatherData');
const externalWeatherApi = require('../weatherService/externalWeatherApi');
const moment = require('moment');

const getTodayWeatherData = (lat, lon) => {
    return externalWeatherApi.getBasicTodayWeatherData(req.query.lat, req.query.lon);
}

const getWeekWeatherData = async (lat, lon) => {
    const cachedWeatherData = await getCachedWeatherData(lat, lon);
    if (cachedWeatherData) {
        console.log('there is cache')
        if (new Date(cachedWeatherData.expires).getTime() < new Date().getTime()) {
            const apiResponse = await externalWeatherApi.getCompleteWeatherData(lat, lon, cachedWeatherData.lastModified);
            if (apiResponse.status === 300) {
                console.log('300 status')

                return cachedWeatherData;
            }
            else if (apiResponse.status === 200) {
                const updatedCache = await WeatherData.findByIdAndUpdate(cachedWeatherData._id, apiResponse.data);
                console.log('200 status')

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

const getCachedWeatherData = async (lat, lon) => {
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
    getWeekWeatherData
}