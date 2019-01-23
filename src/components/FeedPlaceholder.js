// @flow
import React from 'react';

type Props = {|
  text: string,
|};
export default class FeedPlaceholder extends React.Component<Props> {
  static defaultProps = {
    text: 'No data to display...',
  };

  render() {
    return (
      <div className="raf-feed-placeholder">
        <p>{this.props.text}</p>
      </div>
    );
  }
}
