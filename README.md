# Official React SDK for [Stream Activity Feed](https://getstream.io/activity-feeds/)

> The official React components for Stream Activity Feed, a service for building activity and notification feed applications.

[![NPM](https://img.shields.io/npm/v/react-activity-feed.svg)](https://www.npmjs.com/package/react-activity-feed)
[![CI](https://github.com/GetStream/react-activity-feed/workflows/Test/badge.svg)](https://github.com/GetStream/react-activity-feed/actions)
[![Component Reference](https://img.shields.io/badge/docs-component%20reference-blue.svg)](https://getstream.github.io/react-activity-feed/)

You can sign up for a Stream account at [Get Started](https://getstream.io/get_started/).

Note: The user interface for the activity feed can vary widely across different apps. Most of our activity feed customers integrate with Stream via their backend and build their own UI. This takes advantage of Stream’s scalability while keeping full control over the UI. This library is only updated and improved sporadically.

## Install

```bash
# with npm
npm install --save react-activity-feed
# with yarn
yarn add react-activity-feed
```

## Usage

To find out how to use this library please look at:

1. [The example project](https://github.com/GetStream/react-activity-feed/tree/main/example)
2. The [component reference docs](https://getstream.github.io/react-activity-feed/)
3. This basic example if you just want to see some code:

```jsx
import { StreamApp, StatusUpdateForm, FlatFeed } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';

// How to create user tokens: https://getstream.io/activity-feeds/docs/node/auth_and_permissions/?language=javascript#user-tokens

const App = () => {
  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <StreamApp apiKey="<YOUR_API_KEY>" appId="<YOUR_APP_ID>" token="<TOKEN_FOR_THE_CURRENT_USER>">
        <StatusUpdateForm />
        <FlatFeed feedGroup="user" notify />
      </StreamApp>
    </div>
  );
};
```

## Internationalisation (i18n)

Please refer to [i18n docs](https://getstream.github.io/react-activity-feed/#internationalisation-i18n)

## License

BSD-3-Clause © [Stream.io Inc.](https://getstream.io)

## We are hiring

We've recently closed a [$38 million Series B funding round](https://techcrunch.com/2021/03/04/stream-raises-38m-as-its-chat-and-activity-feed-apis-power-communications-for-1b-users/) and we keep actively growing.
Our APIs are used by more than a billion end-users, and you'll have a chance to make a huge impact on the product within a team of the strongest engineers all over the world.

Check out our current openings and apply via [Stream's website](https://getstream.io/team/#jobs).
