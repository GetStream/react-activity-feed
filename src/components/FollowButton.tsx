import React from 'react';

export type Props = {
  /** callback function used on click */
  onClick?: () => unknown;

  /** initial follow state */
  followed?: boolean;
};

export type State = {
  followed: boolean;
};

/**
 * Component is described here.
 *
 * @example ./examples/FollowButton.md
 */
export default class FollowButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { followed: this.props.followed || false };
  }

  render() {
    const { onClick, followed } = this.props;
    return (
      <div
        className={`raf-follow-button ${
          followed ? 'raf-follow-button--active' : ''
        }`}
        role="button"
        onClick={onClick}
      >
        {followed ? 'Following' : 'Follow'}
      </div>
    );
  }
}
