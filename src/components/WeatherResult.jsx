const WeatherResult = ({ result }) => {
  if(Object.keys(result).length === 0) return (
    <div>
      No result
    </div>
  )
  
  return (
    <div>
      {result.name.common}
    </div>
  )
}

export default WeatherResult