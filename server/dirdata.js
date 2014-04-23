
var dir2json = Meteor.require("dir2json");

var clearAllActiveState = function(){
    Files.update({},
            {$set: { active: " "}},
            {multiple: true}
    );
}

Meteor.methods({
  workingDirGetData: function (includeDotFiles) {
      if(allowFileOperation(this.userId)) {
          return dir2json("/home/denkhaus/gate/dev/meteor", includeDotFiles);
      }
      return {};
  }, 
  editorOpenFile: function (name, path) {
      if(allowFileOperation(this.userId)) {
          clearAllActiveState();
          var fAvailable = Files.find({path: path}, {limit:1}).count() > 0;
          if(! fAvailable ){
              Files.insert({name: name, path: path, active: "active"});
          }else if( fAvailable){
              Files.update({path: path}, {$set: { active: "active"}});
          }
      }
  },
   editorCloseFile: function(entryId) {
      if(allowFileOperation(this.userId)) {
          Files.remove({_id: entryId});
          return true;
      }
       return false;
   },
   editorGetFileContent: function (path) {
      if(allowFileOperation(this.userId)){
          return "This is the Content of " + path + " File";
      }
  }
});