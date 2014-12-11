var $ = require('jquery');
var instance = require('./instance');
var dom = require('./dom');
var events = require('./events');
var meta = require('./meta');

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

		this.$el.data(meta.ns.dataAttr + '-val', this.$el.val());

	},

	handleCheckChange: function () {

		if ( this.$el.val() && this.$el.val() !== this.$el.data(meta.ns.dataAttr + '-val') ) {
			this.$el.trigger('change' + this.ens);
		}

	},

	handleChange: function () {

		var fileName = this.$el.val().split(/\\/).pop();
		var inputFieldText = fileName;
		var buttonLabel = this.options.labels.buttonChange;

		if ( !fileName ) {
			inputFieldText = this.options.labels.val;
			buttonLabel = this.options.labels.buttonBrowse;
		}

		this.$val
			.text(inputFieldText);

		this.$button
			.text(buttonLabel);

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
