Meteor.startup(function () {
    Meteor.subscribe("files");
    Session.set('hasEditors', 'disabled');
});