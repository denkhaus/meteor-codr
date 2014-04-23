getEditors = function () {
    if (!window.editors) window.editors = [];
    return window.editors;
};

registerEditor = function (id, editor) {
    getEditors().push({
        id: id,
        ed: editor
    });
};

unregisterEditor = function (id) {
    var editors = getEditors();
    var res = _.find(editors, function (data) {
        return data.id == id;
    });

    window.editors = _.without(editors, res);
};

getEditorById = function (id) {
    var res = _.find(getEditors(), function (data) {
        return data.id == id;
    });

    if (res) {
        return res.ed;
    }
    return null;
};

focusEditorById = function (id) {
    var ed = getEditorById(id);
    ed && ed.focus();
};

editorLoadContent = function (editor, path) {
    Meteor.call('editorGetFileContent', path, function (err, res) {
        if (!err) {
            editor.setValue(res)
        } else {
            console.log("Can't get file content of path " + path + " Error:: " + err);
        }
    });
};


editorSaveContent = function (editor, path) {
    var content = editor.getContent();
    Meteor.call('editorSetFileContent', content, function (err, res) {
        if (!err) {

        } else {
            console.log("Can't save file content of path " + path + " Error:: " + err);
        }
    });
};