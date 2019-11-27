// @flow
import React from 'react';
import emptyFeedsIco from '../images/nothing.png'

type Props = {|
  text: string,
|};
export default class FeedPlaceholder extends React.Component<Props> {
  static defaultProps = {
    text: 'No data to display...',
  };

  render() {
    return (
      <div className="empty-feeds text-center bg-white">
        <img src={emptyFeedsIco} alt="" />
        <p className="mt-4">There’re Nothing!</p>
      </div>
    )
  }
}
