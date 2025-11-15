import "./current-weather.css";
import { 
  WiDaySunny, WiDayCloudy, WiCloud, WiCloudy, WiRain, WiThunderstorm, WiShowers,
  WiSnow, WiFog, WiSmoke, WiStrongWind, WiTornado
} from "react-icons/wi";

const CurrentWeather = ({ data }) => {

  // ---------- WEATHER ICON SELECTOR ----------
  const getWeatherIcon = (main, description) => {
    const d = description.toLowerCase();

    if (main === "Clear") return <WiDaySunny size={80} color="gold" />;

    if (main === "Clouds") {
      if (d.includes("few")) return <WiDayCloudy size={80} color="#d3d3d3" />;
      if (d.includes("scattered")) return <WiDayCloudy size={80} color="#d3d3d3" />;
      if (d.includes("broken") || d.includes("overcast")) return <WiCloudy size={80} color="#9ea7aa" />;
      return <WiCloud size={80} color="#b0b0b0" />;
    }

    if (main === "Rain") {
      if (d.includes("light")) return <WiRain size={80} color="#3b83f6" />;
      if (d.includes("moderate")) return <WiRain size={80} color="#3b83f6" />;
      if (d.includes("heavy") || d.includes("shower")) return <WiShowers size={80} color="#4a90e2" />;
      return <WiRain size={80} color="#3b83f6" />;
    }

    if (main === "Thunderstorm") return <WiThunderstorm size={80} color="#ffcc00" />;
    if (main === "Snow") return <WiSnow size={80} color="#a3e0ff" />;

    if (main === "Mist" || main === "Fog") return <WiFog size={80} color="#cfcfcf" />;
    if (main === "Smoke") return <WiSmoke size={80} color="#999" />;
    if (main === "Wind") return <WiStrongWind size={80} color="#aaa" />;

    if (main === "Tornado") return <WiTornado size={80} color="#777" />;

    // fallback
    return <WiDaySunny size={80} color="gold" />;
  };

  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>

        {/* ICON: match both main + description */}
        {getWeatherIcon(data.weather[0].main, data.weather[0].description)}
      </div>

      <div className="bottom">
        <p className="temprature">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">{Math.round(data.main.feels_like)}°C</span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
