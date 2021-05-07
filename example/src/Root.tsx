import React, { useEffect, useState, PropsWithChildren, useRef, useCallback } from 'react';

import { capitalize } from 'lodash';
import { UR } from 'getstream';

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
  useFeedContext,
} from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';

import './Root.css';

// move these to .env
const apiKey = 'aqymkkv2z53t';
const appId = '1123024';

const Header = ({
  onTitleClick,
  children,
  title,
}: PropsWithChildren<{ onTitleClick: React.MouseEventHandler<HTMLDivElement>; title?: string }>) => {
  const { userData } = useStreamContext();

  return (
    <header className="ea-column-header">
      <div onClick={onTitleClick} className="ea-column-header-title">
        <Avatar circle size={30} image={userData?.profileImage} />
        <span>
          <strong>{`${userData?.name ?? 'User'}'s`}</strong> {title ?? 'activity feed'}
        </span>
      </div>

      {children}
    </header>
  );
};

const FollowButton = ({ userId, onSuccess }: Record<'userId', string> & { onSuccess?: () => void }) => {
  const { client } = useStreamContext();
  const [followingUser, setFollowingUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      // add Robin's user feed (feed group 'user') to Batman's timeline feed (feed group timeline)
      await client?.feed('timeline')[followingUser ? 'unfollow' : 'follow']('user', userId);
    } catch {
      console.error(`Error while trying to follow user with user_id: ${userId}`);
    }
    setLoading(false);

    onSuccess?.();
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
  className = '',
}: PropsWithChildren<
  Record<'token', string> & {
    isVisibleInMobile: boolean;
    className?: string;
  }
>) => (
  <StreamApp apiKey={apiKey} appId={appId} token={token}>
    <div className={`ea-column ${isVisibleInMobile ? '' : 'ea-column__hidden'} ${className}`.trim()}>{children}</div>
  </StreamApp>
);

const ExampleContent = ({ children }: PropsWithChildren<UR>) => <div className="ea-column-content">{children}</div>;

type SetRefresh = (f: unknown) => void;

// workaround for exposing refresh method of the
// feed manager outside feed context
const ExposeRefresh = ({ setRefresh }: { setRefresh?: SetRefresh }) => {
  const { refresh } = useFeedContext();

  useEffect(() => {
    setRefresh?.(refresh);
  }, []);

  return null;
};

const ExampleFlatFeed = ({ feedGroup: fg = 'user', setRefresh }: { feedGroup?: string; setRefresh?: SetRefresh }) => (
  <FlatFeed
    notify
    feedGroup={fg}
    options={{ limit: 6, withOwnChildren: true, withRecentReactions: true }}
    Paginator={(props) => (
      <>
        {setRefresh && <ExposeRefresh setRefresh={setRefresh} />}
        <InfiniteScrollPaginator {...props} useWindow={false} />
      </>
    )}
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
);

const Modal = ({ open = false, onClose, children }: PropsWithChildren<{ onClose?: () => void; open?: boolean }>) => {
  const modalContentReference = useRef<HTMLDivElement>(null);
  if (!open) return null;
  return (
    <>
      <div onClick={onClose} className="ea-modal-backdrop" />
      <div
        ref={modalContentReference}
        onClick={(e) => {
          if (e.target !== modalContentReference.current) return;
          onClose?.();
        }}
        className="ea-modal-content"
      >
        {children}
      </div>
    </>
  );
};

export const Root = () => {
  const [isLeftColumnVisible, setLeftColumnVisible] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const refreshReference = useRef<unknown>();
  const setRefresh = useCallback((refresh) => (refreshReference.current = refresh), []);

  return (
    <div className="ea-root">
      <div className="ea-content">
        <div className="ea-suggestion-bar">Click on title below to switch between feeds</div>

        {/* Batman */}
        <ExampleFeed
          isVisibleInMobile={isLeftColumnVisible}
          token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmF0bWFuIn0.ZX6L04ANBi-lgN_qbjOxezxpuJDzYfX460jwayv_7h0"
          className="ea-column__left"
        >
          <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
            <StatusUpdateForm onSuccess={() => setModalOpen(false)} />
          </Modal>

          <Header title="timeline feed" onTitleClick={() => setLeftColumnVisible(false)}>
            <div className="ea-column-header-child">
              <FollowButton
                onSuccess={() => typeof refreshReference.current === 'function' && refreshReference.current()}
                userId="robin"
              />
              <Button onClick={() => setModalOpen(true)}>New post</Button>
            </div>
          </Header>
          <ExampleContent>
            <ExampleFlatFeed setRefresh={setRefresh} feedGroup="timeline" />
          </ExampleContent>
        </ExampleFeed>

        {/* Robin */}
        <ExampleFeed
          isVisibleInMobile={!isLeftColumnVisible}
          token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicm9iaW4ifQ.PTGTKiZ0KvBuWV7g9F2uAbRy7j7TAnCTxxXggX-j9xU"
          className="ea-column__right"
        >
          <Header title="user feed" onTitleClick={() => setLeftColumnVisible(true)}>
            <NotificationDropdown right />
          </Header>

          <ExampleContent>
            <StatusUpdateForm />
            <ExampleFlatFeed />
          </ExampleContent>
        </ExampleFeed>
      </div>
    </div>
  );
};
