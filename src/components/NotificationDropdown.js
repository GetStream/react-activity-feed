// @flow
import * as React from 'react';
import { Feed, FeedContext } from '../Context';
import NotificationFeed from './NotificationFeed';
import Notification from './Notification';
import IconBadge from './IconBadge';
import DropdownPanel from './DropdownPanel';
import type {
  // BaseActivityResponse,
  BaseFeedCtx,
  BaseUserSession,
  Renderable,
} from '../types';
import type { FeedRequestOptions, FeedResponse } from 'getstream';

type Props = {|
  Group?: Renderable,
  feedGroup: string,
  userId?: string,
  options?: FeedRequestOptions,
  /** if true, feed shows a badge with numbers when new activities are added */
  notify: boolean,
  doFeedRequest?: (
    session: BaseUserSession,
    feedGroup: string,
    userId?: string,
    options?: FeedRequestOptions,
  ) => Promise<FeedResponse<{}, {}>>,
  analyticsLocation?: string,
  noPagination?: boolean,
  children?: React.Node,
  width?: number,
  right?: boolean,
|};

/**
 * @example ./examples/NotificationDropdown.md
 */

export default class NotificationDropdown extends React.Component<Props> {
  static defaultProps = {
    feedGroup: 'notification',
    Group: Notification,
    notify: true,
    width: 475,
  };
  render() {
    return (
      <Feed
        feedGroup={this.props.feedGroup}
        userId={this.props.userId}
        options={makeDefaultOptions(this.props.options)}
        doFeedRequest={this.props.doFeedRequest}
      >
        <FeedContext.Consumer>
          {(feedCtx) => (
            <NotificationDropdownInner {...this.props} {...feedCtx} />
          )}
        </FeedContext.Consumer>
      </Feed>
    );
  }
}

type State = {|
  open: boolean,
|};

type PropsInner = {| ...Props, ...BaseFeedCtx |};
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

  openDropdown = async () => {
    await this._refresh(); // refresh when opening dropdown
    this.setState(
      {
        open: true,
      },
      () => {
        //$FlowFixMe
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
          //$FlowFixMe
          document.removeEventListener('click', this.closeDropdown, false);
        },
      );
    }
  };

  componentWillUnmount() {
    //$FlowFixMe
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
        />

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
          <DropdownPanel arrow right={this.props.right}>
            <NotificationFeed
              notify={this.props.notify}
              options={{ mark_seen: true }}
            />
          </DropdownPanel>
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
