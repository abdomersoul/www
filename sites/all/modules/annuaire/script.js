
(function ($) {
    Drupal.behaviors.yourFunction = {
        attach: function(context, settings) {



            $("#recherche-rapide-form #edit-submit1").click(function(){

                $word = $.trim($("#edit-searchword").val());
                if ($word.length < 3) {
                  alert("Merci de saisir au moins 3 caractères");
                  return false;
                };
            });
  
              /* get famille produit */
              
               $("#edit-filierproduit").val("-1");
              $fp = jQuery("#edit-familleproduit");
              $fp.append('<option value="-1">Choisissez une option</option>');

              $("#edit-filierproduit").change(function() {

                $fp.empty();
                $fp.append('<option value="-1">Choisissez une option</option>');
                  $.ajax({
                      url: "/eacce/sites/all/modules/annuaire/recherche_avance.php",
                      data: "select=fp&id="+$(this).val(),
                      dataType: "json",
                      success: function(json) {
                          console.log(json);
                          $.each(json, function(index, value) {
                               $fp.append('<option value="'+ value +'">'+ index +'</option>');
                          });
                      }
                  });

              });


              /* get sous famille produit */
              
              $sfp = jQuery("#edit-sousfamilleproduit");
              $sfp.append('<option value="-1">Choisissez une option</option>');

              $("#edit-familleproduit").change(function() {

                $secteur = jQuery("#edit-filierproduit").val();
                $sfp.empty();
                $sfp.append('<option value="-1">Choisissez une option</option>');
                  $.ajax({
                      url: "/eacce/sites/all/modules/annuaire/recherche_avance.php",
                      data: "select=sfp&ids="+$secteur+"&id="+$(this).val(),
                      dataType: "json",
                      success: function(json) {
                          $.each(json, function(index, value) {
                               $sfp.append('<option value="'+ value +'">'+ index +'</option>');
                          });
                      }
                  });

              });

              /* get  produit */
              $p = jQuery("#edit-produit");
              $p.append('<option value="-1">Choisissez une option</option>');

              $("#edit-sousfamilleproduit").change(function() {
                $secteur = jQuery("#edit-filierproduit").val();
                $famille = jQuery("#edit-familleproduit").val();
                $p.empty();
                $p.append('<option value="-1">Choisissez une option</option>');
                  $.ajax({
                      url: "/eacce/sites/all/modules/annuaire/recherche_avance.php",
                      data: "select=p&ids="+$secteur+"&idf="+$famille+"&id="+$(this).val(),
                      dataType: "json",
                      success: function(json) {
                          $.each(json, function(index, value) {
                               $p.append('<option value="'+ value +'">'+ index +'</option>');
                          });
                      }
                  });

              });


              /* get  pays */
              $py = jQuery("#edit-pays");
              $py.append('<option value="-1">Choisissez une option</option>');

              $("#edit-marche").change(function() {

                $py.empty();
                $py.append('<option value="-1">Choisissez une option</option>');
                  $.ajax({
                      url: "/eacce/sites/all/modules/annuaire/recherche_avance.php",
                      data: "select=py&id="+$(this).val(),
                      dataType: "json",
                      success: function(json) {
                          $.each(json, function(index, value) {
                               $py.append('<option value="'+ value +'">'+ index +'</option>');
                          });
                      }
                  });

              });




          $("a.rtr").click(function(event) {
            event.preventDefault();
            history.back(1);
        });

          /** CONTROLL DE SAISIE  **/

        $(function() {
            $('#preinscription-form').on('keydown', '.numerique', function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
          })




        /** galerie***/

      function animateup(){
        $(".expotgalerie ul").fadeOut();
        $(".expotgalerie ul").animate({marginTop:-210},400,function(){
          
              $(this).css({marginTop:0}).find("li:last").after($(this).find("li:first"));
              $(this).fadeIn("fast");
          });
      }

      function animatedown(){
        $(".expotgalerie ul").fadeOut();
        $(".expotgalerie ul").animate({marginTop:+210},400,function(){
          
              $(this).css({marginTop:0}).find("li:first").before($(this).find("li:last"));
              $(this).fadeIn("fast");
          });
      }

        //var anm = setInterval(function(){ animateup();  }, 5000);

      $(".expotgalerie a#up").click(function(){
        animateup();
        //clearInterval(anm);
        //anm = setInterval(function(){ animateup();  }, 5000);
        return  false;
      });

      $(".expotgalerie a#down").click(function(){
          animatedown();
          //clearInterval(anm);
          //anm = setInterval(function(){ animateup();  }, 5000);
          return  false;
      });

        /*****/
         

       }
    };
})(jQuery);