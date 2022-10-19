import React, { useMemo } from 'react';
import { IconButton } from 'react-file-utils';
import { sanitizeURL, trimURL } from '../utils';
import { AvatarIcon, CloseIcon } from './Icons';
export var Card = function (_a) {
    var alt = _a.alt, _b = _a.images, images = _b === void 0 ? [] : _b, imageURL = _a.image, handleClose = _a.handleClose, description = _a.description, nolink = _a.nolink, url = _a.url, title = _a.title, className = _a.className, style = _a.style;
    var sanitizedURL = useMemo(function () { return sanitizeURL(url); }, [url]);
    var trimmedURL = useMemo(function () { return trimURL(sanitizedURL); }, [sanitizedURL]);
    var image = (!imageURL && images.length ? images : [{ image: imageURL }])[0].image;
    return (React.createElement("a", { href: nolink ? undefined : sanitizedURL, target: "blank", rel: "nofollow noreferrer noopener", className: className !== null && className !== void 0 ? className : "raf-card " + (image !== undefined ? 'raf-card--with-image' : ''), style: style },
        handleClose && image ? (React.createElement(IconButton, { onClick: handleClose },
            React.createElement(CloseIcon, null))) : null,
        image !== undefined && (React.createElement("div", { className: "raf-card__image" }, image === null ? (React.createElement(AvatarIcon, { preserveAspectRatio: "xMinYMin slice" })) : (React.createElement("img", { src: image, alt: alt || title || description || '' })))),
        React.createElement("div", { className: "raf-card__content" },
            React.createElement("div", { className: "raf-card__content-left" },
                React.createElement("p", { className: "raf-card__title" }, title),
                React.createElement("p", { className: "raf-card__url" }, trimmedURL),
                React.createElement("p", { className: "raf-card__description" }, description)),
            handleClose && image === undefined && (React.createElement("div", { className: "raf-card__content-right" },
                React.createElement(IconButton, { onClick: handleClose },
                    React.createElement(CloseIcon, null)))))));
};
//# sourceMappingURL=Card.js.map