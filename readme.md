# Terra firma
Todo …


## Installation

Install by using `npm install` command. If there are any errors use `npm audit fix --force`.

Package contains also additional settings like `.vscode` folder where workspace settings for Visual Studio Code are preset.

Developer must use [Beautify plugin](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify) for Visual Studio Code to keep code in order and maintain similar coding style.


## Usage

Currently supports two output formats/modes:

- **development** (build pages and starts browser-sync without image optimization)
- **production** (build pages and minifies image assets)

Each time mode is triggered for the first time folder `dist` folder gets truncated.


## Additional resources
- https://www.npmjs.com/package/handlebars-layouts
- https://github.com/helpers/handlebars-helpers
