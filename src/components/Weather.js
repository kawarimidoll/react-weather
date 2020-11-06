import React, { useState, useEffect } from "react";

const CITY_NAME = "Tokyo";
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME},jp&APPID=${API_KEY}&units=metric`;

const Weather = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({});

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setResult(jsonResponse);
        setLoading(false);
      });
  }, []);

  const { weather, main, wind, clouds } = result;
  console.log(weather, main, wind, clouds);

  return (
    <div>
      <h2>{CITY_NAME} </h2>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              alt={weather[0].description}
              className="mx-auto"
            />
            <h3>{weather[0].main}</h3>
          </div>
          <div>
            {main.temp_max} - {main.temp_min}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
