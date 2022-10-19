import React, { createElement } from 'react';
export function smartRender(ElementOrComponentOrLiteral, props, fallback) {
    var RenderComponent = ElementOrComponentOrLiteral === undefined ? fallback : ElementOrComponentOrLiteral;
    if (React.isValidElement(RenderComponent))
        return RenderComponent;
    if (typeof RenderComponent === 'string' ||
        typeof RenderComponent === 'number' ||
        typeof RenderComponent === 'boolean' ||
        RenderComponent == null) {
        return RenderComponent;
    }
    return createElement(RenderComponent, props);
}
//# sourceMappingURL=smartRender.js.map