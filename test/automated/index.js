'use strict';

const assert = require('assert');
const simulant = require('simulant');
const classList = require('class-list');
const fn = require('../../index');

before(function () {
	const fixture = window.__html__['test/automated/fixtures/index.html'];
	document.body.insertAdjacentHTML('beforeend', `<div id="fixture">${fixture}</div>`);
});

after(function () {
	document.body.removeChild(document.getElementById('fixture'));
});

it('should create instance', function () {

	const element = document.querySelector('.jackie');
	const elementClassList = classList(element);
	const instance = fn(element);

	assert.ok(elementClassList.contains('kist-Stylefileinput-input'));

	instance.destroy();

});

it('should destroy instance', function () {

	const element = document.querySelector('.jackie');
	const elementClassList = classList(element);
	const instance = fn(element);

	instance.destroy();

	assert.ok(!elementClassList.contains('kist-Stylefileinput-input'));

});

it('should reposition input element on mouse move', function () {

	const element = document.querySelector('.jackie');
	const instance = fn(element);
	const elementWrapper = element.parentNode;

	simulant.fire(elementWrapper, 'mousemove');

	assert.ok(parseInt(element.style.left, 10) !== 0);
	assert.ok(parseInt(element.style.top, 10) !== 0);

	instance.destroy();

});
