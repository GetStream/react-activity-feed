import React from 'react';

import FlatFeed from './FlatFeed';

/**
 * Shows the detail of a single activity
 * @example ./examples/SinglePost.md
 */
export default class SinglePost extends React.Component {
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
