// @flow
import React from 'react';

type Props = {|
  videos: Array<{
    secure_url: string,
    type: string,
    width: string,
    height: string,
  }>,
|};

/**
 * Component for rendering an Youtube or Vimeo embedded player
 * @example ./examples/Video.md
 */
export default class Video extends React.Component<Props> {
  render() {
    const { videos } = this.props;
    let index: number = 0;

    for (let i = 0; i < videos.length; i++) {
      if (videos[i].type === 'text/html') {
        index = i;
        break;
      }
    }
    return (
      <div className="raf-video">
        <iframe
          title={'embedded player'}
          id="ytplayer"
          type={videos[index].type}
          width={videos[index].width}
          height={videos[index].height}
          src={videos[index].secure_url}
          frameBorder="0"
        />
      </div>
    );
  }
}
