import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
import { useRef, useState, useCallback, useEffect, useLayoutEffect, } from 'react';
import _uniq from 'lodash/uniq';
import _difference from 'lodash/difference';
import _includes from 'lodash/includes';
import { find as linkifyFind } from 'linkifyjs';
import { useDebouncedCallback } from 'use-debounce';
import { useStreamContext } from '../../context';
import { generateRandomId, dataTransferItemsToFiles, dataTransferItemsHaveFiles, inputValueFromEvent, } from '../../utils';
var defaultOgState = { activeUrl: '', data: {}, order: [] };
var defaultImageState = { data: {}, order: [] };
var defaultFileState = { data: {}, order: [] };
var useTextArea = function () {
    var _a = useState(''), text = _a[0], setText = _a[1];
    var _b = useState(null), curser = _b[0], setCurser = _b[1];
    var textInputRef = useRef();
    var insertText = useCallback(function (insertedText) {
        setText(function (prevText) {
            var textareaElement = textInputRef.current;
            if (!textareaElement) {
                setCurser(null);
                return prevText + insertedText;
            }
            // Insert emoji at previous cursor position
            var selectionStart = textareaElement.selectionStart, selectionEnd = textareaElement.selectionEnd;
            setCurser(selectionStart + insertedText.length);
            return prevText.slice(0, selectionStart) + insertedText + prevText.slice(selectionEnd);
        });
    }, []);
    var onSelectEmoji = useCallback(function (emoji) { return insertText(emoji.native); }, []);
    useLayoutEffect(function () {
        // Update cursorPosition after insertText is fired
        var textareaElement = textInputRef.current;
        if (textareaElement && curser !== null) {
            textareaElement.selectionStart = curser;
            textareaElement.selectionEnd = curser;
        }
    }, [curser]);
    return { text: text, setText: setText, insertText: insertText, onSelectEmoji: onSelectEmoji, textInputRef: textInputRef };
};
var useOg = function (_a) {
    var _b;
    var client = _a.client, logErr = _a.logErr;
    var _c = useState(defaultOgState), og = _c[0], setOg = _c[1];
    var reqInProgress = useRef({});
    var activeOg = (_b = og.data[og.activeUrl]) === null || _b === void 0 ? void 0 : _b.data;
    var orderedOgStates = og.order.map(function (url) { return og.data[url]; }).filter(Boolean);
    var isOgScraping = orderedOgStates.some(function (state) { return state.scrapingActive; });
    var availableOg = orderedOgStates.map(function (state) { return state.data; }).filter(Boolean);
    var resetOg = useCallback(function () { return setOg(defaultOgState); }, []);
    var setActiveOg = useCallback(function (url) {
        if (url) {
            setOg(function (prevState) {
                prevState.data[url].dismissed = false;
                return __assign(__assign({}, prevState), { activeUrl: url });
            });
        }
    }, []);
    var dismissOg = useCallback(function (e) {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        setOg(function (prevState) {
            for (var url in prevState.data) {
                prevState.data[url].dismissed = true;
            }
            return __assign(__assign({}, prevState), { activeUrl: '' });
        });
    }, []);
    var handleOG = useCallback(function (text) {
        var urls = _uniq(linkifyFind(text, 'url').map(function (info) { return info.href; }));
        // removed delete ogs from state and add the new urls
        setOg(function (prevState) {
            var newUrls = _difference(urls, prevState.order);
            var removedUrls = _difference(prevState.order, urls);
            if (!_includes(urls, prevState.activeUrl)) {
                prevState.activeUrl = '';
                for (var _i = 0, urls_1 = urls; _i < urls_1.length; _i++) {
                    var url = urls_1[_i];
                    var og_1 = prevState.data[url];
                    if ((og_1 === null || og_1 === void 0 ? void 0 : og_1.data) && !og_1.dismissed) {
                        prevState.activeUrl = url;
                        break;
                    }
                }
            }
            for (var _a = 0, removedUrls_1 = removedUrls; _a < removedUrls_1.length; _a++) {
                var url = removedUrls_1[_a];
                delete prevState.data[url];
            }
            for (var _b = 0, newUrls_1 = newUrls; _b < newUrls_1.length; _b++) {
                var url = newUrls_1[_b];
                prevState.data[url] = { scrapingActive: true, dismissed: false };
            }
            return __assign(__assign({}, prevState), { order: urls });
        });
    }, []);
    var handleOgDebounced = useDebouncedCallback(handleOG, 750, { leading: true, trailing: true });
    useEffect(function () {
        og.order
            .filter(function (url) { return !reqInProgress.current[url] && og.data[url].scrapingActive; })
            .forEach(function (url) { return __awaiter(void 0, void 0, void 0, function () {
            var resp_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqInProgress.current[url] = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, client.og(url)];
                    case 2:
                        resp_1 = _a.sent();
                        resp_1.url = url;
                        setOg(function (prevState) {
                            prevState.data[url] = __assign(__assign({}, prevState.data[url]), { data: resp_1, scrapingActive: false, dismissed: false });
                            prevState.activeUrl = prevState.activeUrl || url;
                            return __assign({}, prevState);
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.warn(e_1);
                        logErr(e_1, 'get-og');
                        setOg(function (prevState) {
                            prevState.data[url] = __assign(__assign({}, prevState.data[url]), { scrapingActive: false, dismissed: false });
                            return __assign({}, prevState);
                        });
                        return [3 /*break*/, 4];
                    case 4:
                        delete reqInProgress.current[url];
                        return [2 /*return*/];
                }
            });
        }); });
    }, [og.order]);
    return {
        og: og,
        activeOg: activeOg,
        setActiveOg: setActiveOg,
        resetOg: resetOg,
        availableOg: availableOg,
        orderedOgStates: orderedOgStates,
        isOgScraping: isOgScraping,
        handleOgDebounced: handleOgDebounced,
        dismissOg: dismissOg,
        ogActiveUrl: og.activeUrl,
    };
};
var useUpload = function (_a) {
    var client = _a.client, logErr = _a.logErr;
    var _b = useState(defaultImageState), images = _b[0], setImages = _b[1];
    var _c = useState(defaultFileState), files = _c[0], setFiles = _c[1];
    var reqInProgress = useRef({});
    var orderedImages = images.order.map(function (id) { return images.data[id]; });
    var uploadedImages = orderedImages.filter(function (upload) { return upload.url; });
    var orderedFiles = files.order.map(function (id) { return files.data[id]; });
    var uploadedFiles = orderedFiles.filter(function (upload) { return upload.url; });
    var resetUpload = useCallback(function () {
        setImages(defaultImageState);
        setFiles(defaultFileState);
    }, []);
    var uploadNewImage = useCallback(function (file) {
        var id = generateRandomId();
        setImages(function (_a) {
            var order = _a.order, data = _a.data;
            data[id] = { id: id, file: file, state: 'uploading' };
            return { data: __assign({}, data), order: __spreadArray(__spreadArray([], order, true), [id], false) };
        });
        if (FileReader) {
            // TODO: Possibly use URL.createObjectURL instead. However, then we need
            // to release the previews when not used anymore though.
            var reader = new FileReader();
            reader.onload = function (event) {
                var _a;
                var previewUri = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                if (!previewUri)
                    return;
                setImages(function (prevState) {
                    if (!prevState.data[id])
                        return prevState;
                    prevState.data[id].previewUri = previewUri;
                    return __assign(__assign({}, prevState), { data: __assign({}, prevState.data) });
                });
            };
            reader.readAsDataURL(file);
        }
    }, []);
    var uploadNewFile = useCallback(function (file) {
        var id = generateRandomId();
        setFiles(function (_a) {
            var order = _a.order, data = _a.data;
            data[id] = { id: id, file: file, state: 'uploading' };
            return { data: __assign({}, data), order: __spreadArray(__spreadArray([], order, true), [id], false) };
        });
    }, []);
    var uploadImage = useCallback(function (id, img) { return __awaiter(void 0, void 0, void 0, function () {
        var url_1, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setImages(function (prevState) {
                        if (!prevState.data[id])
                            return prevState;
                        prevState.data[id].state = 'uploading';
                        return __assign({}, prevState);
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.images.upload(img.file)];
                case 2:
                    url_1 = (_a.sent()).file;
                    setImages(function (prevState) {
                        if (!prevState.data[id])
                            return prevState;
                        prevState.data[id].url = url_1;
                        prevState.data[id].state = 'finished';
                        return __assign({}, prevState);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    console.warn(e_2);
                    setImages(function (prevState) {
                        if (!prevState.data[id])
                            return prevState;
                        logErr(e_2, 'upload-image');
                        prevState.data[id].state = 'failed';
                        return __assign({}, prevState);
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    var uploadFile = useCallback(function (id, file) { return __awaiter(void 0, void 0, void 0, function () {
        var url_2, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setFiles(function (prevState) {
                        if (!prevState.data[id])
                            return prevState;
                        prevState.data[id].state = 'uploading';
                        return __assign(__assign({}, prevState), { data: __assign({}, prevState.data) });
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.files.upload(file.file)];
                case 2:
                    url_2 = (_a.sent()).file;
                    setFiles(function (prevState) {
                        if (!prevState.data[id])
                            return prevState;
                        prevState.data[id].url = url_2;
                        prevState.data[id].state = 'finished';
                        return __assign(__assign({}, prevState), { data: __assign({}, prevState.data) });
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    console.warn(e_3);
                    setFiles(function (prevState) {
                        if (!prevState.data[id])
                            return prevState;
                        logErr(e_3, 'upload-file');
                        prevState.data[id].state = 'failed';
                        return __assign(__assign({}, prevState), { data: __assign({}, prevState.data) });
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    var uploadNewFiles = useCallback(function (files) {
        for (var i = 0; i < files.length; i += 1) {
            var file = files[i];
            if (file.type.startsWith('image/')) {
                uploadNewImage(file);
            }
            else if (file instanceof File) {
                uploadNewFile(file);
            }
        }
    }, []);
    var removeImage = useCallback(function (id) {
        setImages(function (prevState) {
            prevState.order = prevState.order.filter(function (oid) { return id !== oid; });
            delete prevState.data[id];
            return __assign({}, prevState);
        });
    }, []);
    var removeFile = useCallback(function (id) {
        // eslint-disable-next-line sonarjs/no-identical-functions
        setFiles(function (prevState) {
            prevState.order = prevState.order.filter(function (oid) { return id !== oid; });
            delete prevState.data[id];
            return __assign({}, prevState);
        });
    }, []);
    useEffect(function () {
        images.order
            .filter(function (id) { return !reqInProgress.current[id] && images.data[id].state === 'uploading'; })
            .forEach(function (id) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqInProgress.current[id] = true;
                        return [4 /*yield*/, uploadImage(id, images.data[id])];
                    case 1:
                        _a.sent();
                        delete reqInProgress.current[id];
                        return [2 /*return*/];
                }
            });
        }); });
    }, [images.order]);
    useEffect(function () {
        files.order
            .filter(function (id) { return !reqInProgress.current[id] && files.data[id].state === 'uploading'; })
            .forEach(function (id) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqInProgress.current[id] = true;
                        return [4 /*yield*/, uploadFile(id, files.data[id])];
                    case 1:
                        _a.sent();
                        delete reqInProgress.current[id];
                        return [2 /*return*/];
                }
            });
        }); });
    }, [files.order]);
    return {
        images: images,
        files: files,
        orderedImages: orderedImages,
        orderedFiles: orderedFiles,
        uploadedImages: uploadedImages,
        uploadedFiles: uploadedFiles,
        resetUpload: resetUpload,
        uploadNewFiles: uploadNewFiles,
        uploadFile: uploadFile,
        uploadImage: uploadImage,
        removeFile: removeFile,
        removeImage: removeImage,
    };
};
export function useStatusUpdateForm(_a) {
    var _this = this;
    var _b;
    var activityVerb = _a.activityVerb, feedGroup = _a.feedGroup, modifyActivityData = _a.modifyActivityData, doRequest = _a.doRequest, userId = _a.userId, onSuccess = _a.onSuccess;
    var _c = useState(false), submitting = _c[0], setSubmitting = _c[1];
    var appCtx = useStreamContext();
    var client = appCtx.client;
    var userData = (((_b = appCtx.user) === null || _b === void 0 ? void 0 : _b.data) || {});
    var logErr = useCallback(function (e, type) { return appCtx.errorHandler(e, type, { userId: userId, feedGroup: feedGroup }); }, []);
    var _d = useTextArea(), text = _d.text, setText = _d.setText, insertText = _d.insertText, onSelectEmoji = _d.onSelectEmoji, textInputRef = _d.textInputRef;
    var _e = useOg({ client: client, logErr: logErr }), resetOg = _e.resetOg, setActiveOg = _e.setActiveOg, ogActiveUrl = _e.ogActiveUrl, activeOg = _e.activeOg, dismissOg = _e.dismissOg, availableOg = _e.availableOg, isOgScraping = _e.isOgScraping, handleOgDebounced = _e.handleOgDebounced;
    var _f = useUpload({ client: client, logErr: logErr }), images = _f.images, files = _f.files, orderedImages = _f.orderedImages, orderedFiles = _f.orderedFiles, uploadedImages = _f.uploadedImages, uploadedFiles = _f.uploadedFiles, resetUpload = _f.resetUpload, uploadNewFiles = _f.uploadNewFiles, uploadFile = _f.uploadFile, uploadImage = _f.uploadImage, removeFile = _f.removeFile, removeImage = _f.removeImage;
    var resetState = useCallback(function () {
        setText('');
        setSubmitting(false);
        resetOg();
        resetUpload();
    }, []);
    var object = function () {
        for (var _i = 0, orderedImages_1 = orderedImages; _i < orderedImages_1.length; _i++) {
            var image = orderedImages_1[_i];
            if (image.url)
                return image.url;
        }
        return text.trim();
    };
    var canSubmit = function () {
        return !submitting &&
            Boolean(object()) &&
            orderedImages.every(function (upload) { return upload.state !== 'uploading'; }) &&
            orderedFiles.every(function (upload) { return upload.state !== 'uploading'; }) &&
            !isOgScraping;
    };
    var addActivity = function () { return __awaiter(_this, void 0, void 0, function () {
        var activity, modifiedActivity;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    activity = {
                        actor: (_a = client.currentUser) === null || _a === void 0 ? void 0 : _a.ref(),
                        object: object(),
                        verb: activityVerb,
                        text: text.trim(),
                        attachments: {
                            og: activeOg,
                            images: uploadedImages.map(function (image) { return image.url; }).filter(Boolean),
                            files: uploadedFiles.map(function (upload) { return ({
                                // url will never actually be empty string because uploadedFiles
                                // filters those out.
                                url: upload.url,
                                name: upload.file.name,
                                mimeType: upload.file.type,
                            }); }),
                        },
                    };
                    modifiedActivity = modifyActivityData ? modifyActivityData(activity) : activity;
                    if (!doRequest) return [3 /*break*/, 2];
                    return [4 /*yield*/, doRequest(modifiedActivity)];
                case 1: return [2 /*return*/, _b.sent()];
                case 2: return [4 /*yield*/, client.feed(feedGroup, userId).addActivity(modifiedActivity)];
                case 3: return [2 /*return*/, _b.sent()];
            }
        });
    }); };
    var onSubmitForm = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var response, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    setSubmitting(true);
                    return [4 /*yield*/, addActivity()];
                case 2:
                    response = _a.sent();
                    resetState();
                    if (onSuccess)
                        onSuccess(response);
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    setSubmitting(false);
                    logErr(e_4, 'add-activity');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var onChange = useCallback(function (event) {
        var text = inputValueFromEvent(event, true);
        if (text === null || text === undefined)
            return;
        setText(text);
        handleOgDebounced(text);
    }, []);
    var onPaste = useCallback(function (event) { return __awaiter(_this, void 0, void 0, function () {
        var items, plainTextPromise, _loop_1, i, state_1, fileLikes, s;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    items = event.clipboardData.items;
                    if (!dataTransferItemsHaveFiles(items))
                        return [2 /*return*/];
                    event.preventDefault();
                    _loop_1 = function (i) {
                        var item = items[i];
                        if (item.kind === 'string' && item.type === 'text/plain') {
                            plainTextPromise = new Promise(function (resolve) { return item.getAsString(resolve); });
                            return "break";
                        }
                    };
                    for (i = 0; i < items.length; i += 1) {
                        state_1 = _loop_1(i);
                        if (state_1 === "break")
                            break;
                    }
                    return [4 /*yield*/, dataTransferItemsToFiles(items)];
                case 1:
                    fileLikes = _a.sent();
                    if (fileLikes.length) {
                        uploadNewFiles(fileLikes);
                        return [2 /*return*/];
                    }
                    if (!plainTextPromise) return [3 /*break*/, 3];
                    return [4 /*yield*/, plainTextPromise];
                case 2:
                    s = _a.sent();
                    insertText(s);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); }, []);
    return {
        userData: userData,
        textInputRef: textInputRef,
        text: text,
        submitting: submitting,
        files: files,
        images: images,
        activeOg: activeOg,
        availableOg: availableOg,
        isOgScraping: isOgScraping,
        ogActiveUrl: ogActiveUrl,
        onSubmitForm: onSubmitForm,
        onSelectEmoji: onSelectEmoji,
        insertText: insertText,
        onChange: onChange,
        dismissOg: dismissOg,
        setActiveOg: setActiveOg,
        canSubmit: canSubmit,
        uploadNewFiles: uploadNewFiles,
        uploadFile: uploadFile,
        uploadImage: uploadImage,
        removeFile: removeFile,
        removeImage: removeImage,
        onPaste: onPaste,
    };
}
//# sourceMappingURL=useStatusUpdateForm.js.map