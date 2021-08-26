import React, { useRef, useState, useEffect, MouseEventHandler } from 'react';
import { IconButton } from 'react-file-utils';
import { OGAPIResponse } from 'getstream';

import { sanitizeURL, smartRender } from '../utils';
import { CloseIcon, PlayCircleIcon, PauseCircleIcon } from './Icons';

type AudioProps = {
  og: OGAPIResponse;
  handleClose?: (event: React.SyntheticEvent) => void;
};

export const Audio = ({ og: { audios = [], images = [], description, title }, handleClose }: AudioProps) => {
  const audioReference = useRef<HTMLAudioElement | null>(null);
  const intervalReference = useRef<number>();

  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);

  const handleProgressBarClick: MouseEventHandler<HTMLDivElement> = ({ currentTarget: target, clientX }) => {
    if (!audioReference.current) return;

    const { width, x } = target.getBoundingClientRect();

    const ratio = (clientX - x) / width;

    if (!playing) setProgress(ratio * 100);

    audioReference.current.currentTime = ratio * audioReference.current.duration;
  };

  useEffect(() => {
    if (!audioReference.current || !playing) return;

    intervalReference.current = window.setInterval(() => {
      if (!audioReference.current) return;

      const { currentTime, duration } = audioReference.current;

      setProgress((currentTime / duration) * 100);

      if (currentTime === duration) setPlaying(false);
    }, 100);

    audioReference.current.play();

    return () => {
      audioReference.current?.pause();

      if (!intervalReference.current) return;

      window.clearInterval(intervalReference.current);

      intervalReference.current = undefined;
    };
  }, [playing]);

  const [audio] = audios;
  const audioURL = sanitizeURL(audio.secure_url || audio.audio);
  const [{ image: imageURL }] = images;

  return (
    <div className="raf-audio">
      <div className="raf-audio__wrapper">
        <audio ref={audioReference}>
          <source src={audioURL} type="audio/mp3" />
        </audio>
        <div className="raf-audio__image">
          <div className="raf-audio__image--overlay">
            <div role="button" onClick={() => setPlaying((pv) => !pv)} className="raf-audio__image--button">
              {smartRender(playing ? PauseCircleIcon : PlayCircleIcon, { style: { width: '1em' } })}
            </div>
          </div>
          <img src={imageURL} alt={description ?? ''} />
        </div>
        <div className="raf-audio__content">
          <span className="raf-audio__content--title">
            <strong>{title}</strong>
          </span>
          <span className="raf-audio__content--subtitle">{description ?? ''}</span>
          <div
            role="progressbar"
            style={{ cursor: 'pointer' }}
            onClick={handleProgressBarClick}
            className="raf-audio__content--progress"
          >
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>
        {handleClose && (
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};
