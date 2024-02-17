import React, { useState } from "react";
import Search from "./Search";
import "../Styles/Weather.css";

function Weather() {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e`
      );

      const data = await response.json();

      if (data) {
        setWeatherData(data);
        setLoading(false);
      }

      console.log(data);

      setWeatherData(data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching weather data:", error);
    }
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function handleSearch() {
    fetchWeatherData(searchValue);
  }

  return (
    <div className="all">
      <Search
        search={searchValue}
        setSearch={setSearchValue}
        handleSearch={handleSearch}
      />

      {loading ? (
        <div> </div>
      ) : (
        <div  className="weather-all" >
          <div className="city-name">
            <h1>
              
              {weatherData?.name} , <span>{weatherData?.sys?.country}</span>{" "}
            </h1>
          </div>

        
            <div className="date">
              <span>{getCurrentDate()} </span>
            </div>
          
          <div className="temp" > {(weatherData?.main?.temp-273.15 ).toFixed(0)  } °C  </div>
          <p className="description"> {weatherData &&weatherData.weather &&  weatherData.weather[0] ? weatherData.weather[0].description : ""}  </p>
       
       <div className="weather-info"> 


       <div className="wind">
        <p> {weatherData?.wind?.speed}  </p>
        <p> Wind Speed  </p>
        </div> 

        <div className="humidity">
        <p> {weatherData?.main?.humidity} %  </p>
        <p> Humidity  </p>
        </div> 
         </div  >
       
        </div>
        

      )}
    </div>
  );
}

export default Weather;
