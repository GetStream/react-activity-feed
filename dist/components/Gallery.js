import React, { useState } from 'react';
import classNames from 'classnames';
import Lightbox from 'react-image-lightbox';
export var Gallery = function (_a) {
    var _b = _a.images, images = _b === void 0 ? [] : _b, className = _a.className, style = _a.style;
    var _c = useState(null), index = _c[0], setIndex = _c[1];
    return (React.createElement("div", { className: classNames('raf-gallery', className), style: style },
        images.slice(0, 5).map(function (image, i) { return (React.createElement("div", { role: "button", className: classNames('img', { 'img--last': i === 4 && images.length > 5 }), onClick: function () { return setIndex(i); }, key: "image-" + i },
            React.createElement("img", { src: image, className: "raf-gallery__image", alt: "" }),
            i === 4 && images.length > 5 && React.createElement("p", null,
                images.length - 4,
                " more"))); }),
        index !== null && (React.createElement(Lightbox, { mainSrc: images[index], nextSrc: images[index + 1], prevSrc: images[index - 1], onCloseRequest: function () { return setIndex(null); }, onMoveNextRequest: function () { return setIndex(index + 1); }, onMovePrevRequest: function () { return setIndex(index - 1); } }))));
};
//# sourceMappingURL=Gallery.js.map