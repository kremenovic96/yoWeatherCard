const axios = require('axios');


const get = (url) => {
    return axios.get(url);
}

const getWithQueryParams = (url, queryParams) => {
    return axios.get(`${url}/`, { params: queryParams });
};

module.exports = {
    get,
    getWithQueryParams
}