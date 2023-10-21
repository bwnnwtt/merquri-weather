import { useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search';
import Weather from './components/Weather';
import WeatherResult from './components/WeatherResult';
import SearchHistory from './components/SearchHistory';
import formatDate from './utils/formatDate';

function App() {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [result, setResult] = useState({})
  const [weather, setWeather] = useState({})
  const [history, setHistory] = useState([])
  
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

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSearch = (e) => {
    let filteredResult = countries.filter(e => String(e.name.common).toLowerCase() === search.toLowerCase())[0]
    console.log(filteredResult)
    // console.log(filteredResults[0])
    filteredResult ? setResult(filteredResult) : setResult({})
    // console.log(result)
  }

  useEffect(() => {
    const fetchCountries = async() => {
      const response = await fetch('https://restcountries.com/v3.1/all')
    
      if(!response.ok) {
        throw new Error('API call failed')
      }
    
      const data = await response.json()

      console.log(data)
    
      setCountries(data)
    }

    try {
      fetchCountries()
    } catch (err) {
      console.error(err)
    }
  }, [])

  return (
    <div className="App">
      <Search 
        search={search} 
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />
      <Weather>
        <WeatherResult 
          result={result} 
          weather={weather}
        />
        <SearchHistory />
      </Weather>
    </div>
  );
}

export default App;
