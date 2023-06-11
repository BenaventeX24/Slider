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
    var _b = (0, react_intersection_observer_1.useInView)({ threshold: 1 }), upperRef = _b[0], isUpperVisible = _b[1];
    var _c = (0, react_intersection_observer_1.useInView)({ threshold: 1 }), lowerRef = _c[0], isLowerVisible = _c[1];
    var _d = (0, react_intersection_observer_1.useInView)({ threshold: 1 }), middleRef = _d[0], isMiddleVisible = _d[1];
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ ref: ref, className: (0, css_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        display: inline-block;\n        position: relative;\n        margin: 0 ", ";\n\n        &:first-child {\n          margin-left: 0;\n        }\n        &:last-child {\n          margin-right: 0;\n        }\n      "], ["\n        display: inline-block;\n        position: relative;\n        margin: 0 ", ";\n\n        &:first-child {\n          margin-left: 0;\n        }\n        &:last-child {\n          margin-right: 0;\n        }\n      "])), spacing) }, { children: [(0, jsx_runtime_1.jsx)("div", { ref: upperRef, className: (0, css_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n          height: 1px;\n          width: 100%;\n          position: absolute;\n          top: 0;\n        "], ["\n          height: 1px;\n          width: 100%;\n          position: absolute;\n          top: 0;\n        "]))) }), (0, jsx_runtime_1.jsx)("div", { ref: middleRef, className: (0, css_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n          height: 1px;\n          width: 100%;\n          position: absolute;\n          top: 50%;\n          -ms-transform: translateY(-50%);\n          transform: translateY(-50%);\n        "], ["\n          height: 1px;\n          width: 100%;\n          position: absolute;\n          top: 50%;\n          -ms-transform: translateY(-50%);\n          transform: translateY(-50%);\n        "]))) }), (0, jsx_runtime_1.jsx)("div", { ref: lowerRef, className: (0, css_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n          height: 1px;\n          width: 100%;\n          position: absolute;\n          bottom: 0;\n        "], ["\n          height: 1px;\n          width: 100%;\n          position: absolute;\n          bottom: 0;\n        "]))) }), children(isUpperVisible || isMiddleVisible || isLowerVisible)] })));
};
exports.default = (0, react_1.forwardRef)(Sensor);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
