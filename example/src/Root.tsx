/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import {
  StreamApp,
  StatusUpdateForm,
  FlatFeed,
  NotificationDropdown,
  Activity,
  ActivityFooter,
  LikeButton,
  CommentField,
  CommentList,
  CommentItem,
  InfiniteScrollPaginator,
  useStreamContext,
  Avatar,
} from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';

import './Root.css';

const apiKey = 'aqymkkv2z53t';
const appId = '1123024';

const Header = () => {
  const { userData } = useStreamContext();

  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar circle size={30} image={userData?.profileImage} />
        <span style={{ marginLeft: 5 }}>
          <strong>{`${userData?.name ?? 'User'}'s`}</strong> activity feed
        </span>
      </div>
      <NotificationDropdown right />
    </header>
  );
};

const ExampleFeed = ({ token, children }: any) => {
  return (
    <StreamApp apiKey={apiKey} appId={appId} token={token}>
      <div style={{ width: '50%', padding: 10 }}>
        <Header />

        <StatusUpdateForm />

        {children}
      </div>
    </StreamApp>
  );
};

const ExampleFlatFeed = ({ feedGroup: fg = 'user' }) => (
  <div className="custom-flat-feed" style={{ overflowY: 'auto', height: 'calc(100% - 318px)' }}>
    <FlatFeed
      notify
      feedGroup={fg}
      options={{ limit: 6, withOwnChildren: true, withRecentReactions: true }}
      Paginator={(props) => <InfiniteScrollPaginator {...props} useWindow={false} />}
      Activity={({ activity, feedGroup, userId }) => (
        <Activity
          activity={activity}
          feedGroup={feedGroup}
          userId={userId}
          Footer={() => (
            <>
              <ActivityFooter activity={activity} feedGroup={feedGroup} userId={userId} />
              <CommentField activity={activity} />
              <CommentList
                activityId={activity.id}
                CommentItem={({ comment }) => (
                  <div className="wrapper">
                    <CommentItem comment={comment} />
                    <LikeButton reaction={comment} />
                  </div>
                )}
              />
            </>
          )}
        />
      )}
    />
  </div>
);

const Root = () => {
  return (
    <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ height: '80%', backgroundColor: '#ddd', width: '80%', display: 'flex', borderRadius: 5 }}>
        <ExampleFeed token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmF0bWFuIn0.ZX6L04ANBi-lgN_qbjOxezxpuJDzYfX460jwayv_7h0">
          <ExampleFlatFeed feedGroup="timeline" />
        </ExampleFeed>
        <ExampleFeed token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicm9iaW4ifQ.PTGTKiZ0KvBuWV7g9F2uAbRy7j7TAnCTxxXggX-j9xU">
          <ExampleFlatFeed />
        </ExampleFeed>
      </div>
    </div>
  );
};

export default Root;
