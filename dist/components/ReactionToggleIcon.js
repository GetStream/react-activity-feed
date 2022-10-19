import { __assign, __rest } from "tslib";
import React from 'react';
import classNames from 'classnames';
import { ReactionIcon } from './ReactionIcon';
export var ReactionToggleIcon = function (_a) {
    var _b;
    var inactiveIcon = _a.inactiveIcon, activeIcon = _a.activeIcon, ownReactions = _a.own_reactions, kind = _a.kind, className = _a.className, style = _a.style, restProps = __rest(_a, ["inactiveIcon", "activeIcon", "own_reactions", "kind", "className", "style"]);
    var icon = ((_b = ownReactions === null || ownReactions === void 0 ? void 0 : ownReactions[kind !== null && kind !== void 0 ? kind : '']) === null || _b === void 0 ? void 0 : _b.length) ? activeIcon : inactiveIcon;
    return (React.createElement("div", { className: classNames('raf-reaction-toggle-icon', className), style: style },
        React.createElement(ReactionIcon, __assign({ icon: icon, kind: kind }, restProps))));
};
//# sourceMappingURL=ReactionToggleIcon.js.map