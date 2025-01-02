import {  useState } from 'react'

import  styles  from './App.module.css'

function App() {
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");
  const [visible, setVisible] = useState(false);
  //console.log(city)
 // console.log(weather)

 

  
  const getWeather = async (city) => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=044b40b4c0cb473bbe283747250201&q=${city}`)
      .then((res) => res.json())
    .then((data)=>{
      //console.log(data.current.condition.text)
      //console.log(data.current.temp_c)
      //console.log(data.current.humidity)
     // console.log(data.current.wind_kph)
      setVisible(true)
      setWeather(data)
      
    })
      .catch((err) => {
      console.log(err)
      alert("Failed to fetch weather data")
    })




  }
   
  return (
    
      <div className={styles.container}>
     
      <input type="text" placeholder='Enter city name' onChange={(e)=>{setCity(e.target.value)}}/>
      <button className={styles.button} onClick={() => getWeather(city)}>Search</button>

      { ( weather == '') ? (<p>Loading data...</p>) : (
        <div className={styles.weathercards}>
          <div className={styles.weathercard}>
            <h3>Temperature </h3>
            <p>{ weather.current.temp_c}&deg;C</p>
          </div>

          <div className={styles.weathercard}> 
            
            <h3>Humidity</h3>
            <p>{weather.current.humidity}%</p>
          </div>
          <div className={styles.weathercard}>
            <h3>Condition</h3>
            <p>{weather.current.condition.text}</p>
          
          </div>
          <div className={styles.weathercard}> 
            <h3>Wind Speed</h3>
            <p>{weather.current.wind_kph}kph</p>
          </div>
          

        </div>
        
      )}


      
      


      
</div>  
    
  )
}

export default App
