import axios from 'axios';


const get = (url) => {
    return axios.get(url);
}

const getWithQueryParams = (url, queryParams) => {
    return axios.get(`${url}`, { params: queryParams });
};

export default {
    get,
    getWithQueryParams
}