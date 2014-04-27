var dir2json = Meteor.require('dir2json');
var fs = Meteor.require('fs');

function clearAllActiveState() {
  Files.update({}, {
    $set: {
      active: ""
    }
  }, {
    multiple: true
  });
}

function clearDirtyStateByPath(path) {
  Files.update({
    path: path
  }, {
    $set: {
      dirty: false
    }
  });
}

Meteor.methods({

  workingDirGetData: function (includeDotFiles) {
    if (allowFileOperation(this.userId)) {
      return dir2json("/home/denkhaus/gate/dev/meteor", includeDotFiles);
    } else {
      return new Meteor.Error(405, 'Not allowed');
    }
  },

  editorOpenFile: function (name, path) {
    if (allowFileOperation(this.userId)) {
      clearAllActiveState();

      var fAvailable = Files.find({
        path: path
      }, {
        limit: 1
      }).count() > 0;

      if (!fAvailable) {
        Files.insert({
          name: name,
          path: path,
          active: "active",
          dirty: false
        });
      } else if (fAvailable) {
        Files.update({
          path: path
        }, {
          $set: {
            active: "active"
          }
        });
      }
    } else {
      return new Meteor.Error(405, 'Not allowed');
    }
  },

  editorCloseFile: function (entryId) {
    if (allowFileOperation(this.userId)) {
      Files.remove({
        _id: entryId
      });
      return true;
    } else {
      return new Meteor.Error(405, 'Not allowed');
    }
  },

  editorGetFileContent: function (path) {
    if (allowFileOperation(this.userId)) {
      var res = Meteor.sync(function (done) {
        fs.readFile(path, 'utf8', function (err, data) {
          if (!err) {
            done(null, stringToBase64(data));
          }
          done(err, null);
        });
      });

      if (res.error) {
        return new Meteor.Error(res.error.errno,
          "Can't read file content",
          res.error.message);
      }
      
      //dirty state is managed on the client
      return res.result;

    } else {
      return new Meteor.Error(405, 'Not allowed');
    }
  },

  editorSetFileContent: function (path, base64) {
    if (allowFileOperation(this.userId)) {
      var content = base64ToString(base64);
      var res = Meteor.sync(function (done) {
        fs.writeFile(path, content, function (err) {
          done(err, true);
        });
      });

      if (res.error) {
        return new Meteor.Error(res.error.errno,
          "Can't write file content",
          res.error.message);
      }
      
      clearDirtyStateByPath(path);
      return res.result;
    } else {
      return new Meteor.Error(405, 'Not allowed');
    }
  }
});