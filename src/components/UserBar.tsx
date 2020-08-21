import * as React from 'react';
import { Streami18Ctx, withTranslationContext } from '../Context';
import { Renderable } from '../types';
import { humanizeTimestamp, smartRender } from '../utils';
import Avatar from './Avatar';

export type Props = {
  username: string | null | undefined;
  avatar?: string;
  subtitle?: string;
  time?: string; // text that should be displayed as the time
  timestamp?: string | number; // a timestamp that should be humanized
  icon?: string;
  onClickUser?: () => unknown;
  follow?: boolean;
  Right?: Renderable;
  AfterUsername?: React.ReactNode;
};

/**
 * Component is described here.
 *
 * @example ./examples/UserBar.md
 */
class UserBar extends React.Component<Props & Streami18Ctx> {
  render() {
    const { tDateTimeParser } = this.props;
    let time = this.props.time;
    if (time === undefined && this.props.timestamp != null) {
      time = humanizeTimestamp(this.props.timestamp, tDateTimeParser);
    }
    const timestamp = (this.props.timestamp || '').toString();
    return (
      <div className="raf-user-bar">
        {this.props.avatar ? (
          <Avatar
            onClick={this.props.onClickUser}
            size={50}
            circle
            image={this.props.avatar}
          />
        ) : null}
        <div className="raf-user-bar__details">
          <p
            className="raf-user-bar__username"
            onClick={this.props.onClickUser}
          >
            {this.props.username}
          </p>
          {this.props.AfterUsername}
          {this.props.icon !== undefined ? (
            <img src={this.props.icon} alt="icon" />
          ) : null}
          {this.props.subtitle ? (
            <p className="raf-user-bar__subtitle">
              <time dateTime={timestamp} title={timestamp}>
                {this.props.subtitle}
              </time>
            </p>
          ) : null}
        </div>
        <React.Fragment>
          {smartRender(this.props.Right, {}, () => (
            <p className="raf-user-bar__extra">
              <time dateTime={timestamp} title={timestamp}>
                {time}
              </time>
            </p>
          ))}
        </React.Fragment>
      </div>
    );
  }
}

export default withTranslationContext<Props>(UserBar);
