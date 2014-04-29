Files = new Meteor.Collection('files');

Files.allow({
    insert: allowFileOperation,
    update: allowFileOperation,
    remove: allowFileOperation
});



if (Meteor.isClient) {
    var query = Files.find({});
    var refreshThemesCombo = function (cnt) {
        $('#themesCombo').prop('disabled', cnt === 0);
        $('#themesCombo').selectpicker('refresh');        
    };
    
    var count = 0;
    query.observeChanges({
        added: function () {
            count++
            refreshThemesCombo(count);
        },
        removed: function () {
            count--
            refreshThemesCombo(count);
        }
    });    
}