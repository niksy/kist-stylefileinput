/*! kist-stylefileinput 0.1.5 - Style file input elements. | Author: Ivan Nikolić <niksy5@gmail.com> (http://ivannikolic.com/), 2015 | License: MIT */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self);var n=f;n=n.jQuery||(n.jQuery={}),n=n.fn||(n.fn={}),n.stylefileinput=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var instance = require(5);
var dom = require(2);
var events = require(3);
var meta = require(6);

/**
 * @class
 *
 * @param {Element} element
 * @param {Object} options
 */
var Stylefileinput = module.exports = function ( element, options ) {

	this.element = element;
	this.options = $.extend(true, {}, this.defaults, options);

	instance.setup.call(this);
	dom.setup.call(this);
	events.setup.call(this);

	if ( this.$el.prop('disabled') ) {
		this.$el.trigger('disable' + this.ens);
	}

};

$.extend(Stylefileinput.prototype, {

	/**
	 * @param  {Boolean} state
	 * @param  {Object} e
	 */
	toggleDisabledState: function ( state, e ) {
		this.$el.prop('disabled', state);
	},

	handleFocus: function () {

		this.$el.data(meta.ns.dataAttr + '-file-name', this.$el.val());

	},

	handleCheckChange: function () {

		if ( this.$el.val() && this.$el.val() !== this.$el.data(meta.ns.dataAttr + '-file-name') ) {
			this.$el.trigger('change' + this.ens);
		}

	},

	handleChange: function () {

		var fileName = this.$el.val().split(/\\/).pop();
		var buttonLabel = this.options.labels.buttonChange;

		if ( !fileName ) {
			fileName = this.options.labels.fileName;
			buttonLabel = this.options.labels.buttonBrowse;
		}

		this.$fileName
			.text(fileName);

		this.$button
			.text(buttonLabel);

	},

	/**
	 * For IE and Opera, make sure change fires after choosing a file, using an async callback
	 */
	handleClick: function () {

		this.$el.data(meta.ns.dataAttr + '-file-name', this.$el.val());

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
			fileName: 'No file selected'
		},
		classes: {
			wrapper: meta.ns.htmlClass,
			input: meta.ns.htmlClass + '-input',
			button: meta.ns.htmlClass + '-button',
			fileName: meta.ns.htmlClass + '-fileName'
		}
	}

});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var meta = require(6);

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

		this.$fileName = $('<span />', {
			'class': this.options.classes.fileName,
			'aria-hidden': true
		}).text(this.options.labels.fileName);

		this.$wrapper
			.insertBefore(this.$el)
			.append(this.$el, this.$button, this.$fileName);

	},
	destroy: function () {

		this.$el
			.removeClass(this.options.classes.input)
			.removeData(meta.ns.dataAttr + '-file-name')
			.insertBefore(this.$wrapper);

		this.$wrapper
			.remove();

	}
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var Ctor = require(1);
var meta = require(6);
var isPublicMethod = require(9)(meta.publicMethods);
var appendClass = require(7)(Ctor.prototype.defaults.classes);
var appendNamespacedClasses = require(8)(Ctor.prototype.defaults.classes, meta.ns.htmlClass);

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
plugin.appendClass = appendClass;
plugin.appendNamespacedClasses = appendNamespacedClasses;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var meta = require(6);
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
module.exports = {
	name: 'stylefileinput',
	ns: {
		htmlClass: 'kist-Stylefileinput',
		event: '.kist.stylefileinput',
		dataAttr: 'kist-stylefileinput'
	},
	publicMethods: ['destroy']
};

},{}],7:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);

/**
 * @param  {Object} classes
 *
 * @return {Function}
 */
module.exports = function ( classes ) {

	/**
	 * @param  {String} prop
	 * @param  {String} className
	 *
	 * @return {String}
	 */
	return function ( prop, className ) {
		return [classes[prop], className].join(' ');
	};
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);

/**
 * @param  {Object} classes
 * @param  {String} defaultNs
 *
 * @return {Function}
 */
module.exports = function ( classes, defaultNs ) {

	/**
	 * @param  {String} ns
	 *
	 * @return {Object}
	 */
	return function ( ns ) {
		return $.extend.apply(null, $.map(classes, function ( val, key ) {
			var o = {};
			o[key] = $.trim([val, (val.indexOf(defaultNs) !== -1 ? val.replace(defaultNs, ns) : '')].join(' '));
			return o;
		}));
	};
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
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
},{}]},{},[4])(4)
});