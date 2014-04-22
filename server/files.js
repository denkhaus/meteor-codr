
Meteor.publish('files', function() {
    if(allowFileOperation(this.userId)){
        return Files.find();
    }
    return [];
});