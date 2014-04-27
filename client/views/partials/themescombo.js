Template.themesComboBox.rendered = function () {
  var elm = this.find('#themesCombo');
  var select = $(elm).selectpicker();
  
  select.on('change', function () {
    var newTheme = select.val();
    setSetting("editor.theme", newTheme);
    editorSetThemeAll(newTheme);
  });
}


Template.themesComboBox.themes = function () {
  var thList = ace.require("ace/ext/themelist");
  return thList.themes;
}

Template.themesComboBox.disabled = function () {      
  return Session.get('hasEditors') ;//? '' : 'disabled';
}