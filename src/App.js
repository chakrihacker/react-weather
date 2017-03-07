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

class Loading extends React.Component {
  render() {
    return(
      <div className="weatherCard loader--style1" title="0">
        <svg height="100px" id="loader-1" width="100px" version="1.1" viewBox="0 0 40 40" x="0px" y="0px" xmlSpace="preserve">
          <path d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946&#xA;    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634&#xA;    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" fill="#000" opacity="0.2"/>
          <path d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0&#xA;    C22.32,8.481,24.301,9.057,26.013,10.047z" fill="#000">
            <animateTransform attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 20 20"
              to="360 20 20"
              dur="0.5s"
              repeatCount="indefinite"/>
          </path>
        </svg>
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
      tempType: 'F',
      isLoading: true,
      isLocationAvailable: true
    };
    this.handleTemp = this.handleTemp.bind(this);
  }

  getWeather() {

    let self = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function error() {
      self.setState({
        isLocationAvailable: false,
        isLoading: false
      });
    }

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
              location: data.query.results.channel.location.city,
              isLoading: false
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
        if (this.state.isLoading) {
          return(
            <div className="weatherCard">
              <Loading />
            </div>
            );
        } else if (this.state.isLocationAvailable) {
          return(
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
          )
        } else {
          return(
            <div className="weatherCard">
              <LocationUnavailable />
            </div>
          );
        }
  }
}

export default App;
