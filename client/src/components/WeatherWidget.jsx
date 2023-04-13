import "../css/weather-widget.css"

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
    <div className="wrapper weather-widget">
      <div className="row full">
        <img
          src={
            weather?.forecast?.current?.condition?.icon ||
            "/src/assets/error.png"
          }
          className="icon"
        />
        <div className="data col left full">
          <div className="row right full">
            <img src="/src/assets/location.png" width="16" />
            <span className="size-1">{getLocation()}</span>
          </div>
          <span className="size-5">
            {weather?.forecast?.current?.temp_c || "-"}°C /{" "}
            {weather?.forecast?.current?.temp_f || "-"}°F
          </span>
          {expand ? (
            <span className="size-2">
              Feels like <br /> {weather?.forecast?.current?.feelslike_c || "-"}
              °C / {weather?.forecast?.current?.feelslike_f || "-"}°F
            </span>
          ) : undefined}
          <span className="size-4">
            {weather?.forecast?.current?.condition?.text || "-"}
          </span>
        </div>
      </div>
      <div className="row extra-info">
        <div className="col left">
          <span className="size-2">
            Max. Temp:{" "}
            {weather?.forecast?.forecast?.forecastday?.[0]?.day?.maxtemp_c ||
              "-"}
            °C /{" "}
            {weather?.forecast?.forecast?.forecastday?.[0]?.day?.maxtemp_f ||
              "-"}
            °F
            <br />
            Min. Temp:{" "}
            {weather?.forecast?.forecast?.forecastday?.[0]?.day?.mintemp_c ||
              "-"}
            °C /{" "}
            {weather?.forecast?.forecast?.forecastday?.[0]?.day?.mintemp_f ||
              "-"}
            °F
          </span>
        </div>
        <div className="col right">
          {expand ? (
            <span className="size-2">
              Sunrise:{" "}
              {weather?.forecast?.forecast?.forecastday?.[0]?.astro?.sunrise ||
                "-"}
              <br />
              Sunset:{" "}
              {weather?.forecast?.forecast?.forecastday?.[0]?.astro?.sunset ||
                "-"}
            </span>
          ) : undefined}
        </div>
      </div>
      {expand ? (
        <div className="col left">
          <span className="size-2">
            Wind Speed: {weather?.forecast?.current?.wind_mph || "-"} mph /{" "}
            {weather?.forecast?.current?.wind_kph || "-"} kph
          </span>
          <span className="size-2">
            Humidity: {weather?.forecast?.current?.humidity || "-"} mph /{" "}
            {weather?.forecast?.current?.humidity || "-"} kph
          </span>
          <span className="size-2">
            Pressure: {weather?.forecast?.current?.pressure_mb || "-"} mb /{" "}
            {weather?.forecast?.current?.pressure_in || "-"} in
          </span>
        </div>
      ) : undefined}

      <div className="row right">
        {expand ? (
          <button
            onClick={() => useExpand(false)}
            className="toggle-more"
            tabIndex={1}
          >
            Show less
          </button>
        ) : (
          <button
            onClick={() => useExpand(true)}
            className="toggle-more"
            tabIndex={1}
          >
            Show more
          </button>
        )}
      </div>
    </div>
  )
}

export { WeatherWidget }
