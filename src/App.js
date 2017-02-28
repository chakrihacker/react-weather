import React, { Component } from 'react';
import './App.css';

class CurrentTemp extends React.Component {
  render() {
    return (
      <div className="currentTemp">
        <span className="temp">
          {this.props.temp}&deg;
        </span>
        <span className="location">
          {this.props.location}
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

  constructor(props) {
    super(props);
    this.state = {
      temp: '10',
      location: 'Vijayawada'
    };
  }

  getWeather() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      console.log('Browser Does not support location access or location permission is blocked');
    }

    function success(position) {
      let temp;
      const apikey = "baf6c6853241d66bcc45614cd1e3e901";
      const url = "http://api.openweathermap.org/data/2.5/weather?units=metric&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + apikey;
      let xhr = new XMLHttpRequest();
      console.log(url);
      xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          let jsondata = xhr.responseText;
          let data = JSON.parse(jsondata);
          temp = data.main.temp;
          console.log(temp);
        }
      };
      xhr.open("GET", url, true);
      xhr.send();
    };
  }

  componentDidMount() {
    this.getWeather();
  }

  render() {
    return (
      <div>
        <div className="weatherCard">
          <CurrentTemp
            temp={this.state.temp}
            location={this.state.location} />
          <CurrentWeather />
        </div>
        {/* <LocationUnavailable /> */}
      </div>
    );
  }
}

export default App;
