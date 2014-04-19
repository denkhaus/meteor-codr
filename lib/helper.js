
getSetting = function(setting, defaultValue){
  var settings=Settings.find({userid: Meteor.userId()}).fetch();
  if(settings){
    return settings[setting];
  }
  return typeof defaultValue === 'undefined' ? '' : defaultValue;
}