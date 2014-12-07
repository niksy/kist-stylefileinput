var $ = require('jquery');
var meta = require('./meta');

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
