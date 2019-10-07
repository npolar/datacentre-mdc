# Material Design Components

[![Build Status](https://travis-ci.com/npolar/mdc.svg?branch=master)](https://travis-ci.com/npolar/mdc) [Demo](https://mdc.npolar.now.sh)

ES2019 web components, built with [LitElement](https://lit-element.polymer-project.org/) and [lit-html](https://lit-html.polymer-project.org/) on top of:

- [Material Web Components](https://github.com/material-components/material-components-web-components)
- [Material Components for the web](https://github.com/material-components/material-components-web)
- [Inter](https://rsms.me/inter/)
- [Material Icons](https://material.io/resources/icons/?style=baseline)

## Install

```
yarn add @npolar/mdc
```

## Self-hosted fonts

To use self-hosted [Inter](https://rsms.me/inter/) and [Material Icons](https://material.io/resources/icons/?style=baseline) fonts, you need to copy CSS and font files into your project's build / web root (here `dist`):

````sh
mkdir -p dist/@npolar/mdc/font
cp -r node_modules/@npolar/mdc/asset/font dist/@npolar/mdc
```
And, add links to the font stylesheets in your `<head>` element:
```html
<link rel="stylesheet" href="/@npolar/mdc/css/style/material-icons.css" />
<link rel="stylesheet" href="/@npolar/mdc/css/style/typography.css" />
````
