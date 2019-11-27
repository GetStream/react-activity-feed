// @flow
import * as React from 'react';
import { humanizeTimestamp } from '../utils';
import Avatar from './Avatar';

import type { Renderable } from '../types';

import { smartRender } from '../utils';

export type Props = {|
  username: ?string,
  avatar?: string,
  subtitle?: string,
  time?: string, // text that should be displayed as the time
  timestamp?: string | number, // a timestamp that should be humanized
  icon?: string,
  onClickUser?: () => mixed,
  follow?: boolean,
  Right?: Renderable,
  AfterUsername?: React.Node,
|};

/**
 * Component is described here.
 *
 * @example ./examples/UserBar.md
 */
export default class UserBar extends React.Component<Props> {
  render() {
    let time = this.props.time;
    if (time === undefined && this.props.timestamp != null) {
      time = humanizeTimestamp(this.props.timestamp);
    }
    return (
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <Avatar
            onClick={this.props.onClickUser}
            size={50}
            circle
            image={this.props.avatar}
          />
          <div>
            <div className="author">
              <label className="mb-0" onClick={this.props.onClickUser}>
                {' '}
                {this.props.username}
              </label>
              <time
                className="time d-block"
                dateTime={this.props.timestamp}
                title={this.props.timestamp}
              >
                {time}
              </time>
            </div>
          </div>
        </div>
        {smartRender(
          this.props.Right,
          { handleEdit: this.props.handleEdit },
          () => {},
        )}
      </div>
    );
  }
}
