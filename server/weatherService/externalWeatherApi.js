const axios = require('axios');
const apiService = require('../../client/src/services/apiService');

//Using complete instead of compact because compact does not include dew point data
const url = 'https://api.met.no/weatherapi/locationforecast/2.0/complete';
const sitename = 'github:https://github.com/kremenovic96;email:ranko.kremenovic@gmail.com'

const getHeaders = () => {
    return {
        headers: { 'User-Agent': sitename },
    }
}

const getCompleteWeatherData = (lat, lon, ifModifiedSinceHeaderVal) => {
    const headers = { ...getHeaders().headers };
    if (ifModifiedSinceHeaderVal) {
        headers['If-Modified-Since'] = ifModifiedSinceHeaderVal
    }
    return axios.get(url, { params: { lat, lon }, headers });
}

/**
 * 
 * @param {*} lat 
 * @param {*} lon 
 * @returns {dewPointCelsius, relativeHumidity, airTemperature, cloudAreaFraction, cloudAreaFractionHigh, cloudAreaFractionMedium, cloudAreaFractionLow}
 */
const getBasicTodayWeatherData = (lat, lon) => {

    return getCompleteWeatherData(lat, lon)
        .then(resp => {
            // console.log(resp)
            return extractBasicWeatherData({ ...resp.data, expires: resp.headers.expires, lastModified: resp.headers['last-modified'] });
        })
}

const extractBasicWeatherData = (weatherJson) => {
    return {
        dewPointCelsius: weatherJson.properties.timeseries[0].data.instant.details.dew_point_temperature,
        relativeHumidity: weatherJson.properties.timeseries[0].data.instant.details.relative_humidity,
        airTemperature: weatherJson.properties.timeseries[0].data.instant.details.air_temperature,
        cloudAreaFraction: weatherJson.properties.timeseries[0].data.instant.details.cloud_area_fraction,
        cloudAreaFractionHigh: weatherJson.properties.timeseries[0].data.instant.details.cloud_area_fraction_high,
        cloudAreaFractionMedium: weatherJson.properties.timeseries[0].data.instant.details.cloud_area_fraction_medium,
        cloudAreaFractionLow: weatherJson.properties.timeseries[0].data.instant.details.cloud_area_fraction_low,
        expires: weatherJson.expires,
        lastModified: weatherJson.lastModified,
    }
}


module.exports = {
    getCompleteWeatherData,
    getBasicTodayWeatherData
}