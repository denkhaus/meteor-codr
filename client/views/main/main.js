Template.main.rendered = function () {
  var mainLayout = $('#lmain').layout({
    applyDefaultStyles: true,
    defaults: {
      size: "auto",
      closable: true,
      resizable: true,
      slidable: true,
      livePaneResizing: true
    },
    west: {
      minSize: 300
    },
    east: {
      minSize: 300,
      initClosed: true
    }
  });

  var centerLayout = $('#lcenter').layout({
    applyDefaultStyles: true,
    south: {
      minSize: 300,
      size: "auto",
      closable: true,
      resizable: true,
      slidable: true,
      livePaneResizing: true
    }
    //,onresize: function(name, elm, state, options, layout){
    //    if(name == "center"){
    //        resizeEditorsToFit(state.innerWidth, state.innerHeight);
    //    }}
  });

  $('#btnShowSettings').click(function () {
    mainLayout.toggle('east');
  });
  
  $('#btnShowConsole').click(function () {
    centerLayout.toggle('south');
  });
};