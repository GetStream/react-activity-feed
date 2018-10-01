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
            'https://placehold.it/600x400',
            'https://placehold.it/600x600',
          ]}
        />
      </div>
    );
  }
}
