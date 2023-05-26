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
var ItemsContainer = function (_a) {
    var children = _a.children, width = _a.width, disableScrollbar = _a.disableScrollbar, innerContainerStyles = _a.innerContainerStyles;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "".concat((0, css_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          white-space: nowrap;\n          overflow-x: scroll;\n          overflow-y: hidden;\n\n          &::-webkit-scrollbar {\n            width: 6px;\n            height: 6px;\n          }\n          &::-webkit-scrollbar-track {\n            background: rgba(0, 0, 0, 0.1);\n          }\n          &::-webkit-scrollbar-thumb {\n            background: rgba(0, 0, 0, 0.2);\n          }\n          &::-webkit-scrollbar-thumb:hover {\n            background: rgba(0, 0, 0, 0.4);\n          }\n          &::-webkit-scrollbar-thumb:active {\n            background: rgba(124, 124, 124, 0.9);\n          }\n\n          ", "\n\n          ", "\n        "], ["\n          white-space: nowrap;\n          overflow-x: scroll;\n          overflow-y: hidden;\n\n          &::-webkit-scrollbar {\n            width: 6px;\n            height: 6px;\n          }\n          &::-webkit-scrollbar-track {\n            background: rgba(0, 0, 0, 0.1);\n          }\n          &::-webkit-scrollbar-thumb {\n            background: rgba(0, 0, 0, 0.2);\n          }\n          &::-webkit-scrollbar-thumb:hover {\n            background: rgba(0, 0, 0, 0.4);\n          }\n          &::-webkit-scrollbar-thumb:active {\n            background: rgba(124, 124, 124, 0.9);\n          }\n\n          ", "\n\n          ", "\n        "])), width
                ? "".concat(width, "px")
                : "\n              width: 1200px;\n\n              @media (max-width: 1300px) {\n                width: 900px;\n              }\n  \n              @media (max-width: 960px) {\n                width: 600px;\n              }\n\n              @media (max-width: 668px) {\n                width: 400px;\n              }\n\n              @media (max-width: 420px) {\n                width: 300px;\n              }\n\n              @media (max-width: 320px) {\n                width: 260px;\n              }\n\n              ", disableScrollbar &&
                "\n              -ms-overflow-style: none;\n              scrollbar-width: none;\n              \n              &::-webkit-scrollbar {\n                display: none;\n              }\n            "), " ").concat(innerContainerStyles) }, { children: children })) }));
};
exports.default = ItemsContainer;
var templateObject_1;
