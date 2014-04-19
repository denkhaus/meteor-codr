
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
            autoOpen: true,
            dragAndDrop: false
        });
		$('#dirtree').bind('tree.dblclick',function(e) {
			if(e.node.type == "file"){
				console.log(Meteor.call('editorOpenFile',e.node.path));
			}
        	console.log(e.node);
    	});
	});
};

Template.dirtreeoptions.rendered = function(){	
	$('#btnShowHidden').click(function () {
		var checked = $(this).hasClass('active');
		
		refreshTreeView(checked, function(error, data){
			$('#dirtree').tree('loadData', [data]);
		});    
	});
};