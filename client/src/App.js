import React from 'react';
import WeatherCard from './components/weatherCard/WeatherCard';
const App = () => {

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 m-auto'>
          <WeatherCard />
        </div>
        {/* <div className='col-md-6'>
          <WeatherCard />

        </div> */}
      </div>
    </div>
  );
};

export default App;
