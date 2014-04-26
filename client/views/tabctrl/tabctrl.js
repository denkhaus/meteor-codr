
Template.tabctrl.rendered = function(){

    //TODO: look for a better way to do updating in blaze
    mutationsObserver($("#mainTab"), function (){
        $(".btnCloseTab").click(function () {
            var tabContentId = $(this).parent().attr("href");
            var editorId = tabContentId.substring(1);
            Meteor.call('editorCloseFile',editorId, function(err){
                if(!err){
                    $(this).parent().parent().remove(); //remove li of tab
                    $('#mainTab a:last').tab('show'); // Select first tab
                    $(tabContentId).remove(); //remove respective tab content
                    unregisterEditor(editorId);
                }
            });
        });

        // set focus on editor by selected tab
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var actTab = e.target;
            if(actTab){
                focusEditorById(actTab.hash.substring(1));
            }
        });
    });
};

Template.tabctrl.files = function(){
    return Files.find();
}
