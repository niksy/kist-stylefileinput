'use strict';

const assert = require('assert');
const path = require('path');

describe('Default', function () {

	it('should handle file input change', function () {

		const fileOne = path.resolve(__dirname, '../manual/fixtures/corgi-01.jpg');
		const fileTwo = path.resolve(__dirname, '../manual/fixtures/corgi-02.jpg');
		const selector = '.Test-run--basicElement input[type="file"]';

		browser.url('/basic');

		assert.equal(browser.getText('.Test-run--basicElement .kist-Stylefileinput-button'), 'Browse');
		assert.equal(browser.getText('.Test-run--basicElement .kist-Stylefileinput-text'), 'No file selected');

		browser.chooseFile(selector, fileOne);

		assert.ok(/corgi-01.jpg/.test(browser.getValue(selector)));
		assert.equal(browser.getText('.Test-run--basicElement .kist-Stylefileinput-button'), 'Change');
		assert.ok(/corgi-01.jpg/.test(browser.getText('.Test-run--basicElement .kist-Stylefileinput-text')));

		browser.clearElement(selector);

		browser.chooseFile(selector, fileTwo);

		assert.ok(/corgi-02.jpg/.test(browser.getValue(selector)));
		assert.ok(/corgi-02.jpg/.test(browser.getText('.Test-run--basicElement .kist-Stylefileinput-text')));

	});

});
