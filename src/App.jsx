import {  useState,useEffect } from 'react'

import './styles.css'
import axios from 'axios';


const SearchBar = ({ onSearch }) => {
  const [cityInput, setCityInput] = useState('');

  const handleSearch=() => {
    onSearch(cityInput);
  };

  return (
    <div className='search-bar'>
      <input
        type="text"
        placeholder="Enter city name"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};





const WeatherCard = ({title,data}) => {
  return (
    <div className='weather-card'>
      <h3>{title}</h3>
      <p>{data}</p>
    </div>
  )
  
}


const WeatherDisplay = ({ city }) => {

  const [weather, setWeather] = useState(null);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (city) {
      setVisible(true)
    

      axios.get(`https://api.weatherapi.com/v1/current.json`, {
        params: {
          key: "044b40b4c0cb473bbe283747250201",
          q:city 
        }
      }).then((res) => {
        setWeather(res.data)
      })
        .catch((error) => {
          console.log(error)
          alert("Failed to fetch weather data")
        })
        .finally(
          () => {
            setVisible(false)
          })
    }
  },
    [city]);
  
  
  return (
    <div className='weather-display'>
      { 
        visible && <p>Loading data...</p>
      }

      {
        !visible && weather && (
          <div className="weather-cards">
            <WeatherCard title="Temperature" data={`${weather.current.temp_c}°C`} />
            <WeatherCard title="Humidity" data={`${weather.current.humidity}%`} />
            <WeatherCard title="Condition" data={weather.current.condition.text} />
            <WeatherCard title="Wind Speed" data={`${weather.current.wind_kph} kph`} />

            
            
          </div>
        )
          
      }
    </div>
  )
}
     
function App() {
  const [city, setCity] = useState('');
  
  const handleSearch = (searchCity) => {
    setCity(searchCity);
  }
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay city={city} />
    </div>
  )
 
 

      
      


      

}

export default App;
