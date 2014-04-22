
var refreshTreeView = function(showHiddenFiles, callback){
	Meteor.call('workingDirGetData', showHiddenFiles, function (error, data) { 
        if (callback){
        	callback(error, data);	
        }        
    });
};

Template.dirtree.rendered = function(){	
	refreshTreeView(false, function(err, data){
        err && console.log(err);
        var tr = $('#dirtree');

		tr.tree({
            data: [data],
            autoOpen: false,
            dragAndDrop: false
        });

		tr.bind('tree.dblclick',function(e) {
			if(e.node.type == "file"){
				Meteor.call('editorOpenFile', e.node.name, e.node.path, function(err){
                    err && console.log(err);
                });
			}
    	});
	});
};

Template.dirtreeoptions.rendered = function(){	
	$('#btnShowHidden').click(function () {
		var label = $(this);
		var checked = !label.hasClass('active');		
		var txt = label.text();
		label.text("Load Directory...");
		refreshTreeView(checked, function(error, data){
			$('#dirtree').tree('loadData', [data]);
			label.text(txt);
		});    
	});
};