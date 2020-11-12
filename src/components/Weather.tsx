import React, { useReducer, useEffect } from "react";

const CITY_NAME = "Tokyo";
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const LAT = process.env.REACT_APP_LAT;
const LON = process.env.REACT_APP_LON;
const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&APPID=${API_KEY}&units=metric&exclude=minutely,hourly,daily`;

interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}
interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  clouds: number;
  uvi: number;
  visibillity: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherData[];
}
interface State {
  loading: boolean;
  message?: string;
  current?: Current;
}
interface Action {
  type: string;
  message?: string;
  current?: Current;
}

const initialState: State = {
  loading: true,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "REQUEST":
      return initialState;
    case "VIEW":
      return { loading: false, ...action };
    case "ERROR":
      return { loading: false};
    default:
      return state;
  }
};

const Weather: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(API_URL);

  useEffect(() => {
    dispatch({ type: "REQUEST" });

    fetch(API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => dispatch({ type: "VIEW", ...jsonResponse }))
      .catch((error) => {
        dispatch({ type: "ERROR" });
        console.error(error);
      });
  }, []);

  const { loading, current, message } = state;
  // console.log(state);

  const getIcon = (
    icon: string,
    dt: number,
    sunrise: number,
    sunset: number
  ): string =>
    `https://openweathermap.org/img/wn/${icon.slice(0, -1)}${
      sunrise < dt && dt < sunset ? "d" : "n"
    }@2x.png`;

  const getTime = (unixTime: number): string => {
    const time: Date = new Date(unixTime * 1000);
    const padZero = (num: number): string => `${num < 10 ? "0" : ""}${num}`;
    return `${padZero(time.getHours())}:${padZero(time.getMinutes())}`;
  };

  return (
    <div>
      <h2>{CITY_NAME}</h2>
      {loading ? (
        <div>loading...</div>
      ) : message ? (
        <div>{message}</div>
      ) : current && current.weather ? (
        <div>
          <div className="flex justify-center">
            {current.weather.map((weather: WeatherData, index: number) => (
              <div key={`weather-${index}`}>
                <img
                  src={getIcon(
                    weather.icon,
                    current.dt,
                    current.sunrise,
                    current.sunset
                  )}
                  alt={weather.description}
                />
                <h3>{weather.main}</h3>
              </div>
            ))}
          </div>
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
