import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import { convertImage } from '../../../appRedux/actions';

export default class Galleries extends Component {
  state={
    galleries: [

    ],
  }

  componentDidMount = async () => {
    const result = await axios('/api/v2/gallery');  
    const { data } = result;
    const { pic } = data[0];

    this.setState({ galleries: pic });
  }

  render() {
    const { galleries } = this.state;
    return (
      <div className="widget weather">
        <h3 className="widget-title heading relative heading-small uppercase bottom-line style-2 left-align">Galleries</h3>
        <ul className="gallery-list clearfix">
          {galleries && galleries.map(item => (
            <li>
              <article className="entry-img hover-scale">
                <img src={`/api/v2/files/getFile/${item}`} alt="" className="image__gallery" />
              </article>
            </li>

          ))}
        </ul>
      </div>
    );
  }
}
