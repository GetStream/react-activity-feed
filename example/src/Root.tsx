import React, { useEffect, useState, useMemo, PropsWithChildren } from 'react';

import { capitalize } from 'lodash';
import decodeToken from 'jwt-decode';

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
  Button,
  Title,
} from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';

import './Root.css';

// move these to .env
const apiKey = 'aqymkkv2z53t';
const appId = '1123024';

const Header = ({ onTitleClick }: { onTitleClick: React.MouseEventHandler<HTMLDivElement> }) => {
  const { userData } = useStreamContext();

  return (
    <header className="ea-column-header">
      <div onClick={onTitleClick} className="ea-column-header-title">
        <Avatar circle size={30} image={userData?.profileImage} />
        <span>
          <strong>{`${userData?.name ?? 'User'}'s`}</strong> activity feed
        </span>
      </div>

      <NotificationDropdown right />
    </header>
  );
};

const FollowButton = ({ userId }: Record<'userId', string>) => {
  const { client } = useStreamContext();
  const [followingUser, setFollowingUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      // add Robins user (feed group 'user') feed to Batman
      await client?.feed('timeline')[followingUser ? 'unfollow' : 'follow']('user', userId);
    } catch {
      console.error(`Error while trying to follow user with user_id: ${userId}`);
    }
    setLoading(false);

    setFollowingUser((pv) => !pv);
  };

  useEffect(() => {
    client
      ?.feed('timeline')
      .following({ filter: [`user:${userId}`] })
      .then(({ results }) => {
        setFollowingUser(!!results.length);
      });
  }, []);

  return (
    <Button loading={loading} type="button" onClick={handleButtonClick}>
      {followingUser ? 'Unfollow' : 'Follow'} {capitalize(userId)}
    </Button>
  );
};

const ExampleFeed = ({
  token,
  children,
  isVisibleInMobile,
  onHeaderTitleClick,
}: PropsWithChildren<
  Record<'token', string> & {
    isVisibleInMobile: boolean;
    onHeaderTitleClick: React.MouseEventHandler<HTMLDivElement>;
  }
>) => {
  const currentUserId = useMemo(() => decodeToken(token), [token]) as Record<'user_id', string>;

  return (
    <StreamApp apiKey={apiKey} appId={appId} token={token}>
      <div className={`ea-column ${isVisibleInMobile ? '' : 'ea-column__hidden'}`}>
        <Header onTitleClick={onHeaderTitleClick} />

        <StatusUpdateForm
          Header={
            <div className="ea-panel-header">
              <Title>New post</Title>
              {currentUserId.user_id === 'batman' && <FollowButton userId="robin" />}
            </div>
          }
        />

        {children}
      </div>
    </StreamApp>
  );
};

const ExampleFlatFeed = ({ feedGroup: fg = 'user' }) => (
  <div className="ea-column-content">
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
                reverseOrder
                activityId={activity.id}
                CommentItem={({ comment }) => (
                  <div className="ea-comment-item">
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

export const Root = () => {
  const [isLeftColumnVisible, setLeftColumnVisible] = useState(true);

  return (
    <div className="ea-root">
      <div className="ea-content">
        <div className="ea-suggestion-bar">Click on title below to switch between feeds</div>
        {/* Batman */}
        <ExampleFeed
          isVisibleInMobile={isLeftColumnVisible}
          onHeaderTitleClick={() => setLeftColumnVisible(false)}
          token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmF0bWFuIn0.ZX6L04ANBi-lgN_qbjOxezxpuJDzYfX460jwayv_7h0"
        >
          <ExampleFlatFeed feedGroup="timeline" />
        </ExampleFeed>
        {/* Robin */}
        <ExampleFeed
          isVisibleInMobile={!isLeftColumnVisible}
          onHeaderTitleClick={() => setLeftColumnVisible(true)}
          token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicm9iaW4ifQ.PTGTKiZ0KvBuWV7g9F2uAbRy7j7TAnCTxxXggX-j9xU"
        >
          <ExampleFlatFeed />
        </ExampleFeed>
      </div>
    </div>
  );
};
