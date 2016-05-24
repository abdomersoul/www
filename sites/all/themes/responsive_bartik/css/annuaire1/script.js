(function($) {

  $("a#red").click(function(){
      console.log("red");
      $(this).toggleClass("check");
  });

})(jQuery);
