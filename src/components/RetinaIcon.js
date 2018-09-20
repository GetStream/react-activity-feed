// @flow

import React from 'react';

import { getRetinaImage } from '../utils';

export type Props = {|
  images: string,
|};
/**
 * Component is described here.
 *
 * @example ./examples/RetinaIcon.md
 */
export default class RetinaIcon extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        <img
          src={this.props.images.split('|')[0]}
          srcSet={getRetinaImage(this.props.images)}
          alt="retinaicon"
        />
      </React.Fragment>
    );
  }
}
