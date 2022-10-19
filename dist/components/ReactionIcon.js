import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useTranslationContext } from '../context';
export var ReactionIcon = function (_a) {
    var _b;
    var counts = _a.counts, kind = _a.kind, icon = _a.icon, labelPlural = _a.labelPlural, labelSingle = _a.labelSingle, onPress = _a.onPress, className = _a.className, style = _a.style;
    var t = useTranslationContext().t;
    var count = (_b = counts === null || counts === void 0 ? void 0 : counts[kind !== null && kind !== void 0 ? kind : '']) !== null && _b !== void 0 ? _b : 0;
    var label = useMemo(function () {
        var isPlural = count > 1 || count < 1;
        if (labelSingle && labelPlural)
            return count + " " + (isPlural ? labelPlural : labelSingle);
        if (kind !== 'comment' && kind !== 'repost' && kind !== 'like')
            return;
        // for future maintainers: this atrocity right here is intentional
        // and it is writen this way to allow i18next-extract evaluate keys
        // for extraction, there's no other reason
        switch (kind) {
            case 'comment':
                return isPlural ? t("{{ countComments }} comments", { countComments: count }) : t('1 comment');
            case 'like':
                return isPlural ? t("{{ countLikes }} likes", { countLikes: count }) : t('1 like');
            case 'repost':
                return isPlural ? t("{{ countReposts }} reposts", { countReposts: count }) : t('1 repost');
            default:
                return;
        }
    }, [count, labelSingle, labelPlural, kind]);
    return (React.createElement("div", { className: classNames('raf-reaction-icon', className), role: "button", onClick: onPress, style: style },
        icon && (typeof icon === 'string' ? React.createElement("img", { className: "raf-reaction-icon__image", src: icon, alt: "" }) : icon),
        React.createElement("p", { className: "raf-reaction-icon__label" }, label)));
};
//# sourceMappingURL=ReactionIcon.js.map