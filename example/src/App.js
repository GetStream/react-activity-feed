// @flow
import React, { Component } from 'react';

import {
  StreamApp,
  StatusUpdateForm,
  FlatFeed,
  NotificationDropdown,
  Activity,
  LikeButton,
} from 'react-activity-feed';
import 'react-activity-feed/dist/index.es.css';

export default class App extends Component<{}> {
  render() {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <StreamApp
          apiKey="3fjzn67nznwt"
          appId="41814"
          token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhhbXBsZS11c2VyIn0.XEKjtzD2AIQMLXH6kfJlL8P_JV4CBYvcMsmQCFjyY2U"
        >
          <div
            style={{
              background: '#fff', //#1A1A14
              height: 60,
              borderRadius: 4,
              margin: '10px 0',
              padding: '0 20px',
              boxShadow: '0px 0px 4px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <h3>React Activity Feed</h3>
            <NotificationDropdown arrow right />
          </div>
          <StatusUpdateForm />
          <FlatFeed
            feedGroup="user"
            notify
            Activity={(props) => (
              <Activity
                {...props}
                Footer={
                  <div style={{ padding: '8px 16px 0px' }}>
                    <LikeButton {...props} />
                  </div>
                }
              />
            )}
          />
        </StreamApp>
      </div>
    );
  }
}
