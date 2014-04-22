createDefaultSettings = function(userId){

	var defSettings = {};
	defSettings['userid'] = userId;
	defSettings['showhiddenfiles'] = false;
	Settings.insert(defSettings);
};

Meteor.publish('settings', function() {
  var options = {};
  if(!isAdminById(this.userId)){
    options = _.extend(options, {
      fields: {
        mailChimpAPIKey: false,
        mailChimpListId: false
      }
    });
  }

  return Settings.find({userid: this.userId}, options);
});