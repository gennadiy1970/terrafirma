# Terra firma

1. [Terra firma](#terra-firma)
  1. [Installation](#installation)
  2. [Basic usage](#basic-usage)
  3. [Basic folder structure](#basic-folder-structure)
  4. [Configuration](#configuration)
  5. [Templating](#templating)
  6. [Data binding](#data-binding)
  7. [Additional resources](#additional-resources)

## Installation

Install by using `npm install` command. If there are any errors use `npm audit fix --force`.

Package contains also additional settings like `.vscode` folder where workspace settings for Visual Studio Code are preset.

Developer must use [Beautify plugin](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify) for Visual Studio Code to keep code in order and maintain similar coding style.


## Basic usage

Currently supports two output formats/modes:

- **development** (build pages and starts browser-sync without image optimization)
- **production** (build pages and minifies image assets)

Each time mode is triggered for the first time folder `dist` folder gets truncated.

**Development mode**


    npm run development
    # or
    gulp development

**Production mode**
Use this mode when you want to build page for production purposes.


    npm run production
    # or
    gulp production


## Basic folder structure

In order to keep everything nifty there is predefined folder structure that **shouldn’t** be changed. By changing folder structure Gulp will fail.


- dist (used in build mode for development or production)
- source
  - assets (images, fonts)
  - data (used for data binding described bellow)
  - helpers (custom Handlebars helpers that can be defined by user)
  - javascript (all the JavaScript for frontend)
  - layout (Handlebars layouts)
  - partials (Handlebars partials)
  - scss (Sass files - Gulps looks for base.scss as entrypoint)


## Configuration

All configuration is located in file `config.json`.


## Templating

Engine used for templating is [Handlebars.js](https://handlebarsjs.com/) with support for custom helpers and also has some out-of-the-box additional helpers included.

Custom helpers can be defined in `source/helpers` and will show in this list once added.

By default this list is not displayed, but if you enable `debugHandlebars`  in `config.json` this list and some additional info will be displayed when running in development mode.


    index.hbs
      global data:
        articles
      local data:

      decorators:
        inline
      helpers:
        JSONparse           decodeURI           hyphenate           match
        .....
      partials:
        base    header

Helpers included: JSONparse, decodeURI, hyphenate, JSONstringify, default, i18n, _debug, dirname, if, _inspect, divide, ifEven, abs, dotcase, ifNth, absolute, downcase, ifOdd, add, each, inArray, addCommas, eachIndex, inflect, after, ellipsis, info, and, embed, is, append, encodeURI, isArray, arrayify, eq, isEmpty, attr, equalsLength, isFalsey, avg, error, isMatch, basename, escape, isObject, before, extend, isString, block, extname, isTruthy, blockHelperMissing, fileSize, isnt, bold, filter, itemAt, bytes, first, iterate, camelcase, floor, join, capitalize, forEach, js, capitalizeAll, forIn, jsfiddle, ceil, forOwn, last, center, frame, length, chop, get, lengthEqual, compare, getObject, log, contains, gist, lookup, content, gt, lowercase, css, gte, lt, danger, has, lte, dashcase, hasOwn, map, date, helperMissing, markdown, match, removeFirst, toPrecision, md, repeatNTimes, toRegex, merge, replace, trim, minus, replaceFirst, trimLeft, mm, resolve, trimRight, modulo, reverse, truncate, moment, round, truncateWords, multiply, sanitize, typeOf, neither, segments, ul, noop, sentence, unique, not, snakecase, unless, occurrences, some, unlessEq, ok, sort, unlessGt, ol, sortBy, unlessGteq, option, split, unlessLt, or, startsWith, unlessLteq, ordinalize, stem, upcase, parseJSON, stringify, uppercase, pascalcase, stripProtocol, urlParse, pathcase, stripQuerystring, urlResolve, phoneNumber, subtract, url_decode, pick, success, url_encode, pluck, sum, warn, plus, test, warning, plusify, thumbnailImage, with, prepend, times, withAfter, random, titleize, withBefore, raw, toAbbr, withFirst, read, toExponential, withGroup, readdir, toFixed, withHash, relative, toFloat, withLast, remainder, toInt, withSort, remove, toPath, year.

For more info about preloaded helpers consult github page https://github.com/helpers/handlebars-helpers.

You can define new helper by adding file into source/helpers folder and by following this notation.

```js
module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('repeatNTimes', function (n, block) {
    var accum = '';
    for (var i = 0; i < n; ++i) {
      accum += block.fn(i);
    }
    return accum;
  });
};
```


## Data binding

If you add JSON file into source/data this file is automatically included in template. Filename without extension is used for variable name. So in case you have created `articles.json` then `articles` variable is pushed into template. You can check which JSON files are being pushed into template.

Then you can loop through items like you would normally do in Handlebars.

**articles.json**

```json
[{
  "title": "Some title 1",
  "contents": "some content"
  }, {
  "title": "Some title 2",
  "contents": "some content"
}]
```

**test.hbs**

```handlebars
{{#each articles}}
  <div class="card">
    <h3>{{title}}</h3>
    <p>{{contents}}</p>
  </div>
{{/each}}
```

On Mac you can use [Smart JSON Editor](https://itunes.apple.com/us/app/smart-json-editor/id1268962404) to easily edit data files.

## Additional resources
- https://www.npmjs.com/package/handlebars-layouts
