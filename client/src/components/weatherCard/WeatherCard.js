import React, { useEffect } from 'react';
import './style.css';

const WeatherCard = ({ weatherData }) => {

    if (!weatherData) {
        return (
            <div className='text-center'>
                Weather data is not loaded..
            </div>
        )
    }
    return (
        <div className="card weather-card">
            <div className="card-body" >
                <div className='row'>
                    <div className='col-3 fog'>
                        <div>
                            {weatherData.data.instant.details.fog_area_fraction}%
                        </div>
                        <div>
                            Fog
                        </div>

                    </div>
                    <div className='col-3   low'>
                        <div>{weatherData.data.instant.details.cloud_area_fraction_low}%</div>
                        <div className=''>Low Clouds</div>

                    </div>
                    <div className='col-3  medium'>
                        <div>{weatherData.data.instant.details.cloud_area_fraction_medium}%</div>
                        <div>Medium Clouds</div>
                    </div>
                    <div className='col-3  high'>
                        <div>{weatherData.data.instant.details.cloud_area_fraction_high}%</div>
                        <div className=''>High Clouds</div>
                    </div>
                </div>
                <div className='row mt-2' style={{ height: '200px' }}>
                    <div className='col-3 align-self-center sun-col fog'>
                        <img src={`http://localhost:3001/image/${weatherData.data.next_1_hours.summary.symbol_code}.png`}
                            className='img-fluid weather-indicator '
                        />

                    </div>
                    <div className='col-3 align-self-end low-cloud-col'>
                        <div className='img-container'>
                            <img src='http://localhost:3001/image/cloudy.png'
                                className='img-fluid low-cloud-img'
                                style={{ opacity: weatherData.data.instant.details.cloud_area_fraction_low / 100 }} />
                        </div>

                    </div>
                    <div className='col-3 align-self-center  medium-cloud-col'>
                        <div className='img-container'>
                            <img src='http://localhost:3001/image/cloudy.png'
                                className='img-fluid medium-cloud-img'
                                style={{ opacity: weatherData.data.instant.details.cloud_area_fraction_medium / 100 }} />
                        </div>
                    </div>
                    <div className='col-3 align-self-start  high-cloud-col'>
                        <div className='img-container'>
                            <img src='http://localhost:3001/image/cloudy.png'
                                className='img-fluid high-cloud-img'
                                style={{ opacity: weatherData.data.instant.details.cloud_area_fraction_high / 100 }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body" >
                <div className='d-flex week-forecast'>
                    <div className='week-forecast-item'>
                        <span>Mon</span>
                    </div>
                    <div className='week-forecast-item'>
                        <span>Tue</span>
                    </div>
                    <div className='week-forecast-item'>
                        <span>Wed</span>
                    </div>
                    <div className='week-forecast-item'>
                        <span>Thu</span>
                    </div>
                    <div className='week-forecast-item'>
                        <span>Fri</span>
                    </div>
                    <div className='week-forecast-item'>
                        <span>Sat</span>
                    </div>
                    <div className='week-forecast-item'>
                        <span>Sun</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;