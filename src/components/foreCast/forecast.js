import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import {
  WiDaySunny, WiDayCloudy, WiCloud, WiRain, WiThunderstorm,
  WiSnow, WiFog
} from "react-icons/wi";

import "./forecast.css";

const getWeatherIcon = (weather) => {
  const desc = weather.toLowerCase();

  if (desc.includes("clear")) return <WiDaySunny size={40} className="icon-small" />;
  if (desc.includes("cloud")) return <WiCloud size={40} className="icon-small" />;
  if (desc.includes("rain")) return <WiRain size={40} className="icon-small" />;
  if (desc.includes("thunder")) return <WiThunderstorm size={40} className="icon-small" />;
  if (desc.includes("snow")) return <WiSnow size={40} className="icon-small" />;
  if (desc.includes("fog") || desc.includes("mist")) return <WiFog size={40} className="icon-small" />;

  return <WiDayCloudy size={40} className="icon-small" />;
};

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS
    .slice(dayInAWeek, WEEK_DAYS.length)
    .concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  
                  {/* WEATHER ICON REPLACED HERE */}
                  {getWeatherIcon(item.weather[0].main)}

                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">{item.weather[0].description}</label>
                  <label className="min-max">
                    {Math.round(item.main.temp_max)}°C /
                    {Math.round(item.main.temp_min)}°C
                  </label>

                </div>
              </AccordionItemButton>
            </AccordionItemHeading>

            <AccordionItemPanel>
              <div className="daily-details-grid">

                <div className="daily-details-grid-item">
                  <label>Pressure:</label>
                  <label>{item.main.pressure} hPa</label>
                </div>

                <div className="daily-details-grid-item">
                  <label>Humidity:</label>
                  <label>{item.main.humidity}%</label>
                </div>

                <div className="daily-details-grid-item">
                  <label>Clouds:</label>
                  <label>{item.clouds.all}%</label>
                </div>

                <div className="daily-details-grid-item">
                  <label>Wind speed:</label>
                  <label>{item.wind.speed} m/s</label>
                </div>

                <div className="daily-details-grid-item">
                  <label>Sea level:</label>
                  <label>{item.main.sea_level}m</label>
                </div>

                <div className="daily-details-grid-item">
                  <label>Feels like:</label>
                  <label>{item.main.feels_like}°C</label>
                </div>

              </div>
            </AccordionItemPanel>

          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
