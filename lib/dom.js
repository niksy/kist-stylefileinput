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
