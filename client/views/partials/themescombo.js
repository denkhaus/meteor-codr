Template.themesComboBox.rendered = function () {
    var elm = this.find('#themesCombo');
    var select = $(elm).selectpicker();
    select.on('change', function(){
        var newTheme = select.val();
        
    });
}


Template.themesComboBox.themes = function () {
    var thList = ace.require("ace/ext/themelist");
    return thList.themes;
}



