// @flow
import * as React from 'react';

type Props = {|
  color?: string,
  backgroundColor?: string,
  size: number,
  width: number,
|};

/**
 * Component is described here.
 *
 * @example ./examples/LoadingIndicator.md
 */
export default class LoadingIndicator extends React.PureComponent<Props> {
  static defaultProps = {
    size: 20,
    width: 2,
  };
  render() {
    return (
      <div
        className="raf-loading-indicator__spinner"
        style={{
          margin: '0 auto',
          borderColor: this.props.backgroundColor
            ? this.props.backgroundColor
            : '',
          borderTopColor: this.props.color ? this.props.color : '',
          width: this.props.size ? this.props.size : '',
          height: this.props.size ? this.props.size : '',
          borderWidth: this.props.width ? this.props.width : '',
        }}
      />
    );
  }
}
