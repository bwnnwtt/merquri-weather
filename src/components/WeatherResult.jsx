const WeatherResult = ({ result, weather }) => {

  if(Object.keys(result).length === 0) return (
    <div className="weather-display-no-result">
      <h1>
        No result ...
      </h1>
      <h2>
        Enter country in search bar to start searching
      </h2>
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