import React, { Component } from 'react';
import './App.css';

class CurrentTemp extends React.Component {
  
  render() {
    return (
      <div className="currentTemp">
        <span className="temp">
          {this.props.temp}&deg;
          <a href='#' className='convertTemp' onClick={this.props.handleTempConversion}>{this.props.tempType}</a>
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
        <span className={"conditions "+ this.props.icon}></span>
        <div className="info">
          <span className="description">
            	{this.props.description}
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
      temp: '',
      location: '',
      icon: '',
      description: '',
      tempType: 'C'
    };
    this.handleTemp = this.handleTemp.bind(this);
  }

  getWeather() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      console.log('Browser Does not support location access or location permission is blocked');
    }

	  let self = this;

    function success(position) {
      const apikey = "baf6c6853241d66bcc45614cd1e3e901";
      const url = "http://api.openweathermap.org/data/2.5/weather?units=metric&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + apikey;
      let xhr = new XMLHttpRequest();
      console.log(url);
      xhr.onreadystatechange = function() {
	      let temp, location, icon, description;
        if (this.readyState === 4 && this.status === 200) {
          let jsondata = xhr.responseText;
          let data = JSON.parse(jsondata);
          temp = parseInt(data.main.temp, 10);
          location = data.name;
          icon = data.weather[0].id;
          description = data.weather[0].description;
          console.log(icon, description);
	        self.setState({
		        temp: temp,
		        location: location,
            icon: "wi-owm-"+icon,
            description: description
	        });
        }
      };
      xhr.open("GET", url, true);
      xhr.send();
    }
  }
  
  handleTemp() {
    if (this.state.tempType==='C') {
      this.setState({
        temp: parseInt((9*this.state.temp + (32*5))/5)
      })
    }else {
      this.setState({
        temp: parseInt((5*(this.state.temp - 32)) / 9)
      })
    }
    this.setState({
      tempType: this.state.tempType==='F' ? 'C' : 'F'
    })
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
            location={this.state.location}
            tempType={this.state.tempType}
            handleTempConversion={this.handleTemp} />
          <CurrentWeather
            icon={this.state.icon}
            description={this.state.description} />
        </div>
        {/* <LocationUnavailable /> */}
      </div>
    );
  }
}

export default App;
