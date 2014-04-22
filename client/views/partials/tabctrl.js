
Template.tabctrl.rendered = function(){
    $(".closeTab").click(function () {
        //there are multiple elements which has .closeTab icon so close the tab whose close icon is clicked
        var tabContentId = $(this).parent().attr("href");
        Meteor.call('editorCloseFile', tabContentId.substring(1), function(err, res){
            if(!err){
                $(this).parent().parent().remove(); //remove li of tab
                $('#mainTab a:last').tab('show'); // Select first tab
                $(tabContentId).remove(); //remove respective tab content
            }
        });
    });
};

Template.tabctrl.files = function(){
    return Files.find();
}
