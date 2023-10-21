import { useEffect, useState } from "react"
import formatDate from "../utils/formatDate"

const WeatherResult = ({ result }) => {

  const [weather, setWeather] = useState({})
  
  useEffect(() => {

    const getWeather = async() => {
      const lat = result.latlng[0]
      const lon = result.latlng[1]
      const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY

      const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
  
      if(!resp.ok) {
        throw new Error('API call failed')
      }
  
      const data = await resp.json()

      const date = new Date(data.dt * 1000)
      const formattedDate = formatDate(date)
      const formattedTime = date
                              .toLocaleTimeString()
                              .replace(' ', '')
                              .toLowerCase()

      console.log(formattedDate, formattedTime)
      data.datetime = `${formattedDate} ${formattedTime}`;

      console.log(data)
      setWeather(data)
    }

    if(Object.keys(result).length !== 0) {
      // const data = getWeather()
      // setWeather(data)
      getWeather()
    }
  }, [result])
  
  if(Object.keys(result).length === 0) return (
    <div>
      No result
    </div>
  )
    
  return (
    <div>
      <div className="weather-display-main">
        <p>Today's Weather</p>
        <h1>{Math.round(weather.main?.temp)}&deg;</h1>
        <p>
          <span>
            H:&nbsp;{Math.round(weather.main?.temp_max)}&deg;&nbsp;
          </span>
          <span>
            L:&nbsp;{Math.round(weather.main?.temp_max)}&deg;&nbsp;
          </span>
        </p>
        <h3>{weather.name}&#44;&nbsp;{result.cca2}</h3>
      </div>
      <div className="weather-display-side">
        <p>Clouds: {weather.clouds?.all}%</p>
        <p>Humidity: {weather.main?.humidity}%</p>
        <p>{weather.datetime}</p>
      </div>
    </div>
  )
}

export default WeatherResult