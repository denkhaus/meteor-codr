var nconf = Meteor.require('nconf');

function loadDefaultSettings() {
    var settings = Assets.getText('codr.json');
    if (settings) {
        nconf.defaults(JSON.parse(settings));
    }
}

/*
Meteor.publish('settings', function () {
    var options = {};
    if (!isAdminById(this.userId)) {
        options = _.extend(options, {
            fields: {
                mailChimpAPIKey: false,
                mailChimpListId: false
            }
        });
    }

    return Settings.find({
        userid: this.userId
    }, options);
});
*/

Meteor.startup(function () {
    loadDefaultSettings();
});


Meteor.methods({
    getSetting: function (settingId) {
      var setting = nconf.get("default:" + settingId);
        return setting ? setting : new Meteor.Error(404, 'Not found');
    },
  
    setSetting: function (settingId, setting) {
        if (settingId) {
            nconf.set(settingId, setting);
        }
    }
});