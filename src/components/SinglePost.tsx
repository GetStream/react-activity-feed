import React from 'react';
import { FeedRequestOptions } from '../getstreamCustomTypes';
import { BaseActivityResponse, BaseReaction, Renderable } from '../types';
import FlatFeed from './FlatFeed';

type Props = {
  activityId: string;
  feedGroup: string;
  userId?: string;
  options?: FeedRequestOptions;
  analyticsLocation?: string;
  Activity?: Renderable;

  /** Override activity delete request */
  doActivityDeleteRequest?: (id: string) => unknown;

  /** Override reaction add request */
  doReactionAddRequest?: (
    kind: string,
    activity: BaseActivityResponse,
    data?: {},
    options?: {},
  ) => unknown;

  /** Override reaction delete request */
  doReactionDeleteRequest?: (id: string) => unknown;

  /** Override child reaction add request */
  doChildReactionAddRequest?: (
    kind: string,
    activity: BaseReaction,
    data?: {},
    options?: {},
  ) => unknown;

  /** Override child reaction delete request */
  doChildReactionDeleteRequest?: (id: string) => unknown;

  /** Override reactions filter request */
  doReactionsFilterRequest?: (options: {}) => Promise<any>;
};

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
