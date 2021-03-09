import React from 'react';
import { Feed, FeedContext } from '../Context';
import NotificationFeed from './NotificationFeed';
import Notification from './Notification';
import { NewActivitiesNotification } from './NewActivitiesNotification';
import LoadMorePaginator from './LoadMorePaginator';
import FeedPlaceholder from './FeedPlaceholder';
import IconBadge from './IconBadge';
import DropdownPanel from './DropdownPanel';

import { smartRender } from '../utils';

/**
 * IMPORTANT: Changing most of the props below doesn't result in the desired
 * effect. These settings related to feed management should be changed in the
 * `sharedFeeds` prop of the [`StreamApp`](#streamapp) component.
 * @example ./examples/NotificationDropdown.md
 */

export default class NotificationDropdown extends React.Component {
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
          {(feedCtx) => <NotificationDropdownInner {...this.props} {...feedCtx} />}
        </FeedContext.Consumer>
      </Feed>
    );
  }
}

class NotificationDropdownInner extends React.Component {
  dropdownRef;

  constructor(props) {
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
    if (this.dropdownRef.current !== null && !this.dropdownRef.current.contains(e.target)) {
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
        <IconBadge unseen={this.props.unseen} onClick={this.openDropdown} showNumber={true} hidden={!this.props.notify}>
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
            <DropdownPanel arrow right={this.props.right} Header={this.props.Header} Footer={this.props.Footer}>
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
                doChildReactionDeleteRequest={this.props.doChildReactionDeleteRequest}
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
