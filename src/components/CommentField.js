import React from 'react';
import Avatar from './Avatar';
import '../styles/CommentField.css';

/**
 * Component is described here.
 *
 * @example ./examples/CommentField.md
 */
export default class CommentField extends React.Component {
  render() {
    const { name, placeholder } = this.props;
    return (
      <div className="raf-comment-field">
        <Avatar circle size={21} />
        <input
          type="text"
          placeholder={placeholder || 'Type me up scotty!'}
          className={`raf-comment-field__input`}
          name={'raf-comment-field' || name}
        />
      </div>
    );
  }
}
