// @flow
import * as React from 'react';

type Props = {|
  label: string,
  data: string | number
|}

/**
 * Component is described here.
 *
 * @example ./examples/DataLabel.md
 */
export default class DataLabel extends React.Component<Props> {
  static defaultProps = {
    label: 'label',
    data: 'data'
  }

  render() {
    return (
      <div className="raf-data-label">
        <span className="raf-data-label__label">{this.props.label}</span>
        <span className="raf-data-label__data">{this.props.data}</span>
      </div>
    );
  }
}