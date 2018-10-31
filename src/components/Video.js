// @flow
import React from 'react';

import type { OgData } from '../types';

type Props = {|
  og: OgData,
|};

/**
 * Component for rendering an Youtube or Vimeo embedded player
 * @example ./examples/Video.md
 */
export default class Video extends React.Component<Props> {
  render() {
    const { videos } = this.props.og;
    let video: {
      secure_url: string,
      type: string,
      width: string,
      height: string,
    } = {
      secure_url: '',
      type: '',
      width: '',
      height: '',
    };

    for (let i = 0; i < videos.length; i++) {
      if (videos[i].type === 'text/html' || videos[i].type === 'video/mp4') {
        video = videos[i];
        break;
      }
    }

    if (video.type === 'text/html') {
      return (
        <div className="raf-video__frame">
          <iframe
            title={'embedded player'}
            id="ytplayer"
            type={video.type}
            width={video.width}
            height={video.height}
            src={`${video.secure_url}`}
            frameBorder="0"
          />
        </div>
      );
    } else {
      return (
        <div className="raf-video__video">
          <video className="raf-video__video--video" controls>
            <source src={video.secure_url} type={video.type} />
          </video>
          <div className="raf-video__video--content">
            <div className="raf-video__video--title">{this.props.og.title}</div>
            <div className="raf-video__video--description">
              {this.props.og.description}
            </div>
            <div className="raf-video__video--link">
              <a href={this.props.og.url} target="blank">
                {this.props.og.site_name}
              </a>
            </div>
          </div>
        </div>
      );
    }
  }
}
