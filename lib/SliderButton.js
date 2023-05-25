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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var css_1 = require("@emotion/css");
var utils_1 = require("./utils");
var BsChevronLeft_svg_1 = __importDefault(require("./ChevronIcons/BsChevronLeft.svg"));
var BsChevronLeft_svg_2 = __importDefault(require("./ChevronIcons/BsChevronLeft.svg"));
var LeftButton = function (_a) {
    var _b;
    var disabled = _a.disabled, visible = _a.visible, locked = _a.locked, onClick = _a.onClick, direction = _a.direction, disappearingButtons = _a.disappearingButtons, styles = _a.styles;
    var ref = (0, react_1.useRef)(null);
    var innerWidth = (_b = ref.current) === null || _b === void 0 ? void 0 : _b.offsetWidth;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () { return onClick(); }, disabled: disabled, ref: ref, className: (0, css_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          display: flex;\n          align-items: center;\n          padding-right: ", ";\n          margin-right: ", ";\n          padding-left: ", ";\n          margin-left: ", ";\n          align-self: center;\n          font-size: 40px;\n          width: 45px;\n          height: 45px;\n          border-radius: 50%;\n          cursor: pointer;\n\n          z-index: 10;\n\n          background-color: #fff;\n          border: 1px solid gray;\n          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);\n\n          transition: visibility 0.5s, opacity 0.5s;\n\n          ", "\n          ", "\n        "], ["\n          display: flex;\n          align-items: center;\n          padding-right: ", ";\n          margin-right: ", ";\n          padding-left: ", ";\n          margin-left: ", ";\n          align-self: center;\n          font-size: 40px;\n          width: 45px;\n          height: 45px;\n          border-radius: 50%;\n          cursor: pointer;\n\n          z-index: 10;\n\n          background-color: #fff;\n          border: 1px solid gray;\n          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);\n\n          transition: visibility 0.5s, opacity 0.5s;\n\n          ", "\n          ", "\n        "])), direction.includes(utils_1.slideDirections.LEFT) && "8px", direction.includes(utils_1.slideDirections.LEFT) &&
                innerWidth &&
                -Math.abs(innerWidth / 2) + "px", direction.includes(utils_1.slideDirections.RIGHT) && "8px", direction.includes(utils_1.slideDirections.RIGHT) &&
                innerWidth &&
                -Math.abs(innerWidth / 2) + "px", disappearingButtons &&
                "\n          visibility: ".concat(!locked.includes(direction) && visible ? "visible" : "hidden", ";\n          opacity: ").concat(!locked.includes(direction) && visible ? "1" : "0", ";\n          pointer-events: ").concat(!locked.includes(direction) && visible ? "auto" : "none", ";\n            "), styles) }, { children: (0, jsx_runtime_1.jsx)("img", { src: direction.includes(utils_1.slideDirections.LEFT)
                    ? BsChevronLeft_svg_1.default
                    : BsChevronLeft_svg_2.default }) })) }));
};
exports.default = LeftButton;
var templateObject_1;
