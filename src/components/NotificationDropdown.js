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
    unread: 0,
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
  constructor(props: PropsInner) {
    super(props);
    this.state = {
      open: false,
    };
  }

  _refresh = async () => {
    await this.props.refresh(makeDefaultOptions(this.props.options));
    // const ref = this.listRef;
    // if (ref && ref.current) {
    //   ref.current.scrollToOffset({ offset: 0 });
    // }
  };
  async componentDidMount() {
    await this._refresh();
  }

  _onClickIcon = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <IconBadge
          unseen={this.props.unseen}
          onClick={this._onClickIcon}
          showNumber={true}
          hidden={!this.props.notify}
        />
        {this.state.open ? (
          <div
            style={{
              position: 'absolute',
              left: -22,
              top: 35,
              width: this.props.width,
              zIndex: 9999,
            }}
          >
            <DropdownPanel>
              <NotificationFeed notify={false} options={{ mark_seen: true }} />
            </DropdownPanel>
          </div>
        ) : null}
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
