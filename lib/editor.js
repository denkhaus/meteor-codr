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
        return data.id === id;
    });

    window.editors = _.without(editors, res);
};

getEditorById = function (id) {
    var res = _.find(getEditors(), function (data) {
        return data.id === id;
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

editorSetDirty = function (ed, dirty) {
    var res = _.find(getEditors(), function (data) {
        return data.ed === ed;
    });

    Files.update({
        _id: res.id
    }, {
        $set: {
            dirty: dirty
        }
    });
    res.dirty = dirty;
};

editorIsDirty = function (ed) {
    var res = _.find(getEditors(), function (data) {
        return data.ed === ed;
    });

    return res.dirty;
};

editorSetProperty = function (ed, setting) {
    var res = _.find(getEditors(), function (data) {
        return data.ed === ed;
    });

    if (res) {
        _.extend(res, setting)
    }
};

editorSetModeByFilePath = function (ed, path) {
    var modelist = ace.require('ace/ext/modelist');
    var mode = modelist.getModeForPath(path);

    if (mode) {
        editorSetProperty(ed, {mode: mode});
        ed.getSession().setMode(mode.mode);
    }
};

editorLoadContent = function (ed, path) {
    Meteor.call('editorGetFileContent', path, function (err, res) {
        if (!err) {
            ed.setValue(base64ToString(res))
            editorSetModeByFilePath(ed, path);
            editorSetDirty(ed, false);
        } else {
            notifyError("Error", "Can't get file content of path " + path + " Error:: " + err);
        }
    });
};

editorSaveContent = function (ed, path) {
    if (!editorIsDirty(ed)) {
        notifyInfo("Info", "Nothing to save.");
        return;
    }

    var base64 = stringToBase64(ed.getValue());
    Meteor.call('editorSetFileContent', path, base64, function (err, res) {
        if (!err) {
            editorSetDirty(ed,!res);
            notifySuccess("Success", "File " + path + " successfull safed.");
        } else {
            notifyError("Error", "Can't save file content of path " + path + " Error:: " + err);
        }
    });
};