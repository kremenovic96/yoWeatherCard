const mongoose = require('mongoose');
const GeoPoint = require('./geoPoint');

const weatherData = new mongoose.Schema({
    name: String,
    expires: Date,
    lastModified: Date,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    timeseries: [
        {
            time: {
                type: Date,
                required: true
            },
            data: {
                type: {
                    required: true,
                },
                instant: {
                    details: {
                        dew_point_temperature: Number,
                        relative_humidity: Number,
                        air_temperature: Number,
                        cloud_area_fraction: Number,
                        cloud_area_fraction_high: Number,
                        cloud_area_fraction_medium: Number,
                        cloud_area_fraction_low: Number,
                    }
                },
                next_12_hours: {
                    summary: {
                        symbol_code: String
                    }
                },
                next_1_hours: {
                    summary: {
                        symbol_code: String
                    }
                },
                next_6_hours: {
                    summary: {
                        symbol_code: String
                    }
                }

            }

        }
    ]
})

weatherData.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('WeatherData', weatherData);
