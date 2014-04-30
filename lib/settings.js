function getSettings() {
  var store = getGlobalObjectStore();  
  store.settings = store.settings||{};  
  return store.settings;
};


notifySettingChanged = function(settingId, cb){
   var settings = getSettings();
   settings.callbacks = settings.callbacks || []; 
   settings.callbacks[settingId] = settings.callbacks[settingId] || [];
   settings.callbacks[settingId].push(cb);  
}

getSetting = function (settingId, callback) {  
  var tokens = settingId.split('.');
  if(tokens.length == 2){
    Meteor.call('getSetting', tokens[0], function(err, res){        
      callback(err,res[tokens[1]]);
    });    
  }
};


setSetting = function (settingId, value) {   
  _.each(settings.callbacks[settingId], function(callback){
    callback(value);
  });
  
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