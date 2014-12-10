/*! kist-tintFileinput 0.0.0 - Style file input elements. | Author: Ivan Nikolić <niksy5@gmail.com> (http://ivannikolic.com/), 2014 | License: MIT */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self);var f=n;f=f.jQuery||(f.jQuery={}),f=f.fn||(f.fn={}),f.tintFileinput=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Ctor = require(3);
var meta = require(7);
var isPublicMethod = require(2)(meta.publicMethods);

/**
 * @param  {Object|String} options
 *
 * @return {jQuery}
 */
var plugin = module.exports = function ( options ) {

	options = options || {};

	return this.each(function () {

		var instance = $.data(this, meta.name);

		if ( isPublicMethod(options) && instance ) {
			instance[options]();
		} else if ( typeof(options) === 'object' && !instance ) {
			$.data(this, meta.name, new Ctor(this, options));
		}

	});

};
plugin.defaults = Ctor.prototype.defaults;

},{}],2:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);

/**
 * @param  {Array} methods
 *
 * @return {Function}
 */
module.exports = function ( methods ) {

	/**
	 * @param  {String} name
	 *
	 * @return {Boolean}
	 */
	return function ( name ) {
		return typeof(name) === 'string' && $.inArray(name, methods || []) !== -1;
	};

};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var instance = require(6);
var dom = require(4);
var events = require(5);
var meta = require(7);

/**
 * @class
 *
 * @param {Element} element
 * @param {Object} options
 */
var TintFileinput = module.exports = function ( element, options ) {

	this.element = element;
	this.options = $.extend(true, {}, this.defaults, options);

	instance.setup.call(this);
	dom.setup.call(this);
	events.setup.call(this);

	if ( this.$el.prop('disabled') ) {
		this.$el.trigger('disable' + this.ens);
	}

};

$.extend(TintFileinput.prototype, {

	/**
	 * @param  {Boolean} state
	 * @param  {Object} e
	 */
	toggleDisabledState: function ( state, e ) {
		this.$el.prop('disabled', state);
	},

	handleFocus: function () {

		this.$el.data(meta.ns.dataAttr + '-val', this.$el.val());

	},

	handleCheckChange: function () {

		if ( this.$el.val() && this.$el.val() !== this.$el.data(meta.ns.dataAttr + '-val') ) {
			this.$el.trigger('change' + this.ens);
		}

	},

	handleChange: function () {

		var fileName = this.$el.val().split(/\\/).pop();

		this.$val
			.text(fileName);

		this.$button
			.text(this.options.labels.buttonChange);

	},

	/**
	 * For IE and Opera, make sure change fires after choosing a file, using an async callback
	 */
	handleClick: function () {

		this.$el.data(meta.ns.dataAttr + '-val', this.$el.val());

		setTimeout($.proxy(this.handleCheckChange, this), 100);

	},

	/**
	 * @param  {Object} e
	 */
	positionInput: function ( e ) {

		this.$el.css({
			left: (e.pageX - this.$wrapper.offset().left) - this.$el.outerWidth() + 20,
			top: (e.pageY - this.$wrapper.offset().top) - 10
		});

	},

	destroy: function () {
		dom.destroy.call(this);
		events.destroy.call(this);
		instance.destroy.call(this);
	},

	defaults: {
		labels: {
			buttonBrowse: 'Browse',
			buttonChange: 'Change',
			val: 'No file selected'
		},
		classes: {
			wrapper: meta.ns.htmlClass,
			input: meta.ns.htmlClass + '-input',
			button: meta.ns.htmlClass + '-button',
			text: meta.ns.htmlClass + '-text'
		}
	}

});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var meta = require(7);

module.exports = {
	setup: function () {

		this.$el = $(this.element);

		this.$el
			.addClass(this.options.classes.input);

		this.$wrapper = $('<div />', {
			'class': this.options.classes.wrapper
		});

		this.$button = $('<span />', {
			'class': this.options.classes.button,
			'aria-hidden': true
		}).text(this.options.labels.buttonBrowse);

		this.$val = $('<span />', {
			'class': this.options.classes.text,
			'aria-hidden': true
		}).text(this.options.labels.val);

		this.$wrapper
			.insertBefore(this.$el)
			.append(this.$el, this.$button, this.$val);

	},
	destroy: function () {

		this.$el
			.removeClass(this.options.classes.input)
			.removeData(meta.ns.dataAttr + '-val')
			.insertBefore(this.$wrapper);

		this.$wrapper
			.remove();

	}
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);

module.exports = {
	setup: function () {

		this.$el
			.on('focus' + this.ens, $.proxy(this.handleFocus, this))
			.on('blur' + this.ens, $.proxy(this.handleCheckChange, this))
			.on('checkChange' + this.ens, $.proxy(this.handleCheckChange, this))
			.on('disable' + this.ens, $.proxy(this.toggleDisabledState, this, true))
			.on('enable' + this.ens, $.proxy(this.toggleDisabledState, this, false))
			.on('change' + this.ens, $.proxy(this.handleChange, this))
			.on('click' + this.ens, $.proxy(this.handleClick, this));

		this.$wrapper
			.on('mousemove' + this.ens, $.proxy(this.positionInput, this));

	},
	destroy: function () {

		this.$el.off(this.ens);
		this.$wrapper.off(this.ens);

	}
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
var meta = require(7);
var instance = 0;

module.exports = {
	setup: function () {
		this.uid = instance++;
		this.ens = meta.ns.event + '.' + this.uid;
	},
	destroy: function () {
		$.removeData(this.element, meta.name);
	}
};

},{}],7:[function(require,module,exports){
module.exports = {
	name: 'tintFileinput',
	ns: {
		htmlClass: 'kist-TintFileinput',
		event: '.kist.tintFileinput',
		dataAttr: 'kist-tintfileinput'
	},
	publicMethods: ['destroy']
};

},{}]},{},[1])(1)
});