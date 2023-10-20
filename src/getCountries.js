const getCountries = async() => {
  const resp = await fetch('https://restcountries.com/v3.1/all')

  if(!resp.ok) {
    throw new Error('API call failed')
  }

  const data = await resp.json()

  return data
}

export default getCountries