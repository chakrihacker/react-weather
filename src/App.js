import React, { Component } from 'react';
import './App.css';

function getWeather(lat, lon) {
  let temp;
  const apikey = "baf6c6853241d66bcc45614cd1e3e901";
  const url = "http://api.openweathermap.org/data/2.5/weather?units=metric&lat=" + lat + "&lon=" + lon + "&appid=" + apikey;
  let xhr = new XMLHttpRequest();
  console.log(url);
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let jsondata = xhr.responseText;
      let data = JSON.parse(jsondata);
      temp = data.main.temp;
      console.log(data.main.temp);
    }
  };
  return temp;
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

class CurrentTemp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      temp: '10',
      location: 'Vijayawada'
    }
  }
  
  render() {
    return (
      <div className="currentTemp">
        <span className="temp">
          {this.state.temp}&deg;
        </span>
        <span className="location">
          {this.state.location}
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
