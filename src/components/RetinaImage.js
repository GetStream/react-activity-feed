/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const React = require('react');
const isRetina = require('is-retina');
const imageExists = require('image-exists');
const path = require('path');
const assign = require('object-assign');
const arrayEqual = require('array-equal');
/**
 * Component description
 * @example ./examples/RetinaImage.md
 */
export default class RetinaImage extends React.Component {
  // static initClass() {
  //   this.propTypes = {
  //     src: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  //     checkIfRetinaImgExists: PropTypes.bool,
  //     forceOriginalDimensions: PropTypes.bool,
  //     retinaImageSuffix: PropTypes.string,
  //     handleOnLoad: PropTypes.func, // Deprecated.
  //     onLoad: PropTypes.func,
  //     onError: PropTypes.func
  //   };

  //   this.defaultProps = {
  //     checkIfRetinaImgExists: true,
  //     forceOriginalDimensions: true,
  //     retinaImageSuffix: '@2x',
  //     onError() {}
  //   };
  // }

  constructor(props) {
    super(props);
    this.state = this.wrangleProps();
    this.img = React.createRef();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let isEqual = true;
    if (Array.isArray(this.props.src) && Array.isArray(nextProps.src)) {
      isEqual = arrayEqual(this.props.src, nextProps.src);
    } else {
      isEqual = this.props.src === nextProps.src;
    }

    if (!isEqual) {
      return this.setState(
        assign(this.wrangleProps(nextProps), {
          width: null,
          height: null,
          imgLoaded: null,
          retinaImgExists: null,
          retinaCheckComplete: null,
        }),
      );
    }
  }

  componentDidMount() {
    this.checkForRetina();
    return this.checkLoaded();
  }

  componentDidUpdate() {
    return this.checkForRetina();
  }

  render() {
    // Propagate only the props that `<img>` supports, avoid React `Unknown props` warning. https://fb.me/react-unknown-prop
    // CoffeeScript does not support splat `...` for object destructuring so using `assign` and `delete`. http://stackoverflow.com/a/20298038
    const imgProps = assign({}, this.props);
    delete imgProps.src;
    delete imgProps.checkIfRetinaImgExists;
    delete imgProps.forceOriginalDimensions;
    delete imgProps.retinaImageSuffix;
    delete imgProps.handleOnLoad;
    delete imgProps.onLoad;
    delete imgProps.onError;

    // Override some of the props for `<img>`.
    imgProps.src = this.state.src;
    imgProps.onLoad = this.handleOnLoad;
    imgProps.onError = this.props.onError;

    if (this.state.width >= 0) {
      imgProps.width = this.state.width;
    }

    if (this.state.height >= 0) {
      imgProps.height = this.state.height;
    }

    return <img {...imgProps} ref={this.img} alt="" />;
  }

  // src can be a href or an array of hrefs.
  wrangleProps(props) {
    if (props == null) {
      ({ props } = this);
    }
    if (Array.isArray(props.src)) {
      return {
        src: props.src[0],
        alt: props.alt,
        srcIsArray: true,
      };
    } else {
      return {
        src: props.src,
        alt: props.alt,
        srcIsArray: false,
      };
    }
  }

  checkForRetina() {
    if (this.state.retinaCheckComplete) {
      return;
    }

    if (isRetina() && this.props.checkIfRetinaImgExists) {
      return imageExists(this.getRetinaPath(), (exists) => {
        // If original image has loaded already (we have to wait so we know
        // the original image dimensions), then set the retina image path.
        if (exists && (this.state != null ? this.state.imgLoaded : undefined)) {
          this.setState({ src: this.getRetinaPath() });
        } else if (exists) {
          this.setState({ retinaImgExists: true });
        }

        return this.setState({ retinaCheckComplete: true });
      });

      // If the check isn't needed, immediately swap in the retina path
    } else if (isRetina() && !this.props.checkIfRetinaImgExists) {
      this.setState({ src: this.getRetinaPath() });

      return this.setState({ retinaCheckComplete: true });
    }
  }

  // For server-rendered code, sometimes images will already be loaded by the time
  // this module mounts.
  // http://stackoverflow.com/a/1977898
  checkLoaded() {
    const el = this.img.current;

    if (!el.complete) {
      return false;
    }

    if (el.naturalWidth === 0) {
      return false;
    }

    // No other way to disprove it's loaded so we'll assume it's ok.
    return this.handleOnLoad();
  }

  handleOnLoad = (e) => {
    // Customers of component might care when the image loads.
    if (this.props.onLoad != null) {
      this.props.onLoad(e);
    }
    // handleOnLoad was in an earlier version (wrong name) and will be removed
    // at the next major release.
    if (this.props.handleOnLoad != null) {
      this.props.handleOnLoad(e);
    }

    if (this.props.forceOriginalDimensions) {
      this.setState({
        width: this.img.current.clientWidth,
        height: this.img.current.clientHeight,
      });
    }

    this.setState({ imgLoaded: true });

    // If the retina image check has already finished, set the 2x path.
    if (
      (this.state != null ? this.state.retinaImgExists : undefined) ||
      !this.props.checkIfRetinaImgExists
    ) {
      return this.setState({ src: this.getRetinaPath() });
    }
  };

  getRetinaPath() {
    if (this.state.srcIsArray) {
      return this.props.src[1];
    } else {
      let basename = path.basename(
        this.props.src,
        path.extname(this.props.src),
      );
      basename =
        basename + this.props.retinaImageSuffix + path.extname(this.props.src);
      const src = this.props.src.replace(
        path.basename(this.props.src),
        basename,
      );
      return src;
    }
  }
}
