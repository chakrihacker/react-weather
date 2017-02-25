import React, { Component } from 'react';
import './App.css';

class CurrentTemp extends React.Component {
  
  getLocation () {
    
    function getWeather(lat, lon) {
      const apikey = "baf6c6853241d66bcc45614cd1e3e901";
      const url = "http://api.openweathermap.org/data/2.5/weather?units=metric&lat=" + lat + "&lon=" + lon + "&appid=" + apikey;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          let jsondata = xhr.responseText;
          let data = JSON.parse(jsondata);
          console.log(data.main.temp);
        }
      };
      xhr.open("GET", url, true);
      xhr.send();
    }
    
    function success(position) {
      getWeather(position.coords.latitude, position.coords.longitude);
    };
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      console.log('Browser Does not support location access or location permission is blocked');
    }
  }
  
  componentDidMount () {
    this.getLocation();
  }
  
  render() {
    return (
      <div className="currentTemp">
        <span className="temp">
          23&deg;
        </span>
        <span className="location">
          Hyderabad
        </span>
      </div>
    );
  }
}

class CurrentWeather extends React.Component {
  render () {
    return (
      <div className="currentWeather">
        <span className="conditions">
          &#xf00d;
        </span>
        <div className="info">
          <span className="rain">
            1.3 MM
          </span>
          <span className="wind">
            10 MPH
          </span>
        </div>
      </div>
    )
  }
}

class LocationUnavailable extends React.Component {
  render () {
    return (
      <div className="locationMessage">
        Browser Does not support location or location permission is blocked
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <div className="weatherCard">
          <CurrentTemp />
          <CurrentWeather />
        </div>
        {/* <LocationUnavailable /> */}
      </div>
    );
  }
}

export default App;
