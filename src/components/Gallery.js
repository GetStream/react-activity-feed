// @flow
import * as React from 'react';

export type Props = {|
  images: string[],
|};

export default class Gallery extends React.Component<Props> {
  render() {
    return (
      <div className="raf-gallery">
        {this.props.images.map((image) => (
          <div className="raf-gallery__image-wrapper" key={image}>
            <img src={image} className="raf-gallery__image" alt="asdf" />
          </div>
        ))}
      </div>
    );
  }
}
