require('dotenv').config();

let MONGODB_URI = process.env.MONGODB_URI;
let MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
let MAPQUEST_TOKEN = process.env.MAPQUEST_TOKEN;
let PORT = process.env.PORT;

if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = process.env.TEST_MONGODB_URI;
}
module.exports = {
    MONGODB_URI,
    MAPBOX_TOKEN,
    MAPQUEST_TOKEN,
    PORT
};