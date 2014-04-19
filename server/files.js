
Meteor.publish('files', function() {
    if(canViewFiles(this.userId)){
        return Files.find();
    }
    return [];
});