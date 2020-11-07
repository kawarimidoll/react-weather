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

  const getIcon = (weather, sunrise, sunset) => {
    const now = new Date();
    const iconId =
      new Date(sunrise * 1000) < now && now < new Date(sunset * 1000)
        ? weather.icon.replace("n", "d")
        : weather.icon.replace("d", "n");
    return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
  };

  const getTime = (unixTime) => {
    const time = new Date(unixTime * 1000);
    const padZero = (num) => `${num > 10 ? "" : "0"}${num}`;
    return `${padZero(time.getHours())}:${padZero(time.getMinutes())}`;
  };

  return (
    <div>
      <h2>{CITY_NAME}</h2>
      {loading ? (
        <div>loading...</div>
      ) : message ? (
        <div>{message}</div>
      ) : current.weather ? (
        <div>
          {current.weather.map((weather, index) => (
            <div key={`weather-${index}`}>
              <img
                src={getIcon(weather, current.sunrise, current.sunset)}
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
          <div>sunrise {getTime(current.sunrise)}</div>
          <div>sunset {getTime(current.sunset)}</div>
        </div>
      ) : (
        <div>Something wrong...</div>
      )}
    </div>
  );
};

export default Weather;
