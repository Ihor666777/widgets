<!-- TITLE/ -->

<h1>widgets</h1>

<!-- /TITLE -->


<!-- BADGES/ -->



<!-- /BADGES -->


<!-- DESCRIPTION/ -->

Small webcomponent library for simple apps

<!-- /DESCRIPTION -->


<!-- INSTALL/ -->

<h2>Install</h2>

<a href="https://npmjs.com" title="npm is a package manager for javascript"><h3>NPM</h3></a><ul>
<li>Install: <code>npm install --save widgets</code></li>
<li>Module: <code>require('widgets')</code></li></ul>

<!-- /INSTALL -->


## Usage

```js
import { Component, Template, Attribute, define, bootstrap } from 'widgets'
import { hyper as renderer } from 'widgets/source/renderers/hyper'
import hyper from 'hyperhtml/esm'

// define a component
define([
  Component('fn'),
  Attribute('name', String),
  Template(html => {
    html `<h1>Hello ${name}</h1>`
  }),
  class Greeter extends HTMLElement {

  }
])

bootstrap([
  renderer(hyper) // tell widgets how to render component
])


const greeter = document.createElement('fn-greeter')

// update attributes directly
greeter.setAttribute('name', '???')

// or use equivalent setter
greeter.name = "World"

document.body.appendChild(greeter)


```

<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; Øystein Østebø Olsen</li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/ISC.html">ISC License</a></li></ul>

<!-- /LICENSE -->