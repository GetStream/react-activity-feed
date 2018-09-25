// @flow

import React from 'react';
import Avatar from './Avatar';
import '../styles/CommentField.css';

import type { UserData } from '../types';

export type Props = {|
  user: UserData,
  placeholder: string,
|};

/**
 * Component is described here.
 *
 * @example ./examples/CommentField.md
 */
export default class CommentField extends React.Component<Props> {
  static defaultProps = {
    placeholder: 'Type me up scotty!',
  };

  render() {
    return (
      <div className="raf-comment-field">
        <Avatar image={this.props.user.profileImage} circle size={21} />
        <input
          type="text"
          placeholder={this.props.placeholder}
          className={`raf-comment-field__input`}
          name={'raf-comment-field' || this.props.user.name}
        />
      </div>
    );
  }
}
