import React from 'react';
import '../styles/AttachedActivity.css';

/**
 * Component is described here.
 *
 * @example ./examples/AttachedActivity.md
 */
export default class AttachedActivity extends React.Component {
  render() {
    const { author, content } = this.props;
    return (
      <div className="raf-attached-activity">
        {author ? (
          <p className="raf-attached-activity__author">
            <strong>{author}</strong>
          </p>
        ) : null}
        <p className="raf-attached-activity__content">{content}</p>
      </div>
    );
  }
}
