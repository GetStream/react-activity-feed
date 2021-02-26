import React from 'react';
import { humanizeTimestamp } from '../utils';
import Avatar from './Avatar';

import { smartRender } from '../utils';
import { withTranslationContext } from '../Context';

/**
 * Component is described here.
 *
 * @example ./examples/UserBar.md
 */
class UserBar extends React.Component {
  render() {
    const { tDateTimeParser } = this.props;
    let time = this.props.time;
    if (time === undefined && this.props.timestamp != null) {
      time = humanizeTimestamp(this.props.timestamp, tDateTimeParser);
    }
    return (
      <div className="raf-user-bar">
        {this.props.avatar ? (
          <Avatar onClick={this.props.onClickUser} size={50} circle image={this.props.avatar} />
        ) : null}
        <div className="raf-user-bar__details">
          <p className="raf-user-bar__username" onClick={this.props.onClickUser}>
            {this.props.username}
          </p>
          {this.props.AfterUsername}
          {this.props.icon !== undefined ? <img src={this.props.icon} alt="icon" /> : null}
          {this.props.subtitle ? (
            <p className="raf-user-bar__subtitle">
              <time dateTime={this.props.timestamp} title={this.props.timestamp}>
                {this.props.subtitle}
              </time>
            </p>
          ) : null}
        </div>
        <React.Fragment>
          {smartRender(this.props.Right, {}, () => (
            <p className="raf-user-bar__extra">
              <time dateTime={this.props.timestamp} title={this.props.timestamp}>
                {time}
              </time>
            </p>
          ))}
        </React.Fragment>
      </div>
    );
  }
}

export default withTranslationContext(UserBar);
