const config = require('../utils/config');
const { default: Axios } = require('axios');
// const mapBoxPlaceUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=';
const mapBoxPlaceUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
const mapBoxToken = config.MAPBOX_TOKEN;

const getLatAndLon = (place) => {
    return Axios.get(`${mapBoxPlaceUrl}/${place}.json`, { params: { access_token: mapBoxToken } })
    .then(resp => resp.data.features);
}

module.exports = {
    getLatAndLon
}