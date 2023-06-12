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
    var children = _a.children, spacing = _a.spacing, _b = _a.threshold, threshold = _b === void 0 ? 0.5 : _b;
    var sensorWidth = threshold && threshold * 100;
    var _c = (0, react_intersection_observer_1.useInView)({
        threshold: threshold,
    }), upperLeftRef = _c[0], isUpperLeftVisible = _c[1];
    var _d = (0, react_intersection_observer_1.useInView)({
        threshold: threshold,
    }), lowerLeftRef = _d[0], isLowerLeftVisible = _d[1];
    var _e = (0, react_intersection_observer_1.useInView)({
        threshold: threshold,
    }), middleLeftRef = _e[0], isMiddleLeftVisible = _e[1];
    var _f = (0, react_intersection_observer_1.useInView)({
        threshold: threshold,
    }), upperRightRef = _f[0], isUpperRightVisible = _f[1];
    var _g = (0, react_intersection_observer_1.useInView)({
        threshold: threshold,
    }), lowerRightRef = _g[0], isLowerRightVisible = _g[1];
    var _h = (0, react_intersection_observer_1.useInView)({
        threshold: threshold,
    }), middleRightRef = _h[0], isMiddleRightVisible = _h[1];
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ ref: ref, className: (0, css_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        display: inline-block;\n        position: relative;\n        margin: 0 ", ";\n\n        &:first-child {\n          margin-left: 0;\n        }\n        &:last-child {\n          margin-right: 0;\n        }\n      "], ["\n        display: inline-block;\n        position: relative;\n        margin: 0 ", ";\n\n        &:first-child {\n          margin-left: 0;\n        }\n        &:last-child {\n          margin-right: 0;\n        }\n      "])), spacing) }, { children: [(0, jsx_runtime_1.jsx)("div", { ref: upperLeftRef, className: (0, css_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n          height: 1px;\n          width: ", "%;\n          position: absolute;\n          top: 0;\n          left: 0;\n        "], ["\n          height: 1px;\n          width: ", "%;\n          position: absolute;\n          top: 0;\n          left: 0;\n        "])), sensorWidth ? sensorWidth : 100) }), (0, jsx_runtime_1.jsx)("div", { ref: middleLeftRef, className: (0, css_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n          height: 1px;\n          width: ", "%;\n          position: absolute;\n          top: 50%;\n          -ms-transform: translateY(-50%);\n          transform: translateY(-50%);\n          left: 0;\n        "], ["\n          height: 1px;\n          width: ", "%;\n          position: absolute;\n          top: 50%;\n          -ms-transform: translateY(-50%);\n          transform: translateY(-50%);\n          left: 0;\n        "])), sensorWidth ? sensorWidth : 100) }), (0, jsx_runtime_1.jsx)("div", { ref: lowerLeftRef, className: (0, css_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n          height: 1px;\n          width: ", "%;\n          position: absolute;\n          bottom: 0;\n          left: 0;\n        "], ["\n          height: 1px;\n          width: ", "%;\n          position: absolute;\n          bottom: 0;\n          left: 0;\n        "])), sensorWidth ? sensorWidth : 100) }), (0, jsx_runtime_1.jsx)("div", { ref: upperRightRef, className: (0, css_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n          height: 1px;\n          width: ", "%;\n          position: absolute;\n          top: 0;\n          right: 0;\n        "], ["\n          height: 1px;\n          width: ", "%;\n          position: absolute;\n          top: 0;\n          right: 0;\n        "])), sensorWidth ? sensorWidth : 100) }), (0, jsx_runtime_1.jsx)("div", { ref: middleRightRef, className: (0, css_1.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n          height: 1px;\n          width: ", "%;\n          position: absolute;\n          top: 50%;\n          -ms-transform: translateY(-50%);\n          transform: translateY(-50%);\n          right: 0;\n        "], ["\n          height: 1px;\n          width: ", "%;\n          position: absolute;\n          top: 50%;\n          -ms-transform: translateY(-50%);\n          transform: translateY(-50%);\n          right: 0;\n        "])), sensorWidth ? sensorWidth : 100) }), (0, jsx_runtime_1.jsx)("div", { ref: lowerRightRef, className: (0, css_1.css)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n          height: 1px;\n          width: ", "%;\n          position: absolute;\n          bottom: 0;\n          right: 0;\n        "], ["\n          height: 1px;\n          width: ", "%;\n          position: absolute;\n          bottom: 0;\n          right: 0;\n        "])), sensorWidth ? sensorWidth : 100) }), children(isUpperLeftVisible ||
                isLowerLeftVisible ||
                isMiddleLeftVisible ||
                isUpperRightVisible ||
                isLowerRightVisible ||
                isMiddleRightVisible)] })));
};
exports.default = (0, react_1.forwardRef)(Sensor);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
