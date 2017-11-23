$(document)
  .ready(function() {
    // fix menu when passed
    $('.masthead')
      .visibility({
        once: false,
        onBottomPassed: function() {
          $('.fixed.menu').transition('fade in');
        },
        onBottomPassedReverse: function() {
          $('.fixed.menu').transition('fade out');
        }
      })
    ;

    // create sidebar and attach to menu open
    $('.ui.sidebar')
      .sidebar('attach events', '.toc.item')
    ;
  })
;

$("input:text").click(function() {
  $(this).parent().find("input:file").click();
});

$('input:file', '.ui.action.input')
.on('change', function(e) {
  console.log(e.target.files);
  if (e.target.files.length > 1) {
    var name = `${e.target.files.length} file dipilih.`
  }else{
    var name = e.target.files[0].name;
  }
  $('input:text', $(e.target).parent()).val(name);
});
