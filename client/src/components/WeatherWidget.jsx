import "../css/weather-widget.css"
import errorImg from "../assets/error.png"
import locationWhiteImg from "../assets/location_white.png"
import locationBlackImg from "../assets/location_black.png"

import { useContext, useState } from "react"
import { WeatherContext } from "../contexts/WeatherContext"

const getLocation = (weather) => {
  const locationData = weather?.forecast?.location
  const res = [locationData?.name, locationData?.region, locationData?.country]
    .filter((el) => typeof el != "undefined")
    .join(", ")

  return res
}

function WeatherWidget({ fullscreen }) {
  const weather = useContext(WeatherContext)

  return fullscreen
    ? WeatherWidgetFullscreen(weather)
    : WeatherWidgetSimple(weather)
}

function WeatherWidgetSimple(weather) {
  const location = getLocation(weather)
  const [expand, useExpand] = useState(false)

  return (
    <div className="wrapper weather-widget">
      <div className="row full --main">
        <img
          src={weather?.forecast?.current?.condition?.icon || errorImg}
          className="icon"
        />
        <div className="data col left full">
          <div className="row right full --location">
            <img src={locationBlackImg} width="16" />
            <span className="size-1">{location}</span>
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
      <div className="row --extra-info">
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
        {expand ? (
          <div className="col right">
            <span className="size-2">
              Sunrise:{" "}
              {weather?.forecast?.forecast?.forecastday?.[0]?.astro?.sunrise ||
                "-"}
              <br />
              Sunset:{" "}
              {weather?.forecast?.forecast?.forecastday?.[0]?.astro?.sunset ||
                "-"}
            </span>
          </div>
        ) : undefined}
      </div>
      {expand ? (
        <div className="col left --hidden-info">
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

      <div className="row right --toggle-button">
        {expand ? (
          <button
            onClick={() => useExpand(false)}
            className="toggle-more size-1"
            tabIndex={1}
          >
            Show less
          </button>
        ) : (
          <button
            onClick={() => useExpand(true)}
            className="toggle-more size-1"
            tabIndex={1}
          >
            Show more
          </button>
        )}
      </div>
    </div>
  )
}

function WeatherWidgetFullscreen(weather) {
  const location = getLocation(weather)
  const [expand, useExpand] = useState(false)

  return (
    <div className="wrapper weather-widget-fullscreen">
      <div className="--main">
        <div className="row full --location">
          <img src={locationWhiteImg} width="16" />
          <span className="size-1">{location}</span>
        </div>
        <div className="row full icon">
          <img src={weather?.forecast?.current?.condition?.icon || errorImg} />
        </div>
        <div className="col full spaced">
          <span className="size-5">
            {weather?.forecast?.current?.temp_c || "-"}°C /{" "}
            {weather?.forecast?.current?.temp_f || "-"}°F
          </span>
          {expand ? (
            <span className="size-2">
              <span className="size-1">Feels like</span> <br />{" "}
              {weather?.forecast?.current?.feelslike_c || "-"}
              °C / {weather?.forecast?.current?.feelslike_f || "-"}°F
            </span>
          ) : undefined}
          <span className="size-4">
            {weather?.forecast?.current?.condition?.text || "-"}
          </span>
        </div>
      </div>

      <div className="col --extra-info spaced">
        <span className="size-2">
          <span className="size-1">Max. Temp.</span>
          <br />
          {weather?.forecast?.forecast?.forecastday?.[0]?.day?.maxtemp_c || "-"}
          °C /{" "}
          {weather?.forecast?.forecast?.forecastday?.[0]?.day?.maxtemp_f || "-"}
          °F
        </span>
        <span className="size-2">
          <span className="size-1">Min. Temp.</span>
          <br />
          {weather?.forecast?.forecast?.forecastday?.[0]?.day?.mintemp_c || "-"}
          °C /{" "}
          {weather?.forecast?.forecast?.forecastday?.[0]?.day?.mintemp_f || "-"}
          °F
        </span>
        {expand ? (
          <div className="col right">
            <span className="size-2">
              <span className="size-1">Sunrise / Sunset</span>
              <br />
              {weather?.forecast?.forecast?.forecastday?.[0]?.astro?.sunrise ||
                "-"}{" "}
              /{" "}
              {weather?.forecast?.forecast?.forecastday?.[0]?.astro?.sunset ||
                "-"}
            </span>
          </div>
        ) : undefined}
      </div>
      {expand ? (
        <div className="col --hidden-info">
          <span className="size-2">
            <span className="size-1">Wind Speed</span>
            <br />
            {weather?.forecast?.current?.wind_mph || "-"} mph /{" "}
            {weather?.forecast?.current?.wind_kph || "-"} kph
          </span>
          <span className="size-2">
            <span className="size-1">Humidity</span>
            <br />
            {weather?.forecast?.current?.humidity || "-"} mph /{" "}
            {weather?.forecast?.current?.humidity || "-"} kph
          </span>
          <span className="size-2">
            <span className="size-1">Pressure</span>
            <br />
            {weather?.forecast?.current?.pressure_mb || "-"} mb /{" "}
            {weather?.forecast?.current?.pressure_in || "-"} in
          </span>
        </div>
      ) : undefined}
      <div className="row right --toggle-button">
        {expand ? (
          <button
            onClick={() => useExpand(false)}
            className="toggle-more size-1"
            tabIndex={1}
          >
            Show less
          </button>
        ) : (
          <button
            onClick={() => useExpand(true)}
            className="toggle-more size-1"
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
