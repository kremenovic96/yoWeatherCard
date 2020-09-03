import apiService from './apiService';
const apiUrl = 'api/weather';

const getWeatherDataByLatLon = (lat, lon) => {
    return apiService.getWithQueryParams(apiUrl, { weeklyWeatherData: 1, lat, lon });
}

const getWeatherDataForDate = (date, lat, lon) => {
    return apiService.getWithQueryParams(apiUrl, { date, lat, lon });
}


export default {
    getWeatherDataByLatLon,
    getWeatherDataForDate
}