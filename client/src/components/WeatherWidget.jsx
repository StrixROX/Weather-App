import { useContext } from "react"
import { WeatherContext } from "../contexts/WeatherContext"

function WeatherWidget() {
  const weather = useContext(WeatherContext)

  const getLocation = () => {
    const locationData = weather?.current?.location
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
      <p>Weather: {weather?.current?.current?.condition?.text || "-"}</p>
      <p>
        Temperature: {weather?.current?.current?.temp_c || "-"}°C /{" "}
        {weather?.current?.current?.temp_f || "-"}°F
      </p>
      <p>
        Feels Like: {weather?.current?.current?.feelslike_c || "-"}°C /{" "}
        {weather?.current?.current?.feelslike_f || "-"}°F
      </p>
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
      <p></p>
      {/* <pre>{JSON.stringify(weather, null, 2)}</pre> */}
    </div>
  )
}

export { WeatherWidget }
