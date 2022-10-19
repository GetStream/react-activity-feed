import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Thumbnail } from 'react-file-utils';
import { userOrDefault } from '../utils';
export function AttachedActivity(_a) {
    var _b;
    var _c = _a.activity, object = _c.object, verb = _c.verb, attachments = _c.attachments, actor = _c.actor, className = _a.className, style = _a.style;
    var images = (_b = attachments === null || attachments === void 0 ? void 0 : attachments.images) !== null && _b !== void 0 ? _b : [];
    var user = useMemo(function () { return userOrDefault(actor); }, [actor]);
    if (verb !== 'repost' && verb !== 'post' && verb !== 'comment')
        return null;
    return (React.createElement("div", { className: classNames('raf-attached-activity', className), style: style }, images.length ? (React.createElement("div", { className: "raf-attached-activity__images" }, images.slice(0, 5).map(function (image, i) { return (React.createElement(Thumbnail, { image: image, size: 50, key: "image-" + i })); }))) : (React.createElement(React.Fragment, null,
        React.createElement("p", { className: "raf-attached-activity__author" },
            React.createElement("strong", null, user.data.name)),
        React.createElement("p", { className: "raf-attached-activity__content" }, object)))));
}
//# sourceMappingURL=AttachedActivity.js.map