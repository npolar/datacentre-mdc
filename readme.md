# @npolar/mdc – material design components

@npolar/mdc is a collection ECMAScript2019 custom elements, built with [LitElement](https://lit-element.polymer-project.org/) and [lit-html](https://lit-html.polymer-project.org/) on top of:

- [Material Components for the web](https://github.com/material-components/material-components-web)
- [Material Web Components](https://github.com/material-components/material-components-web-components)

## Develop

```
$ git clone git@github.com:npolar/mdc.git && cd mdc
$ yarn
$ yarn dev
```

Live-server: http://localhost:7777

## Quality assurrance

ES2019-compliance is enforced using [ESLint](https://eslint.org/). See [.eslintrc](.eslintrc.json)

[![Build Status](https://travis-ci.com/npolar/mdc.svg?branch=master)](https://travis-ci.com/npolar/mdc)

```
yarn eslint
```

## Build

```
yarn build
```

## Install

```sh
$ cd ~/my-project
$ yarn add https://github.com/npolar/mdc
$ cd node_modules/@npolar/mdc && yarn && cd -
```

## Use

### Colors

```html
<style>
  :root {
    --mdc-theme-primary: #000;
    --mdc-theme-secondary: rgb(18, 79, 120);
    --mdc-theme-on-primary: #fff;
    --mdc-theme-on-secondary: #66bb6a;
    --mdc-theme-error: #b00020;
  }
</style>
```

See [mdc-theme](https://github.com/material-components/material-components-web/tree/master/packages/mdc-theme) documentation for further customisations.

### Fonts

Having 0 run-time dependencies means: bring ~~your own~~`@npolar/mdc`'s fonts.

Two fonts are included in the `asset/font` folder:

- [Inter](https://rsms.me/inter/)
- [Material Icons](https://material.io/resources/icons/?style=baseline)

To self-host these fonts, first copy the css files and the font definitions into your project's build / web root (here `dist` in `~/my-project`):

```bash
$ cd ~/my-project
$ mkdir -p dist/@npolar/mdc
$ cp -r node_modules/@npolar/mdc/asset/* dist/@npolar/mdc/
```

Then, add links to the font stylesheets in your `<head>` element:

```html
<link rel="stylesheet" href="/@npolar/mdc/css/style/material-icons.css" />
<link rel="stylesheet" href="/@npolar/mdc/css/style/typography.css" />
```
