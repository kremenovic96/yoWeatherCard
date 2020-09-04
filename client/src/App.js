import React, { useState, useEffect } from 'react';
import WeatherCard from './components/weatherCard/WeatherCard';
import SearchInput from './components/searchInput/SearchInput';
import weatherService from './services/weatherService';

const App = () => {

  const [originLocation, setOriginLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);

  const [originWeatherData, setOriginWeatherData] = useState(null);
  const [destinationWeatherData, setDestinationWeatherData] = useState(null);

  useEffect(() => {
    if (originLocation) {
      weatherService
        .getWeatherData(new Date(), { params: { ...originLocation } })
        .then(res => setOriginWeatherData(res.data))
        .catch(err => alert("Error happened"));
    }
  }, [originLocation]);

  useEffect(() => {
    if (destinationLocation) {
      weatherService
        .getWeatherData(new Date(), { params: { ...destinationLocation } })
        .then(res => setDestinationWeatherData(res.data))
        .catch(err => alert("Error happened"));
      ;
    }
  }, [destinationLocation]);

  return (
    <div className='container'>
      <div className='row mt-4 '>
        <div className='col-md-6'>
          <WeatherCard weatherData={originWeatherData} />
          <SearchInput setSearchLocation={setOriginLocation} />
        </div>
        <div className='col-md-6 '>
          <WeatherCard weatherData={destinationWeatherData} />
          <SearchInput setSearchLocation={setDestinationLocation} />
        </div>
      </div>
    </div>
  );
};

export default App;
