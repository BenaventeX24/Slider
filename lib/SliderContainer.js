"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var css_1 = require("@emotion/css");
var SliderContainer = function (_a) {
    var id = _a.id, children = _a.children, outerContainerStyles = _a.outerContainerStyles, setVisibleButtons = _a.setVisibleButtons;
    function isTouchableDevice() {
        return "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", __assign({ id: id, className: "".concat((0, css_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          display: flex;\n        "], ["\n          display: flex;\n        "]))), " ").concat(outerContainerStyles), onMouseOver: function () { return !isTouchableDevice() && setVisibleButtons(true); }, onMouseOut: function () { return !isTouchableDevice() && setVisibleButtons(false); } }, { children: children })) }));
};
exports.default = SliderContainer;
var templateObject_1;
