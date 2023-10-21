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
                              .toLocaleTimeString(
                                  undefined, 
                                  { 
                                    hour: '2-digit', 
                                    minute:'2-digit'
                                  }
                                )
                              .replace(' ', '')
                              .toLowerCase()

      data.datetime = `${formattedDate} ${formattedTime}`;

      setWeather(data)
    }

    if(Object.keys(result).length !== 0) {
      getWeather()
    }
  }, [result])

  useEffect(() => {
    if(Object.keys(weather).length !== 0) {
      setHistory(
        [
          weather,
          ...history
        ]
      )
    }

  }, [weather])

  // make history array to contain at most 5 items
  useEffect(() => {
    if(history.length > 5) {
      const newHistory = history.slice(0, 5)
      setHistory([...newHistory])
    }
  }, [history])

  useEffect(() => {
    const fetchCountries = async() => {
      const response = await fetch('https://restcountries.com/v3.1/all')
    
      if(!response.ok) {
        throw new Error('API call failed')
      }
    
      const data = await response.json()
    
      setCountries(data)
    }

    try {
      fetchCountries()
    } catch (err) {
      console.error(err)
    }
  }, [])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSearch = (e) => {
    let filteredResult = countries.filter(e => String(e.name.common).toLowerCase() === search.toLowerCase())[0]
    filteredResult ? setResult(filteredResult) : setResult({})
  }

  const handleHistorySearch = (obj) => {
    setWeather(obj)
  }

  const handleHistoryDelete = (id) => {
    const newHistory = history.filter(o => o.id !== id)
    setHistory(newHistory)
  }

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
        <SearchHistory 
          history={history}
          handleHistorySearch={handleHistorySearch}
          handleHistoryDelete={handleHistoryDelete}
        />
      </Weather>
    </div>
  );
}

export default App;
