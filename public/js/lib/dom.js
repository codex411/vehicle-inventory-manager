/**
 * DOM Utility Library
 * Lightweight DOM manipulation library similar to jQuery
 */
(function (win, doc) {
	'use strict';
	
	/**
	 * Get object type string
	 * @param {*} obj - Object to check
	 * @returns {string} Type string
	 */
	function isTypeOf(obj) {
		return Object.prototype.toString.call(obj);
	}

	/**
	 * DOM constructor - creates a DOM wrapper object
	 * @param {string} query - CSS selector query
	 */
	function DOM(query) {
		if(!(this instanceof DOM))
			return new DOM(query);
		this.elements = this.getDOMElements(query);
		if (this.elements.length === 1)
			return this.get();
	}
	/**
	 * Get DOM elements matching the query
	 * @param {string} query - CSS selector
	 * @returns {NodeList}
	 */
	DOM.prototype.getDOMElements = function getDOMElements(query) {
		return doc.querySelectorAll(query);
	}
	
	/**
	 * Attach event listener to elements
	 * @param {string} eventType - Event type
	 * @param {Function} callback - Event handler
	 */
	DOM.prototype.on = function on(eventType, callback) {
		Array.prototype.forEach.call(this.elements, function(element){
			element.addEventListener(eventType, callback, false);
		});
	}
	/**
	 * Remove event listener from elements
	 * @param {string} eventType - Event type
	 * @param {Function} callback - Event handler
	 */
	DOM.prototype.off = function off(eventType, callback) {
		Array.prototype.forEach.call(this.elements, function(element){
			element.removeEventListener(eventType, callback);
		});
	}
	DOM.prototype.getElements  = function getElements () {
		return this.elements;
	}
	DOM.prototype.get  	  = function get (index) {
		if (!index)
			return this.elements[0];
		return this.elements[index];
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

	// Static utility methods
	/**
	 * Check if value is an array
	 * @param {*} value - Value to check
	 * @returns {boolean}
	 */
	DOM.isArray = function isArray(value) {
		return isTypeOf(value) === '[object Array]';
	}
	DOM.isNumber   = function isNumber(value) {
		return isTypeOf(value) === '[object number]';
	}
	DOM.isFunction = function isFunction(value) {
		return isTypeOf(value) === '[object Function]';
	}
	DOM.isBoolean  = function isBolean(value) {
		return isTypeOf(value) === '[object Boolean]';
	}
	DOM.isObject   = function isObject(value) {
		return isTypeOf(value) === '[object Object]';
	}
	DOM.isNull 	   = function isNull(value) {
		return value === null || value === undefined;
	}
	DOM.isString   = function isString(value) {
		return isTypeOf(value) == '[object String]'
	}

	win.DOM = DOM;
})(window, document);