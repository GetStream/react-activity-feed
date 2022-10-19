import { __assign } from "tslib";
import React, { useMemo } from 'react';
import classNames from 'classnames';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import { LoadingIndicator } from 'react-file-utils';
// @ts-expect-error
import EmojiIndex from 'emoji-mart/dist/utils/emoji-index/nimble-emoji-index';
import defaultEmojiData from '../utils/emojiData';
var emojiTrigger = function (emojiData) {
    var emojiIndex = new EmojiIndex(emojiData);
    return {
        ':': {
            output: function (item) { return ({ key: item.id, text: item.native, caretPosition: 'next' }); },
            dataProvider: function (token) {
                // condition extracted from emoji-mart to circumvent the bug in the emoji-mart package
                if (['-', '-1'].includes(token)) {
                    return [emojiIndex.emojis['-1']];
                }
                return (emojiIndex.search(token) || []).slice(0, 10);
            },
            component: function AutocompleteItem(_a) {
                var _b = _a.entity, id = _b.id, native = _b.native;
                return (React.createElement("div", null,
                    native,
                    " ",
                    id));
            },
        },
    };
};
export var Textarea = function (_a) {
    var _b = _a.emojiData, emojiData = _b === void 0 ? defaultEmojiData : _b, innerRef = _a.innerRef, maxLength = _a.maxLength, onChange = _a.onChange, onPaste = _a.onPaste, _c = _a.placeholder, placeholder = _c === void 0 ? 'Share your opinion' : _c, _d = _a.rows, rows = _d === void 0 ? 3 : _d, _e = _a.trigger, trigger = _e === void 0 ? {} : _e, value = _a.value, className = _a.className, style = _a.style;
    var emoji = useMemo(function () { return emojiTrigger(emojiData); }, []);
    return (React.createElement(ReactTextareaAutocomplete, { loadingComponent: LoadingIndicator, 
        // @ts-expect-error
        trigger: __assign(__assign({}, emoji), trigger), innerRef: innerRef &&
            (function (el) {
                if (typeof innerRef === 'function') {
                    innerRef(el);
                }
                else if (innerRef !== null) {
                    innerRef.current = el;
                }
            }), rows: rows, maxLength: maxLength, className: classNames('raf-textarea__textarea', className), style: style, containerClassName: "raf-textarea", dropdownClassName: "raf-emojisearch", listClassName: "raf-emojisearch__list", itemClassName: "raf-emojisearch__item", placeholder: placeholder, onChange: onChange, onSelect: onChange, onPaste: onPaste, value: value }));
};
//# sourceMappingURL=Textarea.js.map