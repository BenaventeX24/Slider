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
var react_merge_refs_1 = require("react-merge-refs");
var css_1 = require("@emotion/css");
var Sensor = function (_a, ref) {
    var children = _a.children, threshold = _a.threshold, spacing = _a.spacing;
    var targetRef = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(false), isVisible = _b[0], setIsVisible = _b[1];
    (0, react_1.useEffect)(function () {
        var targetNode = targetRef.current;
        var observer = new IntersectionObserver(function (_a) {
            var entry = _a[0];
            setIsVisible(entry.isIntersecting);
        }, {
            root: null,
            rootMargin: "0px",
            threshold: threshold,
        });
        if (targetNode) {
            observer.observe(targetNode);
        }
        return function () {
            if (targetNode) {
                observer.unobserve(targetNode);
            }
        };
    }, [threshold]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: (0, react_merge_refs_1.mergeRefs)([targetRef, ref]), className: (0, css_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        display: inline-block;\n        margin: 0 ", ";\n\n        &:first-child {\n          margin-left: 0;\n        }\n        &:last-child {\n          margin-right: 0;\n        }\n      "], ["\n        display: inline-block;\n        margin: 0 ", ";\n\n        &:first-child {\n          margin-left: 0;\n        }\n        &:last-child {\n          margin-right: 0;\n        }\n      "])), spacing) }, { children: children(isVisible) })));
};
exports.default = (0, react_1.forwardRef)(Sensor);
var templateObject_1;
