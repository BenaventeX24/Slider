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
var UserCustomButton = function (_a) {
    var disabled = _a.disabled, visible = _a.visible, locked = _a.locked, onClick = _a.onClick, children = _a.children, direction = _a.direction, disappearingButtons = _a.disappearingButtons;
    return ((0, jsx_runtime_1.jsx)("div", __assign({ onClick: function () { return onClick(); }, className: (0, css_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        position: relative;\n        background-color: transparent;\n        border: 0;\n        padding: 0;\n        z-index: 10;\n\n        & button {\n          transition: visibility 0.5s, opacity 0.5s;\n\n          ", "\n        }\n      "], ["\n        position: relative;\n        background-color: transparent;\n        border: 0;\n        padding: 0;\n        z-index: 10;\n\n        & button {\n          transition: visibility 0.5s, opacity 0.5s;\n\n          ", "\n        }\n      "])), disappearingButtons &&
            "\n          visibility: ".concat(!locked.includes(direction) && visible ? "visible" : "hidden", ";\n          opacity: ").concat(!locked.includes(direction) && visible ? "1" : "0", ";\n          pointer-events: ").concat(!locked.includes(direction) && visible && !disabled
                ? "auto"
                : "none", ";\n            ")) }, { children: children })));
};
exports.default = UserCustomButton;
var templateObject_1;
