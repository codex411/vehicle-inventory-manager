(function (win, doc) {
	'use strict';
	function isTypeOf(obj) {
		return Object.prototype.toString.call(obj);
	}

	//TODO Implementar Factory Pattern
	function DOM(query) {
		this.elements = this.getDOMElements(query);
	}
	DOM.prototype.getDOMElements = function getDOMElements(query) {
		return doc.querySelectorAll(query);
	}
	DOM.prototype.on   = function on(eventType, callback) {
		Array.prototype.forEach.call(this.elements, function(element){
			element.addEventListener(eventType, callback, false);
		});
	}
	DOM.prototype.off  = function off (eventType, callback) {
		Array.prototype.forEach.call(this.elements, function(element){
			element.removeEventListener(eventType, callback);
		});
	}
	DOM.prototype.getElements  = function getElements () {
		return this.elements;
	}
	DOM.prototype.get  = function get (index) {
		return this.getElements()[index];
	}
	DOM.prototype.forEach = function forEach(callback) {
		return Array.prototype.forEach.call(this.elements, callback);
	}
	DOM.prototype.map 	  = function map(callback) {
		return Array.prototype.map.call(this.elements, callback);
	}
	DOM.prototype.some 	  = function some(callback) {
		return Array.prototype.some.call(this.elements, callback);
	}
	DOM.prototype.filter  = function filter(callback) {
		return Array.prototype.filter.call(this.elements, callback);
	}
	DOM.prototype.every   = function every(callback) {
		return Array.prototype.every.call(this.elements, callback);
	}
	DOM.prototype.reduce  = function reduce(callback, initialValue) {
		return Array.prototype.reduce.call(this.elements, callback, initialValue);
	}
	DOM.prototype.reduceRight = function reduceRight(callback, initialValue) {
		return Array.prototype.reduceRight.call(this.elements, callback, initialValue);
	}
	DOM.prototype.isArray     = function isArray(value) {
		return isTypeOf(value) === '[object Array]';
	}
	DOM.prototype.isNumber 	  = function isNumber(value) {
		return isTypeOf(value) === '[object number]';
	}
	DOM.prototype.isFunction  = function isFunction(value) {
		return isTypeOf(value) === '[object Function]';
	}
	DOM.prototype.isBoolean   = function isBolean(value) {
		return isTypeOf(value) === '[object Boolean]';
	}
	DOM.prototype.isObject 	  = function isObject(value) {
		return isTypeOf(value) === '[object Object]';
	}
	DOM.prototype.isNull 	  = function isNull(value) {
		return value === null || value === undefined;
	}
	DOM.prototype.isString 	  = function isString(value) {
		return isTypeOf(value) == '[object String]'
	}

	win.DOM = DOM;
})(window, document);