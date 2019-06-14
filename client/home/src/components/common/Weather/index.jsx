import React, { Component } from 'react';

export default class Weather extends Component {
  state={
    days: [
      {
        day: 'Wed',
        celicious: '27 C',
      },
      {
        day: 'Thu',
        celicious: '23 C',
      }, {
        day: 'Fri',
        celicious: '29 C',
      },
    ],
    celiciouss: '25 C',
  }

  render() {
    const { days, celiciouss } = this.state;
    return (
      <div className="widget weather">
        <h3 className="widget-title heading relative heading-small uppercase bottom-line style-2 left-align">Weather</h3>
        <div className="weather-box">
          <div className="weather-wrap clearfix">
            <div className="weather-main left">
              <h5>Manchester</h5>
              <ul>
                <li>Sun with clouds</li>
                <li>Humidity: 80%</li>
                <li>Wind: 10 km/h</li>
              </ul>
            </div>
            <div className="weather-temp right text-center">
              <i className="fas fa-cloud-sun" />
              <span className="temp-main">{celiciouss}</span>
            </div>
          </div>
          <ul className="week-days">
            {days && days.map(({ day, celicious }) => (
              <li>
                {celicious}
                <span>{day}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    );
  }
}
