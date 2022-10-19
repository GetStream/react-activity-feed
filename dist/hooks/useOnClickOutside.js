import { useEffect } from 'react';
export var useOnClickOutside = function (ref, handler, registerListeners) {
    if (registerListeners === void 0) { registerListeners = true; }
    useEffect(function () {
        if (!registerListeners)
            return;
        var eventListener = function (event) {
            var _a;
            if ((_a = ref.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))
                return;
            handler(event);
        };
        document.addEventListener('mousedown', eventListener);
        document.addEventListener('touchstart', eventListener);
        return function () {
            document.removeEventListener('mousedown', eventListener);
            document.removeEventListener('touchstart', eventListener);
        };
    }, [handler, registerListeners]);
};
//# sourceMappingURL=useOnClickOutside.js.map