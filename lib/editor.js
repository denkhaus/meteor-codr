getEditors = function () {
    if (!window.editors) window.editors = [];
    return window.editors;
};

registerEditor = function (data) {
    getEditors().push(data);
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
            editor.setValue(base64ToString(res))
        } else {
            console.log("Can't get file content of path " + path + " Error:: " + err);
        }
    });
};

editorSaveContent = function (editor, path) {
    var base64 = stringToBase64(editor.getValue());
    Meteor.call('editorSetFileContent', path, base64, function (err, res) {
        if (!err) {
            notifySuccess("Success", "File " + path + " successfull safed.");
        } else {
            console.log("Can't save file content of path " + path + " Error:: " + err);
        }
    });
};