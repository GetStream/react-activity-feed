// @flow
import React, { Component } from 'react';

import { Gallery } from 'react-activity-feed';

export default class App extends Component {
  render() {
    return (
      <div>
        <Gallery
          images={[
            'https://www.w3schools.com/w3images/fjords.jpg',
            'https://www.w3schools.com/w3images/fjords.jpg',
            'https://www.w3schools.com/w3images/fjords.jpg',
            'https://www.w3schools.com/w3images/fjords.jpg',
            'https://www.w3schools.com/w3images/fjords.jpg',
            'https://www.w3schools.com/w3images/fjords.jpg',
          ]}
        />
      </div>
    );
  }
}
