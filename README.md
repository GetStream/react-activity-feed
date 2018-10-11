# react-activity-feed

> React components to create activity and notification feeds

[![NPM](https://img.shields.io/npm/v/react-activity-feed.svg)](https://www.npmjs.com/package/react-activity-feed)

## Install

```bash
# with npm
npm install --save react-activity-feed
# with yarn
yarn add react-activity-feed
```

## Usage

```jsx
import React, { Component } from 'react';

import { StreamApp, StatusUpdateForm, FlatFeed } from 'react-activity-feed';
import 'react-activity-feed/dist/index.es.css';

export default class App extends Component<{}> {
  render() {
    return (
      <div style={{ width: '600px', margin: '0 auto' }}>
        <StreamApp
          apiKey="<YOUR_API_KEY>"
          appId="<YOUR_APP_ID>"
          token="<A_TOKEN_FOR_THE_CURRENT_USER>"
        >
          <StatusUpdateForm />
          <FlatFeed feedGroup="user" notify />
        </StreamApp>
      </div>
    );
  }
}
```

## License

BSD-3-Clause © [Stream.io Inc.](https://getstream.io)
