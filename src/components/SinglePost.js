// @flow
import React from 'react';

import FlatFeed from './FlatFeed';

import type { FeedRequestOptions } from 'getstream';
import type { Renderable, BaseActivityResponse, BaseReaction } from '../types';

type Props = {|
  activityId: string,
  feedGroup: string,
  userId?: string,
  options?: FeedRequestOptions,
  analyticsLocation?: string,
  Activity?: Renderable,
  /** Override activity delete request */
  doActivityDeleteRequest?: (id: string) => mixed,
  /** Override reaction add request */
  doReactionAddRequest?: (
    kind: string,
    activity: BaseActivityResponse,
    data?: {},
    options: {},
  ) => mixed,
  /** Override reaction delete request */
  doReactionDeleteRequest?: (id: string) => mixed,
  /** Override child reaction add request */
  doChildReactionAddRequest?: (
    kind: string,
    activity: BaseReaction,
    data?: {},
    options: {},
  ) => mixed,
  /** Override child reaction delete request */
  doChildReactionDeleteRequest?: (id: string) => mixed,
  /** Override reactions filter request */
  doReactionsFilterRequest?: (options: {}) => Promise<Object>,
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
          doFeedRequest={(client, feedGroup, userId, options) =>
            client
              .feed(feedGroup, userId)
              .getActivityDetail(this.props.activityId, options)
          }
          doActivityDeleteRequest={this.props.doActivityDeleteRequest}
          doReactionAddRequest={this.props.doReactionAddRequest}
          doReactionDeleteRequest={this.props.doReactionDeleteRequest}
          doChildReactionAddRequest={this.props.doChildReactionAddRequest}
          doChildReactionDeleteRequest={this.props.doChildReactionDeleteRequest}
          doReactionsFilterRequest={this.props.doReactionsFilterRequest}
        />
      </React.Fragment>
    );
  }
}
