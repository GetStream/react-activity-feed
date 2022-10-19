import React from 'react';
import _truncate from 'lodash/truncate';
import * as linkify from 'linkifyjs';
// @ts-expect-error
import linkifyMention from 'linkifyjs/plugins/mention';
// 'linkifyjs/plugins/hashtag';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function linkifyHashtag(linkify) {
    var TT = linkify.scanner.TOKENS; // Text tokens
    var MultiToken = linkify.parser.TOKENS.Base; // Base Multi token class
    var S_START = linkify.parser.start;
    function HASHTAG(value) {
        // @ts-expect-error
        this.v = value;
    }
    linkify.inherits(MultiToken, HASHTAG, { type: 'hashtag', isLink: true });
    var S_HASH = S_START.jump(TT.POUND);
    var S_HASHTAG = new linkify.parser.State(HASHTAG);
    S_HASH.on(TT.DOMAIN, S_HASHTAG);
    S_HASH.on(TT.UNDERSCORE, S_HASHTAG);
    S_HASH.on(TT.TLD, S_HASHTAG);
    // following lines are the diff from original implemention
    // add support for _ in hashtags
    S_HASH.on(TT.LOCALHOST, S_HASHTAG);
    S_HASHTAG.on(TT.UNDERSCORE, S_HASH);
}
linkifyMention(linkify);
linkifyHashtag(linkify);
var CustomAnchor = function (_a) {
    var type = _a.type, word = _a.word, parentClass = _a.parentClass, value = _a.value, _b = _a.clickCallback, clickCallback = _b === void 0 ? function () { } : _b;
    return (React.createElement(React.Fragment, null,
        !word.startsWith(value) && word.slice(0, word.indexOf(value)),
        React.createElement("a", { onClick: function () { return clickCallback(value.substring(1)); }, className: parentClass + "__" + type }, value),
        !word.endsWith(value) && word.slice(word.indexOf(value) + value.length)));
};
var renderWord = function (word, key, parentClass, onClickMention, onClickHashtag) {
    var link = linkify.find(word)[0];
    if (!link)
        return word;
    var type = link.type, value = link.value, href = link.href;
    if (onClickMention && type === 'mention') {
        return (React.createElement(CustomAnchor, { key: key, type: type, value: value, word: word, clickCallback: onClickMention, parentClass: parentClass }));
    }
    if (onClickHashtag && type === 'hashtag') {
        return (React.createElement(CustomAnchor, { key: key, type: type, value: value, word: word, clickCallback: onClickHashtag, parentClass: parentClass }));
    }
    if (type === 'email' || type === 'url') {
        return (React.createElement("a", { href: encodeURI(href), className: parentClass + "__link", target: "blank", "data-testid": "renderWord-hyperlink", rel: "nofollow noreferrer noopener", key: key }, type === 'email' ? value : _truncate(value.replace(/(http(s?):\/\/)?(www\.)?/, ''), { length: 33 })));
    }
    return word;
};
export var textRenderer = function (text, parentClass, onClickMention, onClickHashtag) {
    if (!text)
        return React.createElement(React.Fragment, null);
    var renderedText = text
        .split(/\r\n|\r|\n/) // first break on line
        .map(function (line, i) {
        return line
            .split(' ') // break for each word
            .map(function (word, j) { return renderWord(word, "item-" + i + "-" + j, parentClass, onClickMention, onClickHashtag); })
            .reduce(function (acc, elem) { return (acc.length ? [acc, ' ', elem] : [elem]); }, []);
    })
        .reduce(function (acc, elem) { return (acc.length ? [acc, '\n', elem] : [elem]); }, []);
    return React.createElement(React.Fragment, null, renderedText);
};
//# sourceMappingURL=textRenderer.js.map