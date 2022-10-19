import { __assign } from "tslib";
import React, { useMemo } from 'react';
import { IconButton } from 'react-file-utils';
import URLParse from 'url-parse';
import { sanitizeURL } from '../utils';
import { CloseIcon } from './Icons';
export var Video = function (_a) {
    var _b;
    var _c = _a.og, _d = _c.videos, videos = _d === void 0 ? [] : _d, _e = _c.images, images = _e === void 0 ? [] : _e, ogURL = _c.url, title = _c.title, description = _c.description, siteName = _c.site_name, handleClose = _a.handleClose, _f = _a.urlsThatAreGifs, gifHosts = _f === void 0 ? ['i.giphy.com', 'i.imgur.com', 'media.giphy.com'] : _f;
    var video = useMemo(function () { return videos.find(function (_a) {
        var type = _a.type;
        return type === 'text/html' || type === 'video/mp4';
    }); }, [videos]);
    if (!video)
        return null;
    var videoURL = sanitizeURL(video.secure_url || video.video);
    var host = useMemo(function () { return new URLParse(videoURL !== null && videoURL !== void 0 ? videoURL : ''); }, [videoURL]).host;
    var isGif = useMemo(function () { return gifHosts.some(function (gifHost) { return gifHost === host; }); }, [host, gifHosts]);
    var image = images[0];
    var videoProps = isGif
        ? {
            controls: false,
            preload: 'auto',
            autoPlay: true,
            muted: true,
            loop: true,
            playsInline: true, // don't open video in fullscreen on mobile
            // 'webkit-playsinline': 'webkit-playsinline',
        }
        : {
            controls: true,
            preload: 'metadata',
            poster: (_b = image === null || image === void 0 ? void 0 : image.secure_url) !== null && _b !== void 0 ? _b : image === null || image === void 0 ? void 0 : image.image,
        };
    var closeButton = handleClose && (React.createElement(IconButton, { onClick: handleClose },
        React.createElement(CloseIcon, null)));
    if (video.type === 'text/html') {
        var newVideoURL = videoURL === null || videoURL === void 0 ? void 0 : videoURL.split('/watch?v=').join('/embed/');
        return (React.createElement("div", { className: "raf-video__frame" },
            closeButton,
            React.createElement("iframe", { title: 'embedded player', id: "ytplayer", width: video.width, height: video.height, src: newVideoURL, frameBorder: "0" })));
    }
    return (React.createElement("div", { className: "raf-video__video" },
        React.createElement("video", __assign({ className: "raf-video__video--video" }, videoProps),
            React.createElement("source", { src: videoURL, type: video.type })),
        React.createElement("div", { className: "raf-video__video--content" },
            React.createElement("div", { className: "raf-video__video--title" }, title),
            React.createElement("div", { className: "raf-video__video--description" }, description),
            React.createElement("div", { className: "raf-video__video--link" },
                React.createElement("a", { href: sanitizeURL(ogURL), target: "blank" }, siteName))),
        closeButton));
};
//# sourceMappingURL=Video.js.map