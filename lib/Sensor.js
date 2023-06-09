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
var react_1 = require("react");
var css_1 = require("@emotion/css");
var react_intersection_observer_1 = require("react-intersection-observer");
var Sensor = function (_a, ref) {
    var children = _a.children, spacing = _a.spacing;
    var _b = (0, react_intersection_observer_1.useInView)(), inViewRef = _b[0], inView = _b[1];
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: ref, className: (0, css_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        display: inline-block;\n        margin: 0 ", ";\n\n        &:first-child {\n          margin-left: 0;\n        }\n        &:last-child {\n          margin-right: 0;\n        }\n      "], ["\n        display: inline-block;\n        margin: 0 ", ";\n\n        &:first-child {\n          margin-left: 0;\n        }\n        &:last-child {\n          margin-right: 0;\n        }\n      "])), spacing) }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ ref: inViewRef }, { children: children(inView) })) })));
};
exports.default = (0, react_1.forwardRef)(Sensor);
var templateObject_1;
