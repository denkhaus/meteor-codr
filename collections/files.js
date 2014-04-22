Files = new Meteor.Collection('files');

Files.allow({
      insert: allowFileOperation
    , update: allowFileOperation
    , remove: allowFileOperation
});