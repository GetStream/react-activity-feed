// @flow
import * as React from 'react';
import Image from './Image';

export type Props = {|
  images: string[],
|};

export default class Gallery extends React.Component<Props> {
  render() {
    return (
      <div className="raf-gallery">
        {this.props.images.map((image) => (
          <Image source={image} key={image} />
        ))}
      </div>
    );
  }
}
