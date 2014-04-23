
Template.main.rendered = function () {
    $('#lmain').layout({ 
        applyDefaultStyles: true , 
        west:{ minSize: 300, size: "auto", closable:true, resizable:true, slidable:true, livePaneResizing: true}
    });
    
    $('#lcenter').layout({ 
        applyDefaultStyles: true,
        south:{ minSize: 300, size:"auto", closable:true, resizable:true, slidable:true, livePaneResizing: true}
        //,onresize: function(name, elm, state, options, layout){
        //    if(name == "center"){
        //        resizeEditorsToFit(state.innerWidth, state.innerHeight);
        //    }}
    });
};