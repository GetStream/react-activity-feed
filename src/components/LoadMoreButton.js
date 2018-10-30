import React from 'react';

import Button from './Button';

export default class LoadMoreButton extends React.Component {
  render() {
    return (
      <div className="raf-load-more-button">
        <Button
          onClick={this.props.loadNextPage}
          buttonStyle="info"
          disabled={this.props.refreshing}
          loading={this.props.refreshing}
        >
          load more
        </Button>
      </div>
    );
  }
}
