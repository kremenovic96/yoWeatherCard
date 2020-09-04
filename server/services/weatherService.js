
const WeatherData = require('../models/weatherData');
const externalWeatherApi = require('../weatherService/externalWeatherApi');
const moment = require('moment');
const { forwardGeoCode, reverseGeoCode } = require('./geocodingService');

const getTodayWeatherData = (lat, lon) => {
    return externalWeatherApi.getBasicTodayWeatherData(req.query.lat, req.query.lon);
}

const isCacheExpired = (cache) => {
    return new Date(cache.expires).getTime() < new Date().getTime();
}

const getWeatherDataForDate = async ({ geolocation, address }, date) => {

    const { lat, lon, adminArea5 } = geolocation || await forwardGeoCode(address);

    let cachedWeatherData = await getCachedWeatherDataForGivenDate(date, lat, lon);
    cachedWeatherData = cachedWeatherData[0];

    if (cachedWeatherData) {
        console.log('there is cache')
        if (isCacheExpired(cachedWeatherData)) {
            //get newest data
            const apiResponse = await externalWeatherApi.getCompleteWeatherData(lat, lon, cachedWeatherData.lastModified);

            //newest data is not different from cached one, so use cached version
            if (apiResponse.status === 300) {
                console.log('cache does not need an update')
                return cachedWeatherData;
            }

            //there is newer data that is different from cached one, update cache
            else if (apiResponse.status === 200) {
                const updatedCache = await WeatherData.findByIdAndUpdate(cachedWeatherData._id, truncateWeatherData({ ...apiResponse.data, coordinates: [lon, lat], expires: apiResponse.headers.expires, name: cachedWeatherData.name, lastModified: apiResponse.headers['last-modified'] }), { useFindAndModify: false, new: true });
                console.log('cache updated')
                return {
                    _id: updatedCache.timeseries[0]._id,
                    time: updatedCache.timeseries[0].time,
                    name: updatedCache.name,
                    data: updatedCache.timeseries[0].data,
                    expires: updatedCache.expires,
                    lastModified: updatedCache.lastModified,
                    weekSummary: updatedCache.weekSummary
                };
            }
            else {
                throw Error('Can not connect to external weather api');
            }
        }
        //cache has not expired yet so return it
        else {
            return cachedWeatherData;
        }
    }
    else {
        console.log('no cache')
        const apiResponse = await externalWeatherApi.getCompleteWeatherData(lat, lon);
        const locationName = adminArea5 || await reverseGeoCode(lat, lon);
        const newCache = await new WeatherData(truncateWeatherData({ ...apiResponse.data, coordinates: [lon, lat], name: locationName, expires: apiResponse.headers.expires, lastModified: apiResponse.headers['last-modified'] })).save();
        return {
            _id: newCache.timeseries[0]._id,
            time: newCache.timeseries[0].time,
            data: newCache.timeseries[0].data,
            name: newCache.name,
            expires: newCache.expires,
            lastModified: newCache.lastModified,
            weekSummary: newCache.weekSummary
        };
    }
}

/**
 * 
 * @param {*} date correct Date obj
 * @returns promise of db response
 */
const getCachedWeatherDataForGivenDate = async (date, lat, lon) => {
    return WeatherData.aggregate([
        {
            "$match": {
                "$and": [
                    { "location.coordinates.0": { "$eq": Number(lon) } },
                    { "location.coordinates.1": { "$eq": Number(lat) } }
                ]

            }
        },
        { "$unwind": "$timeseries" },
        {
            "$project": {
                "date_diff": { "$abs": { "$subtract": ["$timeseries.time", date] } },
                "time": "$timeseries.time",
                "data": "$timeseries.data",
                "expires": "$$ROOT.expires",
                "lastModified": "$$ROOT.lastModified",
                "name": "$$ROOT.name",
                "weekSummary": "$$ROOT.weekSummary"

            }
        },
        { "$sort": { "date_diff": 1 } },
        {
            "$project": {
                "time": "$time",
                "data": "$data",
                "expires": "$expires",
                "lastModified": "$lastModified",
                "name": "$name",
                "weekSummary": "$weekSummary"
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
        name: weatherJson.name,
        location: {
            type: 'Point', //weatherJson.geometry.type
            // coordinates: weatherJson.geometry.coordinates
            coordinates: weatherJson.coordinates
        },
        timeseries: weatherJson.properties.timeseries,
        weekSummary: { timeseries: extractWeekSummary(weatherJson.properties.timeseries) }
    }
    return truncatedData;
}


const extractWeekSummary = (timeseries) => {
    const weekSummary = extractOneTimeSeriePerDay(timeseries);
    return weekSummary;
}

const extractOneTimeSeriePerDay = (timeseries) => {
    const mymoment = moment(new Date());
    const onePerDay = [];

    const dataLen = timeseries.length;
    let addedCount = 0;
    for (let i = 0; i < dataLen; i++) {
        const timeserie = timeseries[i];
        if (isSameWeekDay(moment(timeserie.time), mymoment) && isDay(moment(timeserie.time))) {
            mymoment.add(1, 'days');
            onePerDay.push({ time: timeserie.time, details: timeserie.data.instant.details, symbol_code: timeserie.data.next_6_hours.summary.symbol_code, dayInWeek: moment(timeserie.time).get('d') });
            addedCount += 1;
        }
        if (addedCount === 7) break;
    }
    return onePerDay;
}

const isSameWeekDay = (m1, m2) => {
    return m1.get('d') === m2.get('d');
}

const isDay = (momentTime) => {
    return momentTime.get('h') < 20 && momentTime.get('h') > 4;
}


module.exports = {
    getWeatherDataForDate,
}