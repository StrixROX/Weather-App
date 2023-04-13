import { useContext, useState } from "react"
import { WeatherContext } from "../contexts/WeatherContext"

function WeatherWidget() {
  const weather = useContext(WeatherContext)
  const [expand, useExpand] = useState(false)

  const getLocation = () => {
    const locationData = weather?.forecast?.location
    const res = [
      locationData?.name,
      locationData?.region,
      locationData?.country,
    ]
      .filter((el) => typeof el != "undefined")
      .join(", ")

    return res
  }

  return (
    <div>
      <h3>Today's weather</h3>
      <p>Location: {getLocation()}</p>
      <p>Weather: {weather?.forecast?.current?.condition?.text || "-"}</p>
      <p>
        Temperature: {weather?.forecast?.current?.temp_c || "-"}°C /{" "}
        {weather?.forecast?.current?.temp_f || "-"}°F
      </p>
      {expand ? (
        <p>
          Feels Like: {weather?.forecast?.current?.feelslike_c || "-"}°C /{" "}
          {weather?.forecast?.current?.feelslike_f || "-"}°F
        </p>
      ) : undefined}
      <p>
        Max. Temperature:{" "}
        {weather?.forecast?.forecast?.forecastday?.[0]?.day?.maxtemp_c || "-"}°C
        / {weather?.forecast?.forecast?.forecastday?.[0]?.day?.maxtemp_f || "-"}
        °F
      </p>
      <p>
        Min. Temperature:{" "}
        {weather?.forecast?.forecast?.forecastday?.[0]?.day?.mintemp_c || "-"}°C
        / {weather?.forecast?.forecast?.forecastday?.[0]?.day?.mintemp_f || "-"}
        °F
      </p>
      {expand ? (
        <p>
          Wind Speed: {weather?.forecast?.current?.wind_mph || "-"}mph /{" "}
          {weather?.forecast?.current?.wind_kph || "-"}kph
        </p>
      ) : undefined}
      {expand ? (
        <p>
          Humidity: {weather?.forecast?.current?.humidity || "-"}mph /{" "}
          {weather?.forecast?.current?.humidity || "-"}kph
        </p>
      ) : undefined}
      {expand ? (
        <p>
          Pressure: {weather?.forecast?.current?.pressure_mb || "-"}mb /{" "}
          {weather?.forecast?.current?.pressure_in || "-"}in
        </p>
      ) : undefined}
      {expand ? (
        <p>
          Sunrise:{" "}
          {weather?.forecast?.forecast?.forecastday?.[0]?.astro?.sunrise || "-"}
          <br />
          Sunset:{" "}
          {weather?.forecast?.forecast?.forecastday?.[0]?.astro?.sunset || "-"}
        </p>
      ) : undefined}
      {expand ? (
        <button onClick={() => useExpand(false)}>Show more</button>
      ) : (
        <button onClick={() => useExpand(true)}>Show less</button>
      )}
      <pre>{JSON.stringify(weather, null, 2)}</pre>
    </div>
  )
}

export { WeatherWidget }
