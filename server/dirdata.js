
var dir2json = Meteor.require("dir2json");

Meteor.methods({
  workingDirGetData: function (includeDotFiles) {
      if(canViewFiles(this.userId)) {
          return dir2json("/home/denkhaus/gate/dev/meteor", includeDotFiles);
      }
	  return {};
  },
  editorOpenFile: function (path) {
      if(canViewFiles(this.userId)) {
          if(Files.find({path: path}, {limit:1}).count() == 0){
              Files.insert({path: path});
              return "inserted:" + path;
          }
      }
      return "not inserted";
  }  
});