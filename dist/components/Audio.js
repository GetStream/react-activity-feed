import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import { IconButton } from 'react-file-utils';
import { sanitizeURL, smartRender } from '../utils';
import { CloseIcon, PlayCircleIcon, PauseCircleIcon } from './Icons';
export var Audio = function (_a) {
    var _b = _a.og, _c = _b.audios, audios = _c === void 0 ? [] : _c, _d = _b.images, images = _d === void 0 ? [] : _d, description = _b.description, title = _b.title, handleClose = _a.handleClose, className = _a.className, style = _a.style;
    var audioReference = useRef(null);
    var intervalReference = useRef();
    var _e = useState(0), progress = _e[0], setProgress = _e[1];
    var _f = useState(false), playing = _f[0], setPlaying = _f[1];
    var handleProgressBarClick = function (_a) {
        var target = _a.currentTarget, clientX = _a.clientX;
        if (!audioReference.current)
            return;
        var _b = target.getBoundingClientRect(), width = _b.width, x = _b.x;
        var ratio = (clientX - x) / width;
        if (!playing)
            setProgress(ratio * 100);
        audioReference.current.currentTime = ratio * audioReference.current.duration;
    };
    useEffect(function () {
        if (!audioReference.current || !playing)
            return;
        intervalReference.current = window.setInterval(function () {
            if (!audioReference.current)
                return;
            var _a = audioReference.current, currentTime = _a.currentTime, duration = _a.duration;
            setProgress((currentTime / duration) * 100);
            if (currentTime === duration)
                setPlaying(false);
        }, 100);
        audioReference.current.play();
        return function () {
            var _a;
            (_a = audioReference.current) === null || _a === void 0 ? void 0 : _a.pause();
            if (!intervalReference.current)
                return;
            window.clearInterval(intervalReference.current);
            intervalReference.current = undefined;
        };
    }, [playing]);
    var audio = audios[0];
    var audioURL = sanitizeURL(audio.secure_url || audio.audio);
    var imageURL = images[0].image;
    return (React.createElement("div", { className: classNames('raf-audio', className), style: style },
        React.createElement("div", { className: "raf-audio__wrapper" },
            React.createElement("audio", { ref: audioReference },
                React.createElement("source", { src: audioURL, type: "audio/mp3" })),
            React.createElement("div", { className: "raf-audio__image" },
                React.createElement("div", { className: "raf-audio__image--overlay" },
                    React.createElement("div", { role: "button", onClick: function () { return setPlaying(function (pv) { return !pv; }); }, className: "raf-audio__image--button" }, smartRender(playing ? PauseCircleIcon : PlayCircleIcon, { style: { width: '1em' } }))),
                React.createElement("img", { src: imageURL, alt: description !== null && description !== void 0 ? description : '' })),
            React.createElement("div", { className: "raf-audio__content" },
                React.createElement("span", { className: "raf-audio__content--title" },
                    React.createElement("strong", null, title)),
                React.createElement("span", { className: "raf-audio__content--subtitle" }, description !== null && description !== void 0 ? description : ''),
                React.createElement("div", { role: "progressbar", style: { cursor: 'pointer' }, onClick: handleProgressBarClick, className: "raf-audio__content--progress" },
                    React.createElement("div", { style: { width: progress + "%" } }))),
            handleClose && (React.createElement(IconButton, { onClick: handleClose },
                React.createElement(CloseIcon, null))))));
};
//# sourceMappingURL=Audio.js.map