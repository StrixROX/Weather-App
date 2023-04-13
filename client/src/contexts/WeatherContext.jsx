import { createContext, useEffect, useState } from "react"
import axios from "axios"

const WeatherContext = createContext(undefined)
const WeatherUpdateContext = createContext(undefined)

const BASE_URL = import.meta.env.VITE_API_ENDPOINT

function WeatherProvider({ children }) {
  const [weatherData, useWeatherData] = useState(undefined)
  const [city, useCity] = useState("new-delhi")

  useEffect(() => {
    const getWeatherData = async () => {
      const d = new Date()
      const hour = d.getHours()

      const weatherForecast = await axios
        .get(`${BASE_URL}/${city}/forecast/${hour}`)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err)
        })

      return { forecast: weatherForecast }
    }

    getWeatherData().then((res) => useWeatherData({ ...weatherData, ...res }))
  }, [city])

  return (
    <WeatherContext.Provider value={weatherData}>
      <WeatherUpdateContext.Provider value={useCity}>
        {children}
      </WeatherUpdateContext.Provider>
    </WeatherContext.Provider>
  )
}

export { WeatherProvider, WeatherContext, WeatherUpdateContext }
