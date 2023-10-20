const getWeather = async () => {

  // const city = 'london'
  const city = 'malaysia'
  const countryCode = ''
  const state = countryCode == 'us' ? '' : ''
  const limit = 5

  const resp = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${countryCode}&limit=${limit}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
  
  if(!resp.ok) {
    throw new Error('API call failed')
  }
  
  const data = await resp.json()

  console.log(data)
  return data
}

export default getWeather;