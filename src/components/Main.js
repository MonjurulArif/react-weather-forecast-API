import React, { useEffect, useState } from "react";
import background from "../assets/background.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFaceFrown, faFaceSadTear, faTemperatureHalf, faTemperatureLow, faTemperatureHigh } from "@fortawesome/free-solid-svg-icons";
import { UilSearch, UilLocationPoint, iconUrlFromCode, UilTemperature, UilTear, UilWind, UilSun, UilSunset } from "@iconscout/react-unicons";

import { DateTime } from "luxon";
import { useLoaderData } from "react-router-dom";
// import { getFormattedWeatherData } from "../weatherInfo";

const Main = () => {
  const API_KEY = "2371457986af435418cd3666d3191525c25";
  const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

  const [forcast, setForcast] = useState({});
  const [city, setCity] = useState("Dhaka");

  const getWeatherData = async (city) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const data = await fetch(URL)
      .then((res) => res.json())
      .then((data) => setForcast(data))
      .catch((error) => {
        setForcast("null");
        console.error("Error : ", error);
      });
    // return data;
  };

  const handleSearch = async (event) => {
    const weatherData = await getWeatherData(city);
    setCity("");
  };

  useEffect(() => {
    getWeatherData(city);

    console.log("Load: ", forcast);
  }, []);

  const convertTimeStamp = (timestamp, timezone, type) => {
    const convertTimezone = timezone / 3600; // convert seconds to hours

    // multiplied by 1000 for seconds  to milliseconds
    const date = new Date(timestamp * 1000);

    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
      hour12: true,
    };
    const options2 = {
      hour: "numeric",
      minute: "numeric",
      timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
      hour12: true,
    };
    if (type === "sun") {
      return date.toLocaleTimeString("en-US", options2);
    }
    // console.log(date.toLocaleString(options));
    return date.toLocaleString("en-US", options);
  };

  const convertCountryCode = (country) => {
    let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(country);
  };

  return (
    <div>
      <div className=" w-full h-screen bg-cover relative">
        <img src={background} className="w-full h-full object-cover " alt="" />
        <div className="absolute top-[-20px] right-0 bottom-0 left-0 m-auto md:w-[540px] h-[570px] text-center text-black  rounded-xl border-cyan-700 bg-gray-800/70 ">
          <h1 className="font-serif text-5xl text-cyan-300 pt-2">
            Wether Forcast <span className="text-yellow-500 text-5xl">🌤</span>
          </h1>
          <br />
          <input
            value={city}
            onChange={(event) => setCity(event.currentTarget.value)}
            className="rounded-md text-black text-xl capitalize p-[-5px] pl-2 "
            type="text"
            name="searchName"
            id=""
            placeholder="Enter City or Country"
          />
          <span>
            <FontAwesomeIcon onClick={handleSearch} className="pl-2 text-xl text-lime-300 hover:text-emerald-300 hover:scale-125 cursor-pointer" icon={faSearch} />
          </span>

          {!(forcast && forcast.weather && forcast.main) && (
            <>
              <br />
              <br />
              <span className="error-message">
                <FontAwesomeIcon icon={faFaceSadTear} className="text-2xl text-yellow-400" />
                <span className="text-2xl text-yellow-400"> Sorry, City not found.</span>
              </span>
              <p className="text-2xl text-green-400">Search Again!!!</p>
            </>
          )}

          {forcast && forcast.weather && forcast.main && (
            <>
              <div>
                <div className="flex items-center justify-center my-6">
                  <p className="text-white text-xl font-extralight">{convertTimeStamp(forcast.dt, forcast.timezone)}</p>
                </div>

                <div className="flex items-center justify-center my-3">
                  <p className="text-white text-3xl font-medium">
                    {forcast.name}, {convertCountryCode(forcast.sys.country)}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center py-6 text-2xl text-cyan-300">
                  <p>{forcast.weather[0].description.toUpperCase()}</p>
                </div>

                <div className="flex flex-row items-center justify-around text-white py-3">
                  <div className="flex flex-row items-center justify-center">
                    <img src={iconUrlFromCode(forcast.weather[0].icon)} alt="" className="w-20" />
                    <span className="text-5xl ml-1">{forcast.main.temp.toFixed(2)}°C</span>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <div className="flex font-light text-sm items-center justify-center">
                      <UilTemperature size={18} className="mr-1" />
                      Real feel:
                      <span className="font-medium ml-1">{forcast.main.feels_like.toFixed(2)}°C</span>
                    </div>
                    <div className="flex font-light text-sm items-center justify-center">
                      <UilTear size={18} className="mr-1" />
                      Humidity:
                      <span className="font-medium ml-1">{forcast.main.humidity.toFixed(2)}%</span>
                    </div>
                    <div className="flex font-light text-sm items-center justify-center">
                      <UilWind size={18} className="mr-1" />
                      Wind:
                      <span className="font-medium ml-1">{forcast.wind.speed.toFixed(2)} km/h</span>
                    </div>
                  </div>
                </div>
                <br />
                <div className="pt-2">
                  <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-2">
                    <UilSun className="ml-3" />
                    <p className="font-light ">
                      {/* Rise: <span className="font-medium ">{convertTimeStamp(forcast.sys.sunrise, forcast.timezone, "sun")}</span> */}
                      Rise: <span className="font-medium ">{convertTimeStamp(forcast.sys.sunrise, forcast.timezone, "sun")}</span>
                    </p>
                    <p className="font-light">|</p>

                    <UilSunset />
                    <p className="font-light">
                      Set: <span className="font-medium ">{convertTimeStamp(forcast.sys.sunset, forcast.timezone, "sun")}</span>
                    </p>
                    <p className="font-light">|</p>

                    <FontAwesomeIcon icon={faTemperatureHigh} size="lg" className="text-sm" />
                    <p className="font-light">
                      High: <span className="font-medium ">{forcast.main.temp_max.toFixed(2)}°C</span>
                    </p>
                    <p className="font-light">|</p>

                    <FontAwesomeIcon icon={faTemperatureLow} />
                    <p className="font-light">
                      Low: <span className="font-medium mr-1">{forcast.main.temp_min.toFixed(2)}°C</span>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
