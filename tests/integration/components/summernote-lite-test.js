import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('summernote-lite', 'Integration | Component | summernote-lite editor', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{summernote-lite}}`);

  assert.notEqual(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#summernote-lite}}
      template block text
    {{/summernote-lite}}
  `);

  assert.notEqual(this.$().text().trim(), 'template block text');
});
