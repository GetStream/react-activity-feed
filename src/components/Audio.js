// @flow
import * as React from 'react';
import { IconButton } from 'react-file-utils';
import { sanitizeURL } from '../utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlayCircle,
  faPauseCircle,
} from '@fortawesome/free-regular-svg-icons';

import type { OgData } from '../types';

type Props = {|
  og: OgData,
  handleClose?: (e: SyntheticEvent<>) => mixed,
|};

type State = {|
  open: boolean,
  playing: boolean,
  progress: number,
  updateProgress?: IntervalID | null,
|};

export default class Audio extends React.Component<Props, State> {
  audioRef: { current: HTMLAudioElement | null };

  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
      playing: false,
      progress: 0,
      updateProgress: null,
    };
    this.audioRef = React.createRef();
  }

  playAudio = () => {
    if (this.audioRef.current !== null) {
      this.audioRef.current.pause();
      this.updateProgress();
      this.setState({
        playing: true,
        updateProgress: setInterval(this.updateProgress, 500),
      });
      //$FlowFixMe
      this.audioRef.current.play();
    }
  };

  pauseAudio = () => {
    if (this.audioRef.current !== null) {
      this.audioRef.current.pause();
    }
    this.setState({ playing: false });
    window.clearInterval(this.state.updateProgress);
  };

  updateProgress = () => {
    if (this.audioRef.current !== null) {
      const position = this.audioRef.current.currentTime;
      const duration = this.audioRef.current.duration;
      const progress = (100 / duration) * position;
      this.setState({
        progress,
      });
      if (position === duration) {
        this.pauseAudio();
      }
    }
  };

  componentWillUnmount() {
    window.clearInterval(this.state.updateProgress);
  }

  _handleClose = (e: SyntheticEvent<>) => {
    if (this.props.handleClose) {
      this.props.handleClose(e);
    }
  };

  render() {
    const { og } = this.props;
    const svg =
      '<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M465 5c5.53 0 10 4.47 10 10s-4.47 10-10 10-10-4.47-10-10 4.47-10 10-10zm3.59 5L465 13.59 461.41 10 460 11.41l3.59 3.59-3.59 3.59 1.41 1.41 3.59-3.59 3.59 3.59 1.41-1.41-3.59-3.59 3.59-3.59-1.41-1.41z" id="b"/><filter x="-30%" y="-30%" width="160%" height="160%" filterUnits="objectBoundingBox" id="a"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" in="shadowBlurOuter1"/></filter></defs><g transform="translate(-451 -1)" fill-rule="nonzero" fill="none"><use fill="#000" filter="url(#a)" xlink:href="#b"/><use fill="#FFF" fill-rule="evenodd" xlink:href="#b"/></g></svg>';
    const audio = og.audios[0];
    const url = sanitizeURL(audio.secure_url || audio.audio);
    const image = ((og.images || [])[0] || {}).image;
    return (
      <div className="raf-audio">
        <div className="raf-audio__wrapper">
          <audio ref={this.audioRef}>
            <source src={url} type="audio/mp3" />
          </audio>
          <div className="raf-audio__image">
            <div className="raf-audio__image--overlay">
              {!this.state.playing ? (
                <div
                  onClick={() => this.playAudio()}
                  className="raf-audio__image--button"
                >
                  <FontAwesomeIcon icon={faPlayCircle} />
                </div>
              ) : (
                <div
                  onClick={() => this.pauseAudio()}
                  className="raf-audio__image--button"
                >
                  <FontAwesomeIcon icon={faPauseCircle} />
                </div>
              )}
            </div>
            <img src={image} alt={`${og.description}`} />
          </div>
          <div className="raf-audio__content">
            <span className="raf-audio__content--title">
              <strong>{og.title}</strong>
            </span>
            <span className="raf-audio__content--subtitle">
              {og.description}
            </span>
            <div className="raf-audio__content--progress">
              <div style={{ width: `${this.state.progress}%` }} />
            </div>
          </div>
          {this.props.handleClose ? (
            <IconButton onClick={(e) => this._handleClose(e)}>
              <div dangerouslySetInnerHTML={{ __html: svg }} />
            </IconButton>
          ) : null}
        </div>
      </div>
    );
  }
}
