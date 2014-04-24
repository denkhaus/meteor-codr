Template.editor.rendered = function () {

    var self = this;
    var elmEdit = this.find("#aceEditor");
    var newEditorId = "aceEdit-" + self.data.id;
    elmEdit.id = newEditorId

    var elmStatus = this.find("#aceStatusBar");
    elmStatus.id = "aceStatus-" + self.data.id;

    var editor = ace.edit(newEditorId);
    //editor.setTheme("ace/theme/monokai");
    //editor.getSession().setMode("ace/mode/css");
    //editor.setHighlightActiveLine(true);

    editor.setAutoScrollEditorIntoView();

    registerEditor({
        ed: editor,
        id: self.data.id,
        path: self.data.path
    });

    editor.getSession().on('change', function (e) {

    });

    //var StatusBar = ace.require('ace/ext/statusbar').StatusBar;
    //var statusBar = new StatusBar(editor, elmStatus);

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
            })
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