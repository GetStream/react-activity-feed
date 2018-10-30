// @flow
import React from 'react';

import FlatFeed from './FlatFeed';

import type { FeedRequestOptions } from 'getstream';
import type { Renderable } from '../types';

type Props = {|
  activityId: string,
  feedGroup: string,
  userId?: string,
  options?: FeedRequestOptions,
  analyticsLocation?: string,
  Activity?: Renderable,
|};

/**
 * Shows the detail of a single activity
 * @example ./examples/SinglePost.md
 */
export default class SinglePost extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        <FlatFeed
          feedGroup={this.props.feedGroup}
          userId={this.props.userId}
          options={{
            withRecentReactions: true,
            ...this.props.options,
          }}
          analyticsLocation={this.props.analyticsLocation}
          Activity={this.props.Activity}
          doFeedRequest={(session, feedGroup, userId, options) =>
            session
              .feed(feedGroup, userId)
              .getActivityDetail(this.props.activityId, options)
          }
          noPagination
        />
      </React.Fragment>
    );
  }
}
