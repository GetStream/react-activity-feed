import React from 'react';
import { IconButton } from 'react-file-utils';

/**
 * Component is described here.
 *
 * @example ./examples/Modal.md
 */
export default class Modal extends React.Component {
  modalRef;

  constructor(props) {
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
      document.addEventListener('click', this.handleOutsideClick, false);
    }
  }

  componentDidUpdate() {
    this.setBodyStyle();
    if (this.props.open) {
      window.addEventListener('keyup', this.handleKeyUp, false);
      window.addEventListener('click', this.handleOutsideClick, false);
    } else {
      window.removeEventListener('keyup', this.handleKeyUp, false);
      window.removeEventListener('click', this.handleOutsideClick, false);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
    window.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleKeyUp = (e) => {
    const keys = {
      27: () => {
        e.preventDefault();
        e.stopPropagation();
        this.props.onClose();
        window.removeEventListener('keyup', this.handleKeyUp, false);
      },
    };

    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  };

  handleOutsideClick = (event) => {
    if (this.modalRef !== null || this.modalRef !== undefined) {
      const target = event.target;
      if (
        this.modalRef.current !== null &&
        !this.modalRef.current.contains(target)
      ) {
        event.stopPropagation();
        this.props.onClose();

        window.removeEventListener('click', this.handleOutsideClick, false);
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
        <div className={`raf-modal raf-modal--open }`}>
          <IconButton onClick={() => this.props.onClose()}>
            <div dangerouslySetInnerHTML={{ __html: svg }} />
          </IconButton>
          <div className="raf-modal__inner" ref={this.modalRef}>
            {this.props.children}
          </div>
        </div>
      );
    }
    return null;
  }
}
