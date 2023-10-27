Refer to assignment details in [assignment.pdf](./assignment.pdf)

View deployed project [here](https://merquri-weather.vercel.app)

## Setup the project:

To make API calls to OpenWeather API, create a `.env.local` file in repository root folder (for development and testing) and add the environment variable `REACT_APP_OPENWEATHER_API_KEY`

## Assumptions:

- From the figma mockup, only the Country is available for searching in the Search bar. Hence only Country search is available
- The project makes a API call to https://restcountries.com/v3.1/all to get a list of available countries and the geolocation coordinates. When the user searches for a valid country in the list, the geolocation coordinates of the country obtained from the restcountries API is used as query params for the OpenWeather API call. The city displayed is based on the name of the city obtained from the OpenWeather API call for the geolocation coordinates 
- Fetch API was used instead of AJAX to make API calls
- Search history stores up to 5 history searches. When the search button of a history result is clicked, it retrives the history result instead of fetching a new result from OpenWeather API.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
