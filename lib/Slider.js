"use strict";
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
var Sensor_1 = __importDefault(require("./Sensor"));
var scroll_into_view_1 = __importDefault(require("scroll-into-view"));
var SliderContainer_1 = __importDefault(require("./SliderContainer"));
var ItemsContainer_1 = __importDefault(require("./ItemsContainer"));
var utils_1 = require("./utils");
var SliderButton_1 = __importDefault(require("./SliderButton"));
var UserCustomButton_1 = __importDefault(require("./UserCustomButton"));
var Slider = function (_a) {
    var children = _a.children, spacing = _a.spacing, buttonLeft = _a.buttonLeft, buttonRight = _a.buttonRight, threshold = _a.threshold, time = _a.time, width = _a.width, outterContainerStyles = _a.outterContainerStyles, innerContainerStyles = _a.innerContainerStyles, buttonLeftStyles = _a.buttonLeftStyles, buttonRightStyles = _a.buttonRightStyles, _b = _a.disableScrollbar, disableScrollbar = _b === void 0 ? false : _b, _c = _a.showButtons, showButtons = _c === void 0 ? true : _c, _d = _a.disappearingButtons, disappearingButtons = _d === void 0 ? true : _d;
    var itemsRef = (0, react_1.useRef)([]);
    //const items = useMemo(() => Children.toArray(children), [children]);
    var _e = (0, react_1.useState)({
        to: 0,
        direction: utils_1.slideDirections.LEFT,
    }), scrollTo = _e[0], setScrollTo = _e[1];
    var _f = (0, react_1.useState)(true), disableButtons = _f[0], setDisableButtons = _f[1];
    var _g = (0, react_1.useState)(utils_1.slideDirections.BOTH), lockSlide = _g[0], setLockSlide = _g[1];
    var _h = (0, react_1.useState)(false), visibleButtons = _h[0], setVisibleButtons = _h[1];
    var evaluteButtonsLock = function () {
        setTimeout(function () {
            var _a, _b, _c, _d;
            setLockSlide(utils_1.slideDirections.NONE);
            if (((_a = itemsRef.current[0]) === null || _a === void 0 ? void 0 : _a.isVisible) === true) {
                setLockSlide(utils_1.slideDirections.LEFT);
            }
            if (((_b = itemsRef.current[itemsRef.current.length - 1]) === null || _b === void 0 ? void 0 : _b.isVisible) === true)
                setLockSlide(utils_1.slideDirections.RIGHT);
            if (((_c = itemsRef.current[0]) === null || _c === void 0 ? void 0 : _c.isVisible) === true &&
                ((_d = itemsRef.current[itemsRef.current.length - 1]) === null || _d === void 0 ? void 0 : _d.isVisible) === true)
                setLockSlide(utils_1.slideDirections.BOTH);
        }, 0);
    };
    (0, react_1.useEffect)(function () {
        setDisableButtons(true);
        //const align = scrollTo.direction === slideDirections.RIGHT ? 0.001 : 1;
        (0, scroll_into_view_1.default)(itemsRef.current[scrollTo.to], {
            time: time ? time : 350,
            align: { left: 0.001, lockY: true },
            cancellable: false,
        }, function (_completed) {
            setDisableButtons(false);
            evaluteButtonsLock();
        });
    }, [scrollTo, time]);
    (0, react_1.useEffect)(function () {
        window.addEventListener("resize", evaluteButtonsLock);
        return function () {
            window.removeEventListener("resize", evaluteButtonsLock);
        };
    }, []);
    var slideRight = function () {
        setLockSlide(utils_1.slideDirections.NONE);
        var scrollToRight = 0;
        var visibleItems = 0;
        itemsRef.current.forEach(function (item, index) {
            var _a, _b;
            if (item.isVisible)
                visibleItems++;
            if (item.isVisible &&
                (((_a = itemsRef.current[index + 1]) === null || _a === void 0 ? void 0 : _a.isVisible) === false ||
                    ((_b = itemsRef.current[index + 1]) === null || _b === void 0 ? void 0 : _b.isVisible) === undefined))
                scrollToRight = index + 1;
        });
        if (scrollToRight + visibleItems >= itemsRef.current.length)
            setLockSlide(utils_1.slideDirections.RIGHT);
        setScrollTo({ to: scrollToRight, direction: utils_1.slideDirections.RIGHT });
    };
    var slideLeft = function () {
        setLockSlide(utils_1.slideDirections.NONE);
        var firstVisibleItem = 0;
        var scrollToLeft = 0;
        var visibleItems = 0;
        itemsRef.current.forEach(function (item, index) {
            var _a;
            if (item.isVisible)
                visibleItems++;
            if (item.isVisible && ((_a = itemsRef.current[index - 1]) === null || _a === void 0 ? void 0 : _a.isVisible) === false) {
                firstVisibleItem = index;
            }
        });
        scrollToLeft = firstVisibleItem - visibleItems;
        if (scrollToLeft <= 0) {
            setLockSlide(utils_1.slideDirections.LEFT);
            scrollToLeft = 0;
        }
        setScrollTo({
            to: scrollToLeft,
            direction: utils_1.slideDirections.LEFT,
        });
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(SliderContainer_1.default, __assign({ setVisibleButtons: setVisibleButtons, outterContainerStyles: outterContainerStyles }, { children: [buttonLeft && showButtons ? ((0, jsx_runtime_1.jsx)(UserCustomButton_1.default, __assign({ disappearingButtons: disappearingButtons, disabled: disableButtons, visible: visibleButtons, locked: lockSlide, onClick: slideLeft, direction: utils_1.slideDirections.LEFT }, { children: buttonLeft }))) : ((0, jsx_runtime_1.jsx)(SliderButton_1.default, { disappearingButtons: disappearingButtons, disabled: disableButtons, visible: visibleButtons, locked: lockSlide, onClick: slideLeft, styles: buttonLeftStyles, direction: utils_1.slideDirections.LEFT })), (0, jsx_runtime_1.jsx)(ItemsContainer_1.default, __assign({ width: width, disableScrollbar: disableScrollbar, innerContainerStyles: innerContainerStyles }, { children: react_1.Children.toArray(children).map(function (item, index) { return ((0, jsx_runtime_1.jsx)(Sensor_1.default, __assign({ spacing: spacing, threshold: threshold ? threshold : 1, ref: function (element) {
                            itemsRef.current[index] = element;
                        } }, { children: function (isVisible) {
                            if (itemsRef.current[index]) {
                                itemsRef.current[index].isVisible = isVisible;
                                evaluteButtonsLock();
                            }
                            return item;
                        } }), index)); }) })), buttonLeft && showButtons ? ((0, jsx_runtime_1.jsx)(UserCustomButton_1.default, __assign({ disappearingButtons: disappearingButtons, disabled: disableButtons, visible: visibleButtons, locked: lockSlide, onClick: slideRight, direction: utils_1.slideDirections.RIGHT }, { children: buttonRight }))) : ((0, jsx_runtime_1.jsx)(SliderButton_1.default, { disappearingButtons: disappearingButtons, disabled: disableButtons, visible: visibleButtons, locked: lockSlide, onClick: slideRight, styles: buttonRightStyles, direction: utils_1.slideDirections.RIGHT }))] })) }));
};
exports.default = Slider;
