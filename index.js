'use strict';

const extend = require('xtend/mutable');
const classList = require('class-list');
const classListMultipleValues = require('classlist-multiple-values');

/**
 * @param {Element} element
 * @param {Object} options
 */
function Stylefileinput ( element, options ) {

	this.element = element;
	this.options = extend({}, this.options, options);

	this.prepareClassList();

	this.setupDom();
	this.setupEvents();

}
extend(Stylefileinput.prototype, {

	options: {
		browseButtonLabel: 'Browse',
		changeButtonLabel: 'Change',
		noFileSelectedText: 'No file selected',
		wrapperClass: 'kist-Stylefileinput',
		inputClass: 'kist-Stylefileinput-input',
		buttonClass: 'kist-Stylefileinput-button',
		textClass: 'kist-Stylefileinput-text'
	},

	prepareClassList: function () {

		const cl = classList(this.element);
		const clmv = classListMultipleValues(cl);

		this.classList = {
			add: clmv.add,
			remove: clmv.remove
		};

	},

	setupDom: function () {

		this.classList.add(this.options.inputClass);

		this.wrapperElement = document.createElement('div');
		this.wrapperClassList = classListMultipleValues(classList(this.wrapperElement));
		this.wrapperClassList.add(this.options.wrapperClass);

		this.buttonElement = document.createElement('span');
		this.buttonClassList = classListMultipleValues(classList(this.buttonElement));
		this.buttonClassList.add(this.options.buttonClass);
		this.buttonElement.setAttribute('aria-hidden', true);
		this.buttonElement.textContent = this.options.browseButtonLabel;

		this.fileNameElement = document.createElement('span');
		this.fileNameClassList = classListMultipleValues(classList(this.fileNameElement));
		this.fileNameClassList.add(this.options.textClass);
		this.fileNameElement.setAttribute('aria-hidden', true);
		this.fileNameElement.textContent = this.options.noFileSelectedText;

		this.element.parentNode.insertBefore(this.wrapperElement, this.element);
		this.wrapperElement.appendChild(this.element);
		this.wrapperElement.appendChild(this.buttonElement);
		this.wrapperElement.appendChild(this.fileNameElement);

	},

	destroyDom: function () {

		this.classList.remove(this.options.inputClass);
		this.wrapperElement.parentNode.appendChild(this.element);
		this.wrapperElement.parentNode.removeChild(this.wrapperElement);

	},

	setupEvents: function () {

		this.eventListeners = {
			focus: this.handleFocus.bind(this),
			blur: this.handleCheckChange.bind(this),
			change: this.handleChange.bind(this),
			click: this.handleClick.bind(this)
		};

		this.wrapperEventListeners = {
			mousemove: this.positionInput.bind(this)
		};

		Object.keys(this.eventListeners)
			.forEach(( ev ) => {
				this.element.addEventListener(ev, this.eventListeners[ev], false);
			});

		Object.keys(this.wrapperEventListeners)
			.forEach(( ev ) => {
				this.wrapperElement.addEventListener(ev, this.wrapperEventListeners[ev], false);
			});

	},

	destroyEvents: function () {

		Object.keys(this.eventListeners)
			.forEach(( ev ) => {
				this.element.removeEventListener(ev, this.eventListeners[ev], false);
			});

		Object.keys(this.wrapperEventListeners)
			.forEach(( ev ) => {
				this.wrapperElement.removeEventListener(ev, this.wrapperEventListeners[ev], false);
			});

	},

	destroy: function () {
		this.destroyDom();
		this.destroyEvents();
	},

	/* istanbul ignore next:
	integration test */ handleFocus: function () {

		this.currentValue = this.element.value;

	},

	/* istanbul ignore next:
	integration test */ handleCheckChange: function () {

		if (
			this.element.value &&
			this.element.value !== this.currentValue
		) {
			this.handleChange();
		}

	},

	/* istanbul ignore next:
	integration test */ handleChange: function () {

		let fileName = this.element.value.split('\\').pop();
		let buttonLabel = this.options.changeButtonLabel;

		if ( !fileName ) {
			fileName = this.options.noFileSelectedText;
			buttonLabel = this.options.browseButtonLabel;
		}

		this.fileNameElement.textContent = fileName;
		this.buttonElement.textContent = buttonLabel;

	},

	/* istanbul ignore next:
	integration test */ handleClick: function () {

		this.currentValue = this.element.value;

		// For IE and Opera, make sure change fires after choosing a file, using an async callback
		setTimeout(() => {
			this.handleCheckChange();
		}, 100);

	},

	/**
	 * @param  {Event} e
	 */
	positionInput: function ( e ) {

		const wrapperElementRect = this.wrapperElement.getBoundingClientRect();
		const offsetTop = wrapperElementRect.top + document.body.scrollTop;
		const offsetLeft = wrapperElementRect.left + document.body.scrollLeft;

		this.element.style.left = `${(e.pageX - offsetLeft) - this.element.offsetWidth + 20}px`;
		this.element.style.top = `${(e.pageY - offsetTop) - 10}px`;

	}

});

module.exports = ( element, options ) => {
	const instance = new Stylefileinput(element, options);
	return {
		destroy: () => {
			instance.destroy();
		}
	};
};

module.exports.defaultOptions = Stylefileinput.prototype.options;
