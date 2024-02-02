import React, { useEffect } from "react";
import "../css/App.css";

function Weather() {
  const [temp, setTemp] = React.useState(null);
  const [searchCity, setSearchCity] = React.useState("Mumbai");


  function searchItem(e) {
  let  value = e.target.value;
    setSearchCity(value)
  }

  function getWeather() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=c863cc2b08a7f46d50c3ceb13e0b6f9b`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
   
        if(data.message=="city not found" || data.message=="Nothing to geocode"){
          setTemp("")
        }
        else{
        setTemp(data.main.temp)
        }
      });
  }

  useEffect(() => {
    getWeather();
  },[searchCity]);


  return (
    <div>
    <div className="box">
      <input className="input"
        onChange={searchItem}
        type="text"
        placeholder="Search"
      />
      </div>
      <div className="city">{temp}</div><br></br>
      <div className="data">{searchCity}</div>
</div>
  );
}

export default Weather;
