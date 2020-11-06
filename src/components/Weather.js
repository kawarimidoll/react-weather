import React, { useReducer, useEffect } from "react";

const CITY_NAME = "Tokyo";
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const LAT = process.env.REACT_APP_LAT;
const LON = process.env.REACT_APP_LON;
const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&APPID=${API_KEY}&units=metric&exclude=minutely,hourly,daily`;

const initialState = {
  loading: true,
  message: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST":
      return { ...initialState };
    case "VIEW":
      return { loading: false, ...action };
    case "ERROR":
      return { loading: false };
    default:
      return state;
  }
};

const Weather = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(API_URL);

  useEffect(() => {
    dispatch({ type: "REQUEST" });

    fetch(API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => dispatch({ type: "VIEW", ...jsonResponse }))
      .catch((error) => dispatch({ type: "ERROR" }));
  }, []);

  const { loading, current, message } = state;
  // console.log(state);

  return (
    <div>
      <h2>{CITY_NAME}</h2>
      {loading ? (
        <div>loading...</div>
      ) : message ? (
        <div>{message}</div>
      ) : current.weather ? (
        <div>
          {current.weather.map((weather) => (
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                className="mx-auto"
              />
              <h3>{weather.main}</h3>
            </div>
          ))}
          <div>{current.temp}℃</div>
          <div>feels like {current.feels_like}℃</div>
          <div>pressure {current.pressure} hPa</div>
          <div>humidity {current.humidity} %</div>
          <div>clouds {current.clouds} %</div>
        </div>
      ) : (
        <div>Something wrong...</div>
      )}
    </div>
  );
};

export default Weather;
