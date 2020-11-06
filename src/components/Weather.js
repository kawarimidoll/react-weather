import React, { useReducer, useEffect } from "react";

const CITY_NAME = "Tokyo";
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME},jp&APPID=${API_KEY}&units=metric`;

const initialState = {
  loading: true,
  message: "",
  weather: [],
  main: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST":
      return {
        ...state,
        loading: true,
        message: "",
      };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        weather: action.weather,
        main: action.main,
      };
    case "FAILURE":
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    default:
      return state;
  }
};

const Weather = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "REQUEST" });

    fetch(API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        dispatch({
          type: jsonResponse.cod === 200 ? "SUCCESS" : "FAILURE",
          ...jsonResponse,
        });
      });
  }, []);

  const { loading, weather, main, message } = state;
  // console.log(weather, main, wind, clouds);

  return (
    <div>
      <h2>{CITY_NAME}</h2>
      {loading ? (
        <div>loading...</div>
      ) : message ? (
        <div>{message}</div>
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
            {main.temp_max}℃ - {main.temp_min}℃
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
