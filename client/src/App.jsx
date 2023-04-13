import "./css/app.css"

import { useState, useEffect } from "react"
import { WeatherWidget } from "./components/WeatherWidget"
import { WeatherProvider } from "./contexts/WeatherContext"

function App() {
  const [fullscreenView, useFullscreenView] = useState(false)

  // tracks viewport size
  useEffect(() => {
    const handleWindowResize = () => {
      const currWidth = window.innerWidth
      const currHeight = window.innerHeight

      if (currWidth < 700 || currHeight < 700) {
        useFullscreenView(true)
      } else {
        useFullscreenView(false)
      }
    }
    handleWindowResize()

    window.addEventListener("resize", handleWindowResize)

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  return (
    <div className="wrapper weather-app">
      <WeatherProvider>
        <WeatherWidget fullscreen={fullscreenView} />
      </WeatherProvider>
    </div>
  )
}

export default App
