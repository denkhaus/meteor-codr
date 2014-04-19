
var refreshTreeView = function(showHiddenFiles, callback){
	Meteor.call('workingDirGetData', showHiddenFiles, function (error, data) { 
        if (callback){
        	callback(error, data);	
        }        
    });
};

Template.dirtree.rendered = function(){	
	refreshTreeView(false, function(error, data){
		$('#dirtree').tree({
            data: [data],
            autoOpen: false,
            dragAndDrop: false
        });

		$('#dirtree').bind('tree.dblclick',function(e) {
			if(e.node.type == "file"){
				Meteor.call('editorOpenFile',e.node.path, function(error, data){
					console.log("server response -> editorOpenFile:" + data);	
				});				
			}
        	console.log(e.node);
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