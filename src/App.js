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
      initialTemp: '',
      temp: '',
      location: '',
      icon: '',
      description: '',
      tempType: 'F'
    };
    this.handleTemp = this.handleTemp.bind(this);
  }

  getWeather() {
    
    let self = this;
    navigator.geolocation.getCurrentPosition(success);

    function success(position) {
      console.log(position.coords.latitude, position.coords.longitude);
      const yahooUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22("+position.coords.latitude+"%2C"+position.coords.longitude+")%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
      console.log(yahooUrl);
      fetch(yahooUrl)
        .then(function(response){
          response.json().then(function (data) {
            self.setState({
              initialTemp: data.query.results.channel.item.condition.temp,
              temp: data.query.results.channel.item.condition.temp,
              icon: "wi-yahoo-"+data.query.results.channel.item.condition.code,
              description: data.query.results.channel.item.condition.text,
              location: data.query.results.channel.location.city
            })
          })
        })
    }
  }
  
  handleTemp() {
    if (this.state.tempType==='F') {
      this.setState({
        temp: parseInt(((5*(this.state.initialTemp - 32)) / 9), 10)
      })
    }else {
      this.setState({
        temp: parseInt(((9*this.state.temp + (32*5))/5), 10)
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
    if (navigator.geolocation) {
      return (
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
      );
    } 
    else {
      return(
        <div>
          <LocationUnavailable />
        </div>
      )
    }
  }
}

export default App;
