import * as React from 'react';
import LoadMoreButton from './LoadMoreButton';
import { smartRender } from '../utils';

import { Renderable } from '../types';
type Props = {
  /** The button the user should click to click to load more */
  LoadMoreButton: Renderable;

  /** callback to load the next page */
  loadNextPage: () => Promise<any>;

  /** indicates if there is a next page to load */
  hasNextPage: boolean;

  /** indicates if there there's currently any refreshing taking place */
  refreshing: boolean;

  /** display the items in opposite order */
  reverse: boolean;

  /** The paginated content to display */
  children: React.ReactNode;
};

export default class LoadMorePaginator extends React.Component<Props> {
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
