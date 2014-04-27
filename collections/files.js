Files = new Meteor.Collection('files');

Files.allow({
    insert: allowFileOperation,
    update: allowFileOperation,
    remove: allowFileOperation
});



if (Meteor.isClient) {
    var query = Files.find({});
    var setHasEditors = function (cnt) {
        $('#themesCombo').prop('disabled', cnt === 0);
        $('#themesCombo').selectpicker('refresh');        
    };
    
    var count = 0;
    query.observeChanges({
        added: function () {
            count++
            setHasEditors(count);
        },
        removed: function () {
            count--
            setHasEditors(count);
        }
    });    
}