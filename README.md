# react-activity-feed

> React components to create activity and notification feeds using Stream

[![NPM](https://img.shields.io/npm/v/react-activity-feed.svg)](https://www.npmjs.com/package/react-activity-feed)
[![Build Status](https://travis-ci.org/GetStream/react-activity-feed.svg?branch=master)](https://travis-ci.org/GetStream/react-activity-feed)
[![Component Reference](https://img.shields.io/badge/docs-component%20reference-blue.svg)](https://getstream.github.io/react-activity-feed/)

You can sign up for a Stream account at https://getstream.io/get_started/.

## Install

```bash
# with npm
npm install --save react-activity-feed
# with yarn
yarn add react-activity-feed
```

## Usage

To find out how to use this library please look at:

1. [The example
   project](https://github.com/GetStream/react-activity-feed/tree/master/example)
2. The [component reference docs](https://getstream.github.io/react-activity-feed/)
3. This basic example if you just want to see some code:

```jsx
import React, { Component } from 'react';

import { StreamApp, StatusUpdateForm, FlatFeed } from 'react-activity-feed';
import 'react-activity-feed/dist/index.es.css';

export default class App extends Component {
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
