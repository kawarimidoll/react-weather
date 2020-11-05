import React from "react";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const Weather = () => {
  return (
    <div>
      <div>city name: Tokyo</div>
      <div>api key: {API_KEY}</div>
    </div>
  );
};

export default Weather;
