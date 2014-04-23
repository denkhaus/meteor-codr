getEditors =  function(){
    if(!window.editors) window.editors = [];
    return window.editors;
};

registerEditor =  function(id, editor){
    getEditors().push({id:id, ed:editor});
};

unregisterEditor =  function(id){
    var editors = getEditors();
    var res = _.find(editors, function(data){
        return data.id == id;
    });

    window.editors = _.without(editors, res);
};

getEditorById =  function(id){
    var res = _.find(getEditors(), function(data){
        return data.id == id;
    });

    if(res){
        return res.ed;
    }
    return null;
};

focusEditorById = function(id){
    var ed = getEditorById(id);
    ed && ed.focus();
};

resizeEditorsToFit = function(w, h){
    _.each(getEditors(),function(data){
      //  var ed = $(data.ed);
      //  ed.height(h);
      //  ed.width(w);
      //  data.ed.resize(true);
    });
};