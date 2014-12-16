# kist-stylefileinput

Style file input elements. Heavily based on [Filament Group’s jQuery Custom File Input](https://github.com/filamentgroup/jQuery-Custom-File-Input).

## Installation

```sh
npm install kist-stylefileinput --save

bower install kist-stylefileinput --save
```

Basic styling for file input is provided with CSS.

## API

### `.stylefileinput(options)`

#### options

Type: `Object|String`

##### Options defined as `Object`

###### labels

Type: `Object`

Labels for elements.

Default value:

```js
{
	buttonBrowse: 'Browse',
	buttonChange: 'Change',
	val: 'No file selected'
}
```

###### classes

Type: `Object`

Classes for elements.

Default value:

```js
{
	wrapper: 'kist-Stylefileinput',
	input: 'kist-Stylefileinput-input',
	button: 'kist-Stylefileinput-button',
	text: 'kist-Stylefileinput-text'
}
```

##### Options defined as `String`

###### destroy

Destroy plugin instance.

## Examples

```html
<input type="file" />
```

```js
$('input').stylefileinput();
```

## Browser support

Tested in IE8+ and all modern browsers.

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)  
MIT © [Filament Group](http://www.filamentgroup.com/)
