// @flow
import React, { Component } from 'react';

import { StreamApp, StatusUpdateForm, FlatFeed } from 'react-activity-feed';
import 'react-activity-feed/dist/index.es.css';

export default class App extends Component<{}> {
  render() {
    return (
      <div style={{ width: '600px', margin: '0 auto' }}>
        <StreamApp
          apiKey="3fjzn67nznwt"
          appId="41814"
          token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhhbXBsZS11c2VyIn0.XEKjtzD2AIQMLXH6kfJlL8P_JV4CBYvcMsmQCFjyY2U"
        >
          <StatusUpdateForm />
          <FlatFeed feedGroup="user" notify />
        </StreamApp>
      </div>
    );
  }
}
