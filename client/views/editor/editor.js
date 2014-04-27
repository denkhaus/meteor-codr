Template.editor.rendered = function () {

  var self = this;
  var elmEdit = this.find("#aceEditor");
  var newEditorId = "aceEdit-" + self.data.id;
  elmEdit.id = newEditorId

  var elmStatus = this.find("#aceStatusBar");
  elmStatus.id = "aceStatus-" + self.data.id;

  var editor = ace.edit(newEditorId);

  var currentTheme = getSetting("editor.theme", "ace/theme/monokai");
  editor.setTheme(currentTheme);
  editor.setHighlightActiveLine(true);
  editor.setAutoScrollEditorIntoView();

  registerEditor({
    ed: editor,
    id: self.data.id,
    path: self.data.path,
    dirty: false
  });

  editor.getSession().on('change', function () {
    editorSetDirty(editor, true);
  });

  var sb = ace.require('ace/ext/statusbar');
  var statusBar = new sb.StatusBar(editor, elmStatus);

  $(elmEdit).css({
    position: "absolute",
    top: 40,
    right: 0,
    bottom: 0,
    left: 0
  });

  editor.commands.addCommand({
    name: "showKeyboardShortcuts",
    bindKey: {
      win: "Ctrl-Alt-h",
      mac: "Command-Alt-h"
    },
    exec: function (editor) {
      ace.config.loadModule("ace/ext/keybinding_menu", function (module) {
        module.init(editor);
        editor.showKeyboardShortcuts()
      });
    }
  });

  editor.commands.addCommand({
    name: 'safeContent',
    bindKey: {
      win: 'Ctrl-S',
      mac: 'Command-S'
    },
    exec: function (editor) {
      editorSaveContent(editor, self.data.path);
    },
    readOnly: false // false if this command should not apply in readOnly mode
  });

  editorLoadContent(editor, self.data.path);
}