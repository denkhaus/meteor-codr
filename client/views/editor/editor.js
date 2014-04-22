Template.editor.rendered = function(){

    var elm = this.find("#aceEditor");
    var newId = "aceEdit-" + this.data.id;
    elm.id = newId;

    var editor = ace.edit(newId);
    //editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/css");
    editor.setHighlightActiveLine(true);
    editor.resize(true);
}