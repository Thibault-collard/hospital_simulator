(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("hospitalLib", [], factory);
	else if(typeof exports === 'object')
		exports["hospitalLib"] = factory();
	else
		root["hospitalLib"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./hospital-lib/src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./hospital-lib/src/index.ts":
/*!***********************************!*\
  !*** ./hospital-lib/src/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar quarantine_1 = __webpack_require__(/*! ./quarantine */ \"./hospital-lib/src/quarantine.ts\");\r\nexports.Quarantine = quarantine_1.Quarantine;\r\n\n\n//# sourceURL=webpack://hospitalLib/./hospital-lib/src/index.ts?");

/***/ }),

/***/ "./hospital-lib/src/quarantine.ts":
/*!****************************************!*\
  !*** ./hospital-lib/src/quarantine.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst disease_json_1 = __webpack_require__(/*! ../table/disease.json */ \"./hospital-lib/table/disease.json\");\r\nclass Quarantine {\r\n    constructor(patients) {\r\n        this.list_patients = {};\r\n        disease_json_1.diseases.forEach((disease) => {\r\n            const disease_count = patients.split(',').filter((patient) => patient == disease.ltr);\r\n            this.list_patients[disease.ltr] = disease_count.length;\r\n        });\r\n    }\r\n    setDrugs(drugs) {\r\n        this.drugs = drugs.split(',');\r\n    }\r\n    wait40Days() {\r\n        throw new Error(Quarantine.NOT_IMPLEMENTED_MESSAGE);\r\n    }\r\n}\r\nexports.Quarantine = Quarantine;\r\nQuarantine.NOT_IMPLEMENTED_MESSAGE = 'Work, work.';\r\n\n\n//# sourceURL=webpack://hospitalLib/./hospital-lib/src/quarantine.ts?");

/***/ }),

/***/ "./hospital-lib/table/disease.json":
/*!*****************************************!*\
  !*** ./hospital-lib/table/disease.json ***!
  \*****************************************/
/*! exports provided: diseases, default */
/***/ (function(module) {

eval("module.exports = {\"diseases\":[{\"ltr\":\"F\",\"name\":\"Fever\"},{\"ltr\":\"H\",\"name\":\"Healthy\"},{\"ltr\":\"D\",\"name\":\"Diabetes\"},{\"ltr\":\"T\",\"name\":\"Tuberculosis\"},{\"ltr\":\"X\",\"name\":\"Dead\"}]};\n\n//# sourceURL=webpack://hospitalLib/./hospital-lib/table/disease.json?");

/***/ })

/******/ });
});