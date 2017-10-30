# ember-summernote-lite

[![Ember Observer Score](http://emberobserver.com/badges/ember-summernote-lite.svg)](http://emberobserver.com/addons/ember-summernote-lite)
[![Build Status](https://travis-ci.org/pauln/ember-summernote-lite.svg)](http://travis-ci.org/pauln/ember-summernote-lite)
[![Coverage Status](https://coveralls.io/repos/github/pauln/ember-summernote-lite/badge.svg)](https://coveralls.io/github/pauln/ember-summernote-lite)
[![NPM Version](https://badge.fury.io/js/ember-summernote-lite.svg)](http://badge.fury.io/js/ember-summernote-lite)
[![NPM Downloads](https://img.shields.io/npm/dm/ember-summernote-lite.svg)](https://www.npmjs.org/package/ember-summernote-lite)
[![Greenkeeper badge](https://badges.greenkeeper.io/pauln/ember-summernote-lite.svg)](https://greenkeeper.io/)

## Description
A wrapper around the "lite" version of [summernote](https://github.com/summernote/summernote) for use in ember-cli projects.

This is a fork of [devotox's ember-cli-summernote-editor](https://github.com/devotox/ember-cli-summernote-editor), which removes the dependency on Bootstrap by using the "lite" version of summernote.

[DEMO](http://pauln.github.io/ember-summernote-lite)

## Installation
* `ember install ember-summernote-lite`

## Usage

### Handlebar Template

```javascript
import Ember from 'ember';

export default Ember.Controller.extend({
  height: 200,
  value: "Some intial contents go here. Lorem Ipsum is simply dummy text of the printing.",
  disabled: false,

  actions: {
    changeHeight(someObject) {
      let height = someObject.doSomeCalculationToGetHeight();
      set(this, 'height', height)
    }
  }
});
```

```handlebars

{{summernote-lite
  focus=false
  btnSize=bs-sm
  airMode=false
  height=height
  buttons=buttons
  toolbar=toolbar
  disabled=disabled
  callbacks=callbacks
  content=(readonly value)
  onContentChange=(action (mut value))
}}
```

### Custom buttons usage ###

In hbs file
```javascript
    {{summernote-lite content=article buttons=customButtons}}
```

In controller file
```javascript
    import Ember from 'ember';

    export default Ember.Controller.extend({
        article: 'some text',
        customButtons: [],

        init() {

            let _onNewBlock = this.get('onNewBlock').bind(this);

            let newBlockButton = function (context) {
                var ui = $.summernote.ui;

                var button = ui.button({
                    contents: '<i class="fa fa-file-text-o"/> New div',
                    tooltip: 'New div',
                    click: _onNewBlock
                });

                return button.render();
            }

            this.customButtons.push(newBlockButton);

        },

        onNewBlock() {
            let blocks = '<div class="header" id="headerBlock"></div>';
            this.set('article', article + blocks);
        }
    });
```

All callbacks except `onChange` are supported.

The `onChange` callback are used internally for the `onContentChange` action.

```javascript
    callbackOptions: {
      onInit: function() {
        console.log('Summernote is launched');
      },
      onEnter: function() {
        console.log('Enter/Return key pressed');
      },
      onPaste: function(e) {
        console.log('Called event paste');
      },
    },
```

## Available options
See original library [Summernote](https://github.com/summernote/summernote)

#### License
MIT license.
