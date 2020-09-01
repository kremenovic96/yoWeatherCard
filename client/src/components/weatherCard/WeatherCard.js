import React from 'react';
import './style.css';

const WeatherCard = () => {


    return (
        <div className="card weather-card">
            <div className="card-body" >
                <div className='row'>
                    <div className='col-3 fog'>
                        <div>
                            0%
                        </div>
                        <div>
                            Fog
                        </div>

                    </div>
                    <div className='col-3   low'>
                        <div>29%</div>
                        <div className=''>Low Clouds</div>

                    </div>
                    <div className='col-3  medium'>
                        <div>83</div>
                        <div>Medium Clouds</div>
                    </div>
                    <div className='col-3  high'>
                        <div>79%</div>
                        <div className=''>High Clouds</div>
                    </div>
                </div>
                <div className='row mt-2' style={{ height: '200px' }}>
                    <div className='col-3 align-self-center sun-col fog'>
                        <img src='http://localhost:3001/image/clearsky_day.png'
                            className='img-fluid weather-indicator ' />

                    </div>
                    <div className='col-3 align-self-end low-cloud-col'>
                        <div className='img-container'>
                            <img src='http://localhost:3001/image/cloudy.png'
                                className='img-fluid low-cloud-img' />
                        </div>

                    </div>
                    <div className='col-3 align-self-center  medium-cloud-col'>
                        <div className='img-container'>
                            <img src='http://localhost:3001/image/cloudy.png'
                                className='img-fluid medium-cloud-img' />
                        </div>
                    </div>
                    <div className='col-3 align-self-start  high-cloud-col'>
                        <div className='img-container'>
                            <img src='http://localhost:3001/image/cloudy.png'
                                className='img-fluid high-cloud-img' />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WeatherCard;