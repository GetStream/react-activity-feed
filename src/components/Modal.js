// @flow

import * as React from 'react';
import IconButton from './IconButton';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

type Props = {|
  children: React.Node,
  open: boolean,
  onClose: () => mixed,
|};

/**
 * Component is described here.
 *
 * @example ./examples/Modal.md
 */
export default class Modal extends React.Component<Props> {
  modalRef: { current: null | HTMLDivElement };

  constructor(props: Props) {
    super(props);
    this.modalRef = React.createRef();
  }

  static defaultProps = {
    open: false,
    onClose: () => console.log('close modal...'),
  };

  componentDidMount() {
    this.setBodyStyle();
    if (this.props.open) {
      window.addEventListener('keyup', this.handleKeyUp, false);
      // $FlowFixMe
      document.addEventListener('click', this.handleOutsideClick, false);
    }
  }

  componentDidUpdate() {
    this.setBodyStyle();
    if (this.props.open) {
      window.addEventListener('keyup', this.handleKeyUp, false);
      // $FlowFixMe
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      window.removeEventListener('keyup', this.handleKeyUp, false);
      // $FlowFixMe
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
    // $FlowFixMe
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleKeyUp = (e: SyntheticKeyboardEvent<>) => {
    const keys = {
      // $FlowFixMe
      27: () => {
        e.preventDefault();
        this.props.onClose();
        window.removeEventListener('keyup', this.handleKeyUp, false);
      },
    };

    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  };

  handleOutsideClick = (e: SyntheticEvent<>) => {
    if (this.modalRef !== null || this.modalRef !== undefined) {
      // $FlowFixMe
      if (!this.modalRef.current.contains(e.target)) {
        this.props.onClose();
        // $FlowFixMe
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  };

  setBodyStyle() {
    if (document.body) {
      if (this.props.open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'scroll';
      }
    }
  }

  render() {
    if (this.props.open) {
      const svg =
        '<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M465 5c5.53 0 10 4.47 10 10s-4.47 10-10 10-10-4.47-10-10 4.47-10 10-10zm3.59 5L465 13.59 461.41 10 460 11.41l3.59 3.59-3.59 3.59 1.41 1.41 3.59-3.59 3.59 3.59 1.41-1.41-3.59-3.59 3.59-3.59-1.41-1.41z" id="b"/><filter x="-30%" y="-30%" width="160%" height="160%" filterUnits="objectBoundingBox" id="a"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" in="shadowBlurOuter1"/></filter></defs><g transform="translate(-451 -1)" fill-rule="nonzero" fill="none"><use fill="#000" filter="url(#a)" xlink:href="#b"/><use fill="#FFF" fill-rule="evenodd" xlink:href="#b"/></g></svg>';
      return (
        <ReactCSSTransitionGroup
          transitionName="raf-modal__transition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          <div className={`raf-modal raf-modal--open }`}>
            <IconButton onClick={this.props.onClose}>
              <div dangerouslySetInnerHTML={{ __html: svg }} />
            </IconButton>
            <div className="raf-modal__inner" ref={this.modalRef}>
              {this.props.children}
            </div>
          </div>
        </ReactCSSTransitionGroup>
      );
    }
    return null;
  }
}
