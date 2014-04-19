
var dir2json = Meteor.require("dir2json");

Meteor.methods({
  workingDirGetData: function (includeDotFiles) {
	var data = dir2json("/home/denkhaus/dev/node", includeDotFiles);
	return data;   
  },
  editorOpenFile: function (path) {
	  return path;
  }  
});