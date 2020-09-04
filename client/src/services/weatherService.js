import apiService from './apiService';
const apiUrl = 'api/weather';

const getWeatherData = (date, { params }) => {
    return apiService.getWithQueryParams(apiUrl, { date, ...params });
}

export default {
    getWeatherData
}