import { __assign, __rest } from "tslib";
import React from 'react';
import classNames from 'classnames';
import { FileIcon } from 'react-file-utils';
import { textRenderer, smartRender, sanitizeURL } from '../utils';
import { Audio } from './Audio';
import { Video } from './Video';
import { Card as DefaultCard } from './Card';
import { Gallery } from './Gallery';
export var ActivityContent = function (_a) {
    var activity = _a.activity, Repost = _a.Repost, _b = _a.Card, Card = _b === void 0 ? DefaultCard : _b, className = _a.className, style = _a.style, props = __rest(_a, ["activity", "Repost", "Card", "className", "style"]);
    var object = activity.object, _c = activity.text, text = _c === void 0 ? (typeof object === 'string' ? object : '').trim() : _c, _d = activity.attachments, _e = _d === void 0 ? {} : _d, og = _e.og, _f = _e.images, images = _f === void 0 ? [] : _f, _g = _e.files, files = _g === void 0 ? [] : _g, verb = activity.verb, image = activity.image;
    return (React.createElement("div", { className: classNames('raf-activity__content', className), style: style },
        text && (React.createElement("div", { style: { padding: '8px 16px' } },
            React.createElement("p", null, textRenderer(text, 'raf-activity', props.onClickMention, props.onClickHashtag)))),
        og && (React.createElement("div", { style: { padding: '8px 16px' } }, og.videos ? React.createElement(Video, { og: og }) : og.audios ? React.createElement(Audio, { og: og }) : smartRender(Card, og))),
        typeof image === 'string' && (React.createElement("div", { style: { padding: '8px 0' } },
            React.createElement(Gallery, { images: [image] }))),
        !!images.length && (React.createElement("div", { style: { padding: '8px 0' } },
            React.createElement(Gallery, { images: images }))),
        !!files.length && (React.createElement("ol", { className: "raf-activity__attachments" }, files.map(function (_a, i) {
            var name = _a.name, url = _a.url, mimeType = _a.mimeType;
            return (React.createElement("a", { href: sanitizeURL(url), download: true, key: i },
                React.createElement("li", { className: "raf-activity__file" },
                    React.createElement(FileIcon, { mimeType: mimeType, filename: name }),
                    " ",
                    name)));
        }))),
        verb === 'repost' &&
            typeof object === 'object' &&
            smartRender(Repost, __assign(__assign({}, props), { activity: object }))));
};
//# sourceMappingURL=ActivityContent.js.map