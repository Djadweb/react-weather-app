import { useState } from 'react';
import './App.css';

function App() {
  const api = {
    key: "b786a238a8caefc275eeea8788a3a893",
    url: "https://api.openweathermap.org/data/2.5/"
  } 

  let [query, setQuery] = useState('');
  let [weather, setWeather] = useState('');

  const search = (e) => {
    if(e.key === "Enter") {
      fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(res => {
        setQuery('');
        setWeather(res);
        console.log(weather)
      })
    }
  }

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January","February","March","April","May","June","July",
                 "August","September","October","November","December"];  
  const dataBuilder = () => {
    let d = new Date();
    let date = d.getDate();
    let month = months[d.getMonth()];
    let day = days[d.getDay()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  }
  return (
    <div className="app" id={(typeof weather.main !== "undefined") ? ((weather.main.temp > 16) ? ('warm') : ('cold')) : ('warm')}>
      <main>
        <input 
        type="text" 
        placeholder="Search location" 
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
        />
        {(typeof weather.main !== "undefined") ? (
        <div className="results">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{ dataBuilder() }</div>
          <div className="weather-container">
            <div className="temperature">{weather.main.temp}°C</div>            
          </div>          
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        ): ('')}
      </main>
    </div>    
  );
}

export default App;
