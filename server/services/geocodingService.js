const config = require('../utils/config');
const { default: Axios } = require('axios');
// const mapBoxPlaceUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=';
const mapBoxPlaceUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
const mapQuestUrl = 'http://open.mapquestapi.com/geocoding/v1';
const mapBoxToken = config.MAPBOX_TOKEN;
const mapQuestToken = config.MAPQUEST_TOKEN;

// const getLatAndLon = (place) => {
//     return Axios.get(`${mapBoxPlaceUrl}/${place}.json`, { params: { access_token: mapBoxToken } })
//     .then(resp => resp.data.features);
// }

const forwardGeoCode = (place) => {
    return Axios.get(`${mapQuestUrl}/address`, { params: { key: mapQuestToken, location: place } })
        .then(resp => {
            return {
                adminArea5: resp.data.results[0].locations[0].adminArea5,
                lat: resp.data.results[0].locations[0].displayLatLng.lat,
                lon: resp.data.results[0].locations[0].displayLatLng.lng,
            }
        });
}

const reverseGeoCode = (lat, lon) => {
    return Axios.get(`${mapQuestUrl}/reverse`, { params: { key: mapQuestToken, location: `${lat},${lon}` } })
        .then(resp => resp.data.results[0].locations[0].adminArea5);
}


module.exports = {
    forwardGeoCode,
    reverseGeoCode
}