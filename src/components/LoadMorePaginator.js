import React from 'react';
import { LoadMoreButton } from './LoadMoreButton';
import { smartRender } from '../utils';

export default class LoadMorePaginator extends React.Component {
  static defaultProps = {
    LoadMoreButton,
  };
  render() {
    return (
      <React.Fragment>
        {!this.props.reverse && this.props.children}
        {this.props.hasNextPage
          ? smartRender(this.props.LoadMoreButton, {
              refreshing: this.props.refreshing,
              onClick: this.props.loadNextPage,
            })
          : null}
        {this.props.reverse && this.props.children}
      </React.Fragment>
    );
  }
}
