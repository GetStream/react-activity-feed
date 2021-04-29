import React from 'react';

import {
  StreamApp,
  StatusUpdateForm,
  FlatFeed,
  NotificationDropdown,
  Activity,
  LikeButton,
  CommentField,
  CommentList,
  CommentItem,
  InfiniteScrollPaginator,
} from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';

const apiKey = 'sesb46h7zb6p';
const appId = '66001';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmF0bWFuIn0.8aYd7O_fx-1YMx28DXG1n274o4pa3SjHnRM8AIHLqkE';

function App() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <StreamApp apiKey={apiKey} appId={appId} token={token}>
        <div
          style={{
            background: '#fff',
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
          <NotificationDropdown right />
        </div>
        <StatusUpdateForm />
        <FlatFeed
          feedGroup="user" // or timeline
          notify
          options={{ limit: 6, withOwnChildren: true, withRecentReactions: true }}
          Paginator={(props) => <InfiniteScrollPaginator {...props} />}
          Activity={(props) => (
            <Activity
              {...props}
              Footer={() => (
                <React.Fragment>
                  <CommentField activity={props.activity} />
                  <CommentList
                    activityId={props.activity.id}
                    CommentItem={(commentProps) => (
                      <React.Fragment>
                        <CommentItem {...commentProps} />
                        <LikeButton reaction={commentProps.comment} />
                      </React.Fragment>
                    )}
                  />
                </React.Fragment>
              )}
            />
          )}
        />
      </StreamApp>
    </div>
  );
}
export default App;
