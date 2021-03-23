import React, { useMemo, SyntheticEvent, HTMLProps } from 'react';
import { IconButton } from 'react-file-utils';
import URLParse from 'url-parse';
import { OGAPIResponse } from 'getstream';

import { sanitizeURL } from '../utils';
import { CloseIcon } from './Icons';

export type VideoProps = {
  og: OGAPIResponse;
  handleClose?: (event: SyntheticEvent) => void;
  urlsThatAreGifs?: Array<string>;
};

export const Video = ({
  og: { videos = [], images = [], url: ogURL, title, description, site_name: siteName },
  handleClose,
  urlsThatAreGifs: gifHosts = ['i.giphy.com', 'i.imgur.com', 'media.giphy.com'],
}: VideoProps) => {
  const video = useMemo(() => videos.find(({ type }) => type === 'text/html' || type === 'video/mp4'), [videos]);

  if (!video) return null;

  const videoURL = sanitizeURL(video.secure_url || video.video);
  const { host } = useMemo(() => new URLParse(videoURL ?? ''), [videoURL]);
  const isGif = useMemo(() => gifHosts.some((gifHost) => gifHost === host), [host, gifHosts]);

  const [image] = images;

  const videoProps: HTMLProps<HTMLVideoElement> = isGif
    ? {
        controls: false,
        preload: 'auto', // load the video right away
        autoPlay: true, // display it like it's a gif
        muted: true,
        loop: true,
        playsInline: true, // don't open video in fullscreen on mobile
        // 'webkit-playsinline': 'webkit-playsinline',
      }
    : {
        controls: true,
        preload: 'metadata', // try fetching length of video etc.
        poster: image?.secure_url ?? image?.image,
      };

  const closeButton = handleClose && (
    <IconButton onClick={handleClose}>
      <CloseIcon />
    </IconButton>
  );

  if (video.type === 'text/html') {
    const newVideoURL = videoURL?.split('/watch?v=').join('/embed/');
    return (
      <div className="raf-video__frame">
        {closeButton}
        <iframe
          title={'embedded player'}
          id="ytplayer"
          width={video.width}
          height={video.height}
          src={newVideoURL}
          frameBorder="0"
        />
      </div>
    );
  }

  return (
    <div className="raf-video__video">
      <video className="raf-video__video--video" {...videoProps}>
        <source src={videoURL} type={video.type} />
      </video>
      <div className="raf-video__video--content">
        <div className="raf-video__video--title">{title}</div>
        <div className="raf-video__video--description">{description}</div>
        <div className="raf-video__video--link">
          <a href={sanitizeURL(ogURL)} target="blank">
            {siteName}
          </a>
        </div>
      </div>
      {closeButton}
    </div>
  );
};
