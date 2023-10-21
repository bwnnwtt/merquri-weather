import { useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search';
import Weather from './components/Weather';
import WeatherResult from './components/WeatherResult';

function App() {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [result, setResult] = useState({})

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
        <WeatherResult result={result}/>
      </Weather>
    </div>
  );
}

export default App;
