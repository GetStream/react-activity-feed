import React, { useRef, useState } from 'react';
import classNames from 'classnames';
// @ts-expect-error
import NimbleEmojiPicker from 'emoji-mart/dist/components/picker/nimble-picker.js';
import defaultEmojiData from '../utils/emojiData';
import { useTranslationContext } from '../context';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { EmojiIcon } from './Icons';
export var getEmojiPickerFieldsTranslations = function (t) { return ({
    search: t('Search'),
    // todo: remove after fixed I18n type definition in emoji-mart package
    // @ts-expect-error
    clear: t('Clear'),
    notfound: t('No emoji found'),
    skintext: t('Choose your default skin tone'),
    categorieslabel: t('Emoji categories'),
    categories: {
        search: t('Search Results'),
        recent: t('Frequently Used'),
        people: t('Smileys & Emotion'),
        nature: t('Animals & Nature'),
        foods: t('Food & Drink'),
        activity: t('Activity'),
        places: t('Travel & Places'),
        objects: t('Objects'),
        symbols: t('Symbols'),
        flags: t('Flags'),
        custom: t('Custom'),
    },
}); };
export var EmojiPicker = function (_a) {
    var _b = _a.emojiData, emojiData = _b === void 0 ? defaultEmojiData : _b, i18n = _a.i18n, onSelect = _a.onSelect, className = _a.className, style = _a.style;
    var t = useTranslationContext().t;
    var _c = useState(false), open = _c[0], setOpen = _c[1];
    var emojiPicker = useRef(null);
    useOnClickOutside(emojiPicker, function () { return setOpen(false); }, open);
    return (React.createElement("div", { className: classNames('raf-emoji-picker', className), style: style },
        open && (React.createElement("div", { "data-testid": "picker-wrapper", className: "raf-emoji-picker__container", ref: emojiPicker },
            React.createElement(NimbleEmojiPicker, { i18n: i18n !== null && i18n !== void 0 ? i18n : getEmojiPickerFieldsTranslations(t), emoji: "point_up", title: t('Pick your emoji'), data: emojiData, onSelect: onSelect }))),
        React.createElement("div", { role: "button", onClick: function () { return setOpen(true); }, className: "raf-emoji-picker__button" },
            React.createElement(EmojiIcon, null))));
};
//# sourceMappingURL=EmojiPicker.js.map