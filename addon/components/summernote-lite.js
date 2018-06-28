import { observer } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/summernote-lite';

export default Component.extend({
  layout,

  lang: null,
  height: 120,
  focus: false,
  content: null,
  airMode: false,
  callbacks: null,
  disabled: false,
  shortcuts: false,
  summernote: null,
  btnSize: 'btn-xs',
  dialogsFade: true,
  placeholder: null,
  dialogsInBody: false,
  disableDragAndDrop: false,

  toolbar: [
    ['fontname', ['fontname']],
    ['fontsize', ['fontsize']],
    ['style', ['style']],
    ['color', ['color']],
    ['height', ['height']],
    ['table', ['table']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['font', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
    ['insert', ['link', 'picture', 'video', 'hr']],
    ['view', ['undo', 'redo', 'codeview', 'fullscreen']]
  ],

  summernoteOptions: function() {
    const buttons = {};
    const toolbar = this.get('toolbar');
    const _buttons = this.get('buttons') || [];
    const callbacks = this.get('callbacks') || {};
    callbacks.onChange = this.get('onContentChange') || ((content) => this.set('content', content));

    const properties = this.getProperties([
      'height', 'focus', 'lang', 'airMode', 'shortcuts', 'placeholder',
      'dialogsInBody', 'dialogsFade', 'disableDragAndDrop'
    ]);

    _buttons.forEach((item, i) => {
      buttons[`myButton${i}`] = item;
      toolbar.push([`myButton${i}`, [`myButton${i}`]]);
    });

    return Object.assign(properties, { callbacks, toolbar, buttons });
  },

  setupSummernote: function() {
    const summernote = this.get('summernote');
    const parent = summernote.parent();

    parent.find('.note-editable').attr('contenteditable', !this.get('disabled'));
    parent.find('.btn').addClass(this.get('btnSize'));

    const content = this.get('content');
    summernote.summernote('code', content);

  },

  willDestroyElement: function() {
    const summernote = this.get('summernote');
    summernote.summernote('destroy');
  },

  didInsertElement: function() {
    const summernoteOptions = this.summernoteOptions();
    const summernote = this.$('.summernote').summernote(summernoteOptions);
    this.set('summernote', summernote);
    this.setupSummernote();
  },

  didReceiveAttrs: function() {
    const summernote = this.get('summernote');
    if (summernote) {
      const summerNoteContent = summernote.summernote('code');
      const content = this.get('content');
      if (summerNoteContent !== content) {
        summernote.summernote('code', content);
      }
    }
  },

  setHeight: observer('height', function() {
    const parent = this.get('summernote').parent();
    parent.find('.note-editable').css('height', this.get('height'));
  }),

  setDisabled: observer('disabled', function() {
    const parent = this.get('summernote').parent();
    parent.find('.note-editable').attr('contenteditable', !this.get('disabled'));
  })
});
