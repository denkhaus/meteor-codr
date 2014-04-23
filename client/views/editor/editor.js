Template.editor.rendered = function(){

    var elm = this.find("#aceEditor");
    var newId = "aceEdit-" + this.data.id;
    elm.id = newId;

    var editor = ace.edit(newId);
    //editor.setTheme("ace/theme/monokai");
    //editor.getSession().setMode("ace/mode/css");
    //editor.setHighlightActiveLine(true);
    editor.setAutoScrollEditorIntoView();
    registerEditor(this.data.id, editor);

    $(elm).css({
        position: "absolute",
        top: 42,
        right: 0,
        bottom: 0,
        left: 0
    });

    var path = this.data.path;
    Meteor.call('editorGetFileContent', path, function(err, res){
        if(!err){
            editor.setValue(res)
        } else{
            console.log("Can't get file content of path " + path + " Error:: " + err);
        }
    });
}