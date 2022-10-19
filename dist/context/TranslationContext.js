import { __assign } from "tslib";
import React, { createContext, useContext } from 'react';
import Dayjs from 'dayjs';
export var TranslationContext = createContext({
    t: function (key) { return key; },
    tDateTimeParser: function (input) { return Dayjs(input); },
});
export var TranslationProvider = function (_a) {
    var children = _a.children, value = _a.value;
    return (React.createElement(TranslationContext.Provider, { value: value }, children));
};
export var useTranslationContext = function () { return useContext(TranslationContext); };
export var withTranslationContext = function (Component) {
    var WithTranslationContextComponent = function (props) {
        var translationContext = useTranslationContext();
        return React.createElement(Component, __assign({}, props, translationContext));
    };
    WithTranslationContextComponent.displayName = (Component.displayName || Component.name || 'Component').replace('Base', '');
    return WithTranslationContextComponent;
};
//# sourceMappingURL=TranslationContext.js.map