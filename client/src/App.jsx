import "./css/app.css"

import { WeatherWidget } from "./components/WeatherWidget"
import { WeatherProvider } from "./contexts/WeatherContext"

function App() {
  return (
    <div className="wrapper weather-app">
      <WeatherProvider>
        <WeatherWidget />
      </WeatherProvider>
    </div>
  )
}

export default App
