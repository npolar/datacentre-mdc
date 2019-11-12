# @npolar/mdc – material design components

ECMAScript2019 web components: [demo](https://mdc.npolar.now.sh)

Built with [LitElement](https://lit-element.polymer-project.org/) and [lit-html](https://lit-html.polymer-project.org/) on top of:

- [Material Web Components](https://github.com/material-components/material-components-web-components)
- [Material Components for the web](https://github.com/material-components/material-components-web)

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

The building [rolls up](https://rollupjs.org/guide/en/) each component into a standalone ES2019 module.

```
$ yarn build
```

**Bare specifiers**

**Styles**

- Compile SCSS to `lit-html` css templates, using node-sass
  Bare specifiers a

External dependencies, that are imported with `bare specifiers` are

with 0 dependencies.
This process also eliminatesThis process also elExternaBuild all components into standalone modules in `dist/@npolar/mdc` using:

- is used to cBundling external dependencies, that are imported with `bare specifiers`, using

- Copying static assets into the distribution folder

## Install/use

```sh
$ cd ~/my-project
$ yarn add https://github.com/npolar/mdc#v0.0.1
$ cd node_modules/@npolar/mdc && yarn && yarn prebuild && cd -

```

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
