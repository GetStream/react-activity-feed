import { __awaiter, __generator } from "tslib";
import { useMemo } from 'react';
import URL from 'url-parse';
import Dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import minMax from 'dayjs/plugin/minMax';
import relativeTime from 'dayjs/plugin/relativeTime';
Dayjs.extend(utc);
Dayjs.extend(minMax);
Dayjs.extend(relativeTime);
export function isTimezoneAwareTimestamp(timestamp) {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3,6}(Z$|[+-]\d{2}:\d{2}$)/.test(timestamp);
}
export function humanizeTimestamp(timestamp, tDateTimeParser) {
    var time;
    // Following calculation is based on assumption that tDateTimeParser()
    // either returns momentjs or dayjs object.
    // When timestamp is not timezone-aware, we are supposed to take it as UTC time.
    // Ideally we need to adhere to RFC3339. Unfortunately this needs to be fixed on backend.
    if (typeof timestamp === 'string' && isTimezoneAwareTimestamp(timestamp)) {
        time = tDateTimeParser(timestamp);
    }
    else {
        time = tDateTimeParser(timestamp).add(Dayjs(timestamp).utcOffset(), 'minute'); // parse time as UTC
    }
    return time.fromNow();
}
function isErrorUser(user) {
    return !!user && typeof user.error === 'string';
}
export function userOrDefault(user) {
    if (!user || typeof user === 'string' || isErrorUser(user))
        return {
            id: '!not-found',
            created_at: '',
            updated_at: '',
            data: { name: 'Unknown', profileImage: '' },
        };
    return user;
}
// https://stackoverflow.com/a/6860916/2570866
export function generateRandomId() {
    // prettier-ignore
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export function dataTransferItemsHaveFiles(items) {
    if (!items || !items.length)
        return false;
    for (var i = 0; i < items.length; i += 1) {
        var item = items[i];
        if (item.kind === 'file' || item.type === 'text/html')
            return true;
    }
    return false;
}
function getFileLikes(items) {
    var fileLikes = [];
    for (var i = 0; i < items.length; i += 1) {
        var item = items[i];
        if (item.kind === 'file') {
            var file = item.getAsFile();
            if (file)
                fileLikes.push(file);
        }
    }
    return fileLikes;
}
export function dataTransferItemsToFiles(items) {
    return __awaiter(this, void 0, void 0, function () {
        var fileLikes, blobPromises, parser, _loop_1, i;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!items || !items.length)
                        return [2 /*return*/, []];
                    fileLikes = getFileLikes(items);
                    // If there are files inside the DataTransferItem prefer those
                    if (fileLikes.length)
                        return [2 /*return*/, fileLikes];
                    blobPromises = [];
                    parser = new DOMParser();
                    _loop_1 = function (i) {
                        var item = items[i];
                        if (item.type === 'text/html') {
                            blobPromises.push(new Promise(function (accept) {
                                item.getAsString(function (s) { return __awaiter(_this, void 0, void 0, function () {
                                    var doc, imageTags, imagePromises, _loop_2, j;
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                doc = parser.parseFromString(s, 'text/html');
                                                imageTags = doc.getElementsByTagName('img');
                                                imagePromises = [];
                                                _loop_2 = function (j) {
                                                    var tag = imageTags[j];
                                                    if (!tag.src) {
                                                        return "continue";
                                                    }
                                                    imagePromises.push((function () { return __awaiter(_this, void 0, void 0, function () {
                                                        var res, e_1, contentType, buf, blob;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0:
                                                                    _a.trys.push([0, 2, , 3]);
                                                                    return [4 /*yield*/, fetch(tag.src)];
                                                                case 1:
                                                                    res = _a.sent();
                                                                    return [3 /*break*/, 3];
                                                                case 2:
                                                                    e_1 = _a.sent();
                                                                    return [2 /*return*/];
                                                                case 3:
                                                                    contentType = res.headers.get('Content-type') || 'application/octet-stream';
                                                                    return [4 /*yield*/, res.arrayBuffer()];
                                                                case 4:
                                                                    buf = _a.sent();
                                                                    blob = new Blob([buf], { type: contentType });
                                                                    fileLikes.push(blob);
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); })());
                                                };
                                                for (j = 0; j < imageTags.length; j++) {
                                                    _loop_2(j);
                                                }
                                                return [4 /*yield*/, Promise.all(imagePromises)];
                                            case 1:
                                                _a.sent();
                                                accept(true);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            }));
                        }
                    };
                    for (i = 0; i < items.length; i += 1) {
                        _loop_1(i);
                    }
                    return [4 /*yield*/, Promise.all(blobPromises)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, fileLikes];
            }
        });
    });
}
export function inputValueFromEvent(event, targetFirst) {
    var _a;
    if (event === void 0) { event = undefined; }
    if (targetFirst === void 0) { targetFirst = false; }
    try {
        var target = ((_a = event === null || event === void 0 ? void 0 : event[targetFirst ? 'target' : 'currentTarget']) !== null && _a !== void 0 ? _a : event === null || event === void 0 ? void 0 : event[targetFirst ? 'currentTarget' : 'target']);
        return target === null || target === void 0 ? void 0 : target.value;
    }
    catch (error) {
        console.error(error);
        return undefined;
    }
}
export function sanitizeURL(url) {
    if (!url)
        return url;
    var proto = URL(url).protocol;
    // allow http, https, ftp
    // IMPORTANT: Don't allow data: protocol because of:
    // <a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgneHNzJyk7PC9zY3JpcHQ+" target="_blank">here</a>
    if (proto === 'https:' || proto === 'http:' || proto === 'ftp:') {
        return url;
    }
    return undefined;
}
export var trimURL = function (url) {
    return url === null || url === void 0 ? void 0 : url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/').shift();
};
export var useOnClickUser = function (onClickUser) {
    return useMemo(function () {
        return onClickUser
            ? function (user) { return function (event) {
                event.stopPropagation();
                onClickUser(userOrDefault(user));
            }; }
            : undefined;
    }, [onClickUser]);
};
export * from './textRenderer';
export * from './smartRender';
//# sourceMappingURL=index.js.map