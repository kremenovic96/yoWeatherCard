import React, { useEffect } from 'react';
import './style.css';

const WeatherCard = ({ weatherData, weekSummary }) => {

    if (!weatherData) {
        return (
            <div className='text-center '>
                Weather data is not loaded
            </div>
        )
    }

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
        <>
            <div className="card weather-card" style={{ fontFamily: 'cursive' }}>
                <div className='card-header'>
                    <div className='d-flex justify-content-between'>
                        <span>Dew Point: {weatherData.data.instant.details.dew_point_temperature}&#176;</span>
                        <span>Humidity: {weatherData.data.instant.details.relative_humidity}%</span>
                        {/* <span>Temperature: {weatherData.data.instant.details.air_temperature}</span> */}
                    </div>
                </div>
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
                    <div className='row'>
                        <div className='ml-4 d-flex flex-column'>
                            <span style={{ fontSize: '40px' }}>{weatherData.name}</span>
                            <span style={{ fontSize: '30px' }}>{weatherData.data.instant.details.air_temperature}&#176;</span>
                        </div>
                    </div>
                    <div className='row mt-2' style={{ height: '200px' }}>
                        <div className='col-3 align-self-center sun-col fog'>
                            <img src={`/image/${weatherData.data.next_1_hours.summary.symbol_code}.png`}
                                className='img-fluid weather-indicator ' alt='sun'
                            />

                        </div>
                        <div className='col-3 align-self-end low-cloud-col'>
                            <div className='img-container'>
                                <img src='/image/cloudy.png'
                                    className='img-fluid low-cloud-img'
                                    style={{ opacity: weatherData.data.instant.details.cloud_area_fraction_low / 100 }}
                                    alt='low-clouds' />
                            </div>

                        </div>
                        <div className='col-3 align-self-center  medium-cloud-col'>
                            <div className='img-container'>
                                <img src='/image/cloudy.png'
                                    className='img-fluid medium-cloud-img'
                                    style={{ opacity: weatherData.data.instant.details.cloud_area_fraction_medium / 100 }}
                                    alt='medium-clouds' />
                            </div>
                        </div>
                        <div className='col-3 align-self-start  high-cloud-col'>
                            <div className='img-container'>
                                <img src='/image/cloudy.png'
                                    className='img-fluid high-cloud-img'
                                    style={{ opacity: weatherData.data.instant.details.cloud_area_fraction_high / 100 }}
                                    alt='low-clouds' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body" >
                    <div className='d-flex week-forecast'>
                        {weatherData.weekSummary.timeseries.map((d, i) => {
                            if (i > 6) return null;
                            return <div key={d.dayInWeek} className='week-forecast-item' style={{ fontSize: '15px' }}>
                                <span>{days[d.dayInWeek]}</span>
                                <img src={`/image/${d.symbol_code}.png`}
                                    className='img-fluid'
                                    alt='weather-indicator'
                                />
                                <span>{d.details.air_temperature}&#176;</span>
                            </div>
                        }
                        )}
                    </div>
                </div>
            </div>
                <small class="text-muted">Week forecast is taken at random time of day</small>
        </>
    );
};

export default WeatherCard;