import { __assign } from "tslib";
import React from 'react';
import { FilePreviewer, FileUploadButton, ImageDropzone, ImagePreviewer, ImageUploadButton, LoadingIndicator, } from 'react-file-utils';
import { useTranslationContext } from '../../context';
import { smartRender } from '../../utils';
import { useStatusUpdateForm } from './useStatusUpdateForm';
import { Panel, PanelContent, PanelFooter, PanelHeading } from '../Panel';
import { Textarea as DefaultTextarea } from '../Textarea';
import { Avatar } from '../Avatar';
import { Card } from '../Card';
import { Audio } from '../Audio';
import { Video } from '../Video';
import { EmojiPicker } from '../EmojiPicker';
import { Button } from '../Button';
import { Title } from '../Title';
import { BookmarkIcon } from '../Icons';
export function StatusUpdateForm(_a) {
    var _b = _a.feedGroup, feedGroup = _b === void 0 ? 'user' : _b, _c = _a.activityVerb, activityVerb = _c === void 0 ? 'post' : _c, modifyActivityData = _a.modifyActivityData, emojiData = _a.emojiData, emojiI18n = _a.emojiI18n, Header = _a.Header, FooterItem = _a.FooterItem, _d = _a.Textarea, Textarea = _d === void 0 ? DefaultTextarea : _d, trigger = _a.trigger, doRequest = _a.doRequest, userId = _a.userId, onSuccess = _a.onSuccess, style = _a.style, className = _a.className;
    var t = useTranslationContext().t;
    var state = useStatusUpdateForm({
        feedGroup: feedGroup,
        activityVerb: activityVerb,
        modifyActivityData: modifyActivityData,
        doRequest: doRequest,
        userId: userId,
        onSuccess: onSuccess,
    });
    return (React.createElement(Panel, { style: style, className: className },
        React.createElement("form", { onSubmit: state.onSubmitForm },
            React.createElement(ImageDropzone, { handleFiles: state.uploadNewFiles },
                React.createElement(PanelHeading, null, Header !== null && Header !== void 0 ? Header : React.createElement(Title, null, t('New Post'))),
                React.createElement(PanelContent, null,
                    React.createElement("div", { style: { display: 'flex' } },
                        state.userData.profileImage && (React.createElement("div", { style: { marginRight: '16px' } },
                            React.createElement(Avatar, { image: state.userData.profileImage, size: 50, circle: true }))),
                        smartRender(Textarea, {
                            emojiData: emojiData,
                            innerRef: state.textInputRef,
                            onChange: state.onChange,
                            onPaste: state.onPaste,
                            placeholder: t('Type your post...'),
                            trigger: trigger,
                            value: state.text,
                        })),
                    state.isOgScraping && (React.createElement("div", { className: "raf-status-update-form__og-loading" },
                        React.createElement(LoadingIndicator, null),
                        " ",
                        t('Getting website data...'))),
                    state.activeOg && (React.createElement("div", { style: { margin: '8px 0' } }, !state.activeOg.videos && !state.activeOg.audios ? (React.createElement(Card, __assign({ nolink: true, handleClose: state.dismissOg }, state.activeOg))) : (React.createElement(React.Fragment, null,
                        !!state.activeOg.videos && React.createElement(Video, { og: state.activeOg, handleClose: state.dismissOg }),
                        !!state.activeOg.audios && React.createElement(Audio, { og: state.activeOg, handleClose: state.dismissOg }))))),
                    state.availableOg && state.availableOg.length > 1 && (React.createElement("ol", { className: "raf-status-update-form__url-list" }, state.availableOg.map(function (_a) {
                        var url = _a.url, title = _a.title;
                        return (React.createElement("li", { onClick: function () { return state.setActiveOg(url); }, key: url, className: "raf-status-update-form__url-list-item" + (url === state.ogActiveUrl ? ' raf-status-update-form__url-list-item--active' : '') },
                            React.createElement(BookmarkIcon, { style: {
                                    width: '0.75em',
                                    verticalAlign: '-0.125em',
                                } }),
                            ' ',
                            title !== undefined ? title : url));
                    }))),
                    state.images.order.length > 0 && (React.createElement(ImagePreviewer, { imageUploads: state.images.order.map(function (id) { return state.images.data[id]; }), handleRemove: state.removeImage, handleRetry: function (id) { return state.uploadImage(id, state.images.data[id]); }, handleFiles: state.uploadNewFiles })),
                    state.files.order.length > 0 && (React.createElement(FilePreviewer, { uploads: state.files.order.map(function (id) { return state.files.data[id]; }), handleRemove: state.removeFile, handleRetry: function (id) { return state.uploadFile(id, state.files.data[id]); }, handleFiles: state.uploadNewFiles }))),
                React.createElement(PanelFooter, null,
                    React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                        React.createElement("div", { style: { flex: 1 } },
                            React.createElement("div", { style: { marginRight: '32px', display: 'inline-block' } },
                                React.createElement(ImageUploadButton, { resetOnChange: true, handleFiles: state.uploadNewFiles, multiple: true })),
                            React.createElement("div", { style: { marginRight: '32px', display: 'inline-block' } },
                                React.createElement(FileUploadButton, { handleFiles: state.uploadNewFiles, multiple: true })),
                            React.createElement(EmojiPicker, { onSelect: state.onSelectEmoji, emojiData: emojiData, i18n: emojiI18n }),
                            FooterItem),
                        React.createElement(Button, { type: "submit", buttonStyle: "primary", loading: state.submitting, disabled: !state.canSubmit() }, t('Post'))))))));
}
//# sourceMappingURL=StatusUpdateForm.js.map