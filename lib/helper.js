
getSetting = function(setting, defaultValue){
  var settings=Settings.find({userid: Meteor.userId()}).fetch();
  if(settings){
    return settings[setting];
  }
  return typeof defaultValue === 'undefined' ? '' : defaultValue;
};


mutationsObserver = function (targetNodes, callback){
    var MutationObserver    = window.MutationObserver || window.WebKitMutationObserver;
    var myObserver          = new MutationObserver (mutationHandler);
    var obsConfig           = { childList: true, characterData: true, attributes: true, subtree: true };

    targetNodes.each ( function () {
        myObserver.observe (this, obsConfig);
    } );

    function mutationHandler (mutationRecords) {
        console.info ("mutationHandler: ", mutationRecords);
        callback();

    }
};
