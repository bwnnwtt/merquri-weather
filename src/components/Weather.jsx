const Weather = ({children}) => {
  return (
    <div className="weather-container">
      <div className="weather-image"></div>
      { children }
    </div>
  )
}

export default Weather