# style-file-input

[![Build Status][ci-img]][ci] [![BrowserStack Status][browserstack-img]][browserstack]

Style file input element.

## Install

```sh
npm install style-file-input --save
```

## Usage

**Markup**

```html
<input type="file" />
```

**Style**

```css
@import url('style-file-input');
```

If you use [PostCSS](https://github.com/postcss/postcss) and [postcss-import](https://github.com/postcss/postcss-import) plugin, it will automatically use provided [default styling](https://github.com/niksy/style-file-input/blob/master/index.css).

**Client-side functionality**

```js
const stylefileinput = require('style-file-input');
const element = document.querySelector('input[type="file"]');
const instance = stylefileinput(element);
```

## API

### stylefileinput(element[, options])

Returns: `Object`

#### element

Type: `Element`

Element on which to apply changes.

#### options

Type: `Object`

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `browseButtonLabel` | `String` | `'Browse'` | Button label for browse action. |
| `changeButtonLabel` | `String` | `'Change'` | Button label for change action. |
| `noFileSelectedText` | `String` | `'No file selected'` | Default input value placeholder. |
| `wrapperClass` | `String` | `'kist-Stylefileinput'` | Wrapper class. |
| `inputClass` | `String` | `'kist-Stylefileinput-input'` | Input class. |
| `buttonClass` | `String` | `'kist-Stylefileinput-button'` | Browse/change button class. |
| `textClass` | `String` | `'kist-Stylefileinput-text'` | Input value placeholder class. |

### instance.destroy()

Destroy instance.

## Test

For local automated tests, run `npm run test:automated:local`.

For local integration tests, run `npm run test:integration:local`.

For manual tests, run `npm run test:manual:local` and open <http://localhost:9000/> in your browser.

## Browser support

Tested in IE9+ and all modern browsers.

## Caveats

* Opera Mini doesn’t fire `change` event when input value is changed so it won’re replace default text.

## Acknowledgments

* Based on [Filament Group’s jQuery Custom File Input](https://github.com/filamentgroup/jQuery-Custom-File-Input).

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)  
MIT © [Filament Group](http://www.filamentgroup.com/)

[ci]: https://travis-ci.org/niksy/style-file-input
[ci-img]: https://travis-ci.org/niksy/style-file-input.svg?branch=master
[browserstack]: https://www.browserstack.com/
[browserstack-img]: https://www.browserstack.com/automate/badge.svg?badge_key=OGNwUys4NUZVNVJleUpHTDNORGVxamhuZitSVk9zbEVJa2pCajFnS2FVOD0tLXdxTW16Nm1WTGphS1dLQXE1aW1EUmc9PQ==--0088ec8799d554c805b2d93c5aa56cc24d2d592d
