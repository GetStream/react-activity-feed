import * as React from 'react';
import { Feed, FeedContext, FeedCtx } from '../Context';
import { FeedRequestOptions, FeedResponse } from '../getstreamCustomTypes';
import {
  BaseActivityResponse,
  BaseClient,
  // BaseActivityResponse,
  BaseFeedCtx,
  BaseReaction,
  Renderable,
} from '../types';
import { smartRender } from '../utils';
import DropdownPanel from './DropdownPanel';
import FeedPlaceholder from './FeedPlaceholder';
import IconBadge from './IconBadge';
import LoadMorePaginator from './LoadMorePaginator';
import NewActivitiesNotification from './NewActivitiesNotification';
import Notification from './Notification';
import NotificationFeed from './NotificationFeed';

type Props = {
  /** The feed group part of the feed that should be displayed */
  feedGroup: string;

  /** The user_id part of the feed that should be displayed */
  userId?: string;

  /** Read options for the API client (eg. limit, mark_seen, ...) */
  options?: FeedRequestOptions;

  /** The component used to render a group in the feed */
  Group: Renderable;

  /** If true, feed shows the NewActivitiesNotification component when new
   * activities are added */
  notify: boolean;

  /** The component to use to render new activities notification */
  Notifier: Renderable;

  /** By default pagination is done with a "Load more" button, you can use
   * InifiniteScrollPaginator to enable infinite scrolling */
  Paginator: Renderable;

  /** Component to show when there are no activities in the feed */
  Placeholder: Renderable;

  /** Icon component  */
  Icon?: Renderable;

  /** Header component  */
  Header?: Renderable;

  /** Footer component */
  Footer?: Renderable;

  /** The feed read handler (change only for advanced/complex use-cases) */
  doFeedRequest?: (
    client: BaseClient,
    feedGroup: string,
    userId?: string,
    options?: FeedRequestOptions,
  ) => Promise<FeedResponse<any, any>>;

  /** Override activity delete request */
  doActivityDeleteRequest?: (id: string) => unknown;

  /** Override reaction add request */
  doReactionAddRequest?: (
    kind: string,
    activity: BaseActivityResponse,
    data?: any,
    options?: any,
  ) => unknown;

  /** Override reaction delete request */
  doReactionDeleteRequest?: (id: string) => unknown;

  /** Override child reaction add request */
  doChildReactionAddRequest?: (
    kind: string,
    activity: BaseReaction,
    data?: any,
    options?: any,
  ) => unknown;

  /** Override child reaction delete request */
  doChildReactionDeleteRequest?: (id: string) => unknown;

  /** The location that should be used for analytics when liking in the feed,
   * this is only useful when you have analytics enabled for your app. */
  analyticsLocation?: string;

  /** The width of the dropdown */
  width?: number;

  /** Used to position the dropdown different horizontaly */
  right?: boolean;
};

/**
 * IMPORTANT: Changing most of the props below doesn't result in the desired
 * effect. These settings related to feed management should be changed in the
 * `sharedFeeds` prop of the [`StreamApp`](#streamapp) component.
 * @example ./examples/NotificationDropdown.md
 */
export default class NotificationDropdown extends React.Component<Props> {
  static defaultProps = {
    feedGroup: 'notification',
    Group: Notification,
    notify: true,
    Notifier: NewActivitiesNotification,
    Paginator: LoadMorePaginator,
    Placeholder: FeedPlaceholder,
    width: 475,
  };
  render() {
    return (
      <Feed
        feedGroup={this.props.feedGroup}
        userId={this.props.userId}
        options={makeDefaultOptions({ mark_seen: false })}
        doFeedRequest={this.props.doFeedRequest}
      >
        <FeedContext.Consumer>
          {(feedCtx: FeedCtx) => (
            <NotificationDropdownInner {...this.props} {...feedCtx} />
          )}
        </FeedContext.Consumer>
      </Feed>
    );
  }
}

type State = {
  open: boolean;
};

type PropsInner = Props & BaseFeedCtx;
class NotificationDropdownInner extends React.Component<PropsInner, State> {
  dropdownRef: { current: null | HTMLDivElement };

  constructor(props: PropsInner) {
    super(props);
    this.state = {
      open: false,
    };
    this.dropdownRef = React.createRef();
  }

  _refresh = async () => {
    await this.props.refresh(makeDefaultOptions(this.props.options));
  };

  openDropdown = () => {
    this.setState(
      {
        open: true,
      },
      () => {
        document.addEventListener('click', this.closeDropdown, false);
      },
    );
  };

  closeDropdown = (e) => {
    if (
      this.dropdownRef.current !== null &&
      !this.dropdownRef.current.contains(e.target)
    ) {
      this.setState(
        {
          open: false,
        },
        () => {
          document.removeEventListener('click', this.closeDropdown, false);
        },
      );
    }
  };

  componentDidMount() {
    this.props.refreshUnreadUnseen();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeDropdown, false);
  }

  render() {
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <IconBadge
          unseen={this.props.unseen}
          onClick={this.openDropdown}
          showNumber={true}
          hidden={!this.props.notify}
        >
          {this.props.Icon && smartRender(this.props.Icon, {}, null)}
        </IconBadge>

        <div
          ref={this.dropdownRef}
          style={{
            position: 'absolute',
            left: this.props.right ? '' : '-22px',
            right: this.props.right ? -29 : 0,
            top: 35,
            width: '100vw',
            maxWidth: this.props.width,
            zIndex: 9999,
            visibility: this.state.open ? 'visible' : 'hidden',
            transform: this.state.open ? 'translateY(0px)' : 'translateY(10px)',
            opacity: this.state.open ? '1' : '0',
            transition: 'all .2s ease-out',
          }}
        >
          {this.state.open && (
            <DropdownPanel
              arrow
              right={this.props.right}
              Header={this.props.Header}
              Footer={this.props.Footer}
            >
              <NotificationFeed
                feedGroup={this.props.feedGroup}
                userId={this.props.userId}
                options={this.props.options}
                Group={this.props.Group}
                notify={this.props.notify}
                Notifier={this.props.Notifier}
                Paginator={this.props.Paginator}
                Placeholder={this.props.Placeholder}
                doFeedRequest={this.props.doFeedRequest}
                doActivityDeleteRequest={this.props.doActivityDeleteRequest}
                doReactionAddRequest={this.props.doReactionAddRequest}
                doReactionDeleteRequest={this.props.doReactionDeleteRequest}
                doChildReactionAddRequest={this.props.doChildReactionAddRequest}
                doChildReactionDeleteRequest={
                  this.props.doChildReactionDeleteRequest
                }
                analyticsLocation={this.props.analyticsLocation}
              />
            </DropdownPanel>
          )}
        </div>
      </div>
    );
  }
}

const makeDefaultOptions = (options) => {
  const copy = { ...options };
  if (copy.mark_seen === undefined) {
    copy.mark_seen = true;
  }
  return copy;
};
