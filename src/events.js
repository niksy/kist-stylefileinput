var $ = require('jquery');

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
