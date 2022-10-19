import { __awaiter, __generator } from "tslib";
import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { Textarea } from './Textarea';
import { inputValueFromEvent } from '../utils';
import { useFeedContext, useTranslationContext } from '../context';
export var CommentField = function (_a) {
    var activity = _a.activity, emojiData = _a.emojiData, onSuccess = _a.onSuccess, image = _a.image, placeholder = _a.placeholder, trigger = _a.trigger, targetFeeds = _a.targetFeeds, className = _a.className, style = _a.style;
    var feed = useFeedContext();
    var t = useTranslationContext().t;
    var textareaReference = useRef();
    var _b = useState(), text = _b[0], setText = _b[1];
    var handleFormSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    if (!text)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, feed.onAddReaction('comment', activity, { text: text }, { targetFeeds: targetFeeds })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4:
                    setText('');
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                    return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        if (!textareaReference.current)
            return;
        var handleFormSubmitKey = function (event) {
            var textarea = textareaReference.current;
            if (event.key === 'Enter' && (textarea === null || textarea === void 0 ? void 0 : textarea.nextSibling) === null) {
                handleFormSubmit(event);
            }
        };
        textareaReference.current.addEventListener('keydown', handleFormSubmitKey);
        return function () { var _a; return (_a = textareaReference.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('keydown', handleFormSubmitKey); };
    }, []);
    return (React.createElement("form", { onSubmit: handleFormSubmit, className: classNames('raf-comment-field', className), style: style },
        image && React.createElement(Avatar, { image: image, circle: true, size: 39 }),
        React.createElement("div", { className: "raf-comment-field__group" },
            React.createElement(Textarea, { rows: 1, value: text, placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : t('Start Typing...'), onChange: function (event) { return setText(function (pv) { var _a; return (_a = inputValueFromEvent(event, true)) !== null && _a !== void 0 ? _a : pv; }); }, emojiData: emojiData, trigger: trigger, maxLength: 280, innerRef: function (element) { return (textareaReference.current = element); } }),
            React.createElement(Button, { buttonStyle: "primary", disabled: !text, type: "submit" }, t('Post')))));
};
//# sourceMappingURL=CommentField.js.map