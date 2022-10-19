import React from 'react';
import classNames from 'classnames';
import { AvatarIcon } from './Icons';
export function Avatar(_a) {
    var size = _a.size, image = _a.image, alt = _a.alt, rounded = _a.rounded, circle = _a.circle, onClick = _a.onClick, className = _a.className, _b = _a.style, style = _b === void 0 ? size ? { width: size + "px", height: size + "px" } : undefined : _b;
    var cn = classNames('raf-avatar', className, {
        'raf-avatar--rounded': rounded,
        'raf-avatar--circle': circle,
    });
    return image ? (React.createElement("img", { className: cn, style: style, src: image, alt: alt !== null && alt !== void 0 ? alt : '', onClick: onClick })) : (React.createElement(AvatarIcon, { className: cn, style: style, onClick: onClick }));
}
//# sourceMappingURL=Avatar.js.map