getSetting = function (setting, defaultValue) {
  /*
  var userId = Meteor.userId();
  var settings = Settings.find({
    userId: userId
  }, {
    fields: {
      setting: 1
    }
  }).fetch();

  if (settings && settings[setting]) {
    return settings[setting];
  }

  if (typeof defaultValue !== 'undefined') {
    setSetting(setting, defaultValue);
    return defaultValue;
  }

  return '';
  
  */
  
  return typeof defaultValue === 'undefined' ? '' : defaultValue;
};


setSetting = function (setting, value) {
  /*
  if (typeof value !== 'undefined') {
    Settings.upsert({
      userId: Meteor.userId()
    }, {
      setting: value
    });
  }
  */
};