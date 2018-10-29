// @flow
import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlayCircle,
  faPauseCircle,
} from '@fortawesome/free-regular-svg-icons';

import type { OgData } from '../types';

type Props = {|
  og: OgData,
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

  render() {
    const { og } = this.props;
    return (
      <div className="raf-audio">
        <div className="raf-audio__wrapper">
          <audio ref={this.audioRef}>
            <source src={og.audios[0].audio} type="" />
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
            <img src={og.images[0].image} alt={`${og.description}`} />
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
        </div>
      </div>
    );
  }
}
