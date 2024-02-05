import React, { useEffect,useState,useCallback } from "react";
import "../css/App.css";
const lodash = require("lodash");

function Weather() {
  const [temp, setTemp] = React.useState(null);
  const [searchCity, setSearchCity] = React.useState("Mumbai");
  const [savetoDB, setSaveToDb] = useState("");

//   function debounce(fn, delay) {
//     let timer;
//     return function () {
//       let context = this,
//         args = arguments;
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         fn.apply(this, args);
//       }, 1000);
//     };
//   }

//   const delaySaveToDb = useCallback(debounce((val)=>{
//     setSearchCity(val)
//   }
// , 1000), []);


  // const searchItem = (e) => {
  //   console.log("hi")
  //    delaySaveToDb(e.target.value);
  // };

  let searchItem = lodash.debounce(function (e) {
    let value = e.target.value;
    setSearchCity(value);
    console.log("Function debounced after 1000ms!");
  }, 1000);

  function getWeather() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=c863cc2b08a7f46d50c3ceb13e0b6f9b`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (
          data.message == "city not found" ||
          data.message == "Nothing to geocode"
        ) {
          setTemp("");
        } else {
          setTemp(data.main.temp);
        }
      });
  }

  useEffect(() => {
    getWeather();
  }, [searchCity]);

  return (
    <div className="div">
      <div className="box">
        <input
          className="input"
          onChange={searchItem}
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="city">{temp}</div>
      <br></br>
      <div className="data">{searchCity}</div>
    </div>
  );
}

export default Weather;
