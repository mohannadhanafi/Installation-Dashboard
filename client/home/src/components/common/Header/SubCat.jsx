import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SubCat extends Component {
    state={}

    render() {
      const elements = [];
      const { cats, id } = this.props;
      if (cats && cats.length) {
        cats.map((element) => {
          if (element.parent === id) {
            elements.push(element);
          }
          return elements;
        });
      }

      return (

        elements.length ? (

          <ul className="dropdown-menu">

            { elements.map(element => (
              <>
                <li>
                  <Link
                    className="dropdown-item"
                    to={`/news/${element.seo}`}
                  >
                    {element.name}
                  </Link>
                </li>
              </>
            ))}
          </ul>
        ) : null
      );
    }
}
