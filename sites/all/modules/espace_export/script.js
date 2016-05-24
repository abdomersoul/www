
(function ($) {
    Drupal.behaviors.yourFunction = {
        attach: function(context, settings) {


            $('#espriveexport-form').on('keydown', '.numerique', function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
            
            function format1(n) {

                return n.toFixed(2).replace(/./g, function(c, i, a) {
                    return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? " " + c : c;
                });
            }

            $('body').on('blur', '.money', function(e){
                $price = $(this).val().replace(/ /g,"");
                $(this).val(format1(parseFloat($price)));
            });
            
            /* Marque*/
              $tfm = $("#edit-marque");
              $tabm = $("#listMarques tbody");
              $exportid = $("input#exportid").val();
              $('body').on('click', '#edit-btnmarque', function(e){

                $.ajax({
                    url: "/sites/all/modules/espace_export/AddTolist.php",
                    data: "select=marque&idexpt="+$exportid+"&val="+$tfm.val(),
                    dataType: "json",
                    success: function(json) {
                        //location.reload();
                        $tfm.val('');
                        $tabm.empty();
                        $.each(json, function(index, value) {
                            $tabm.append('<tr><td>'+ index +'</td><td class="actions"><a href="#" class="btnmdfy" data-name="'+ index +'">Modifier</a><a href="#" class="btnconf" style="display:none" data-name="'+ index +'">Confirmer</a><a href="#" class="btnsupp" data-name="'+index+'">Supprimer</a></td></tr>');
                        });

                    }
                });

              });

              /** delete **/
               $('body').on('click', '#listMarques .btnsupp', function(e){
              //$("#listMarques .btnsupp").on('click',function(e) {
                if (confirm("Êtes-vous sûr ?")) {
                  $verif = false;
                  $.ajax({
                      url: "/sites/all/modules/espace_export/DeleteFromlist.php",
                      data: "select=marque&idexpt="+$exportid+"&val="+$(this).data('name'),
                      dataType: "json",
                      success: function(json) {
                           $verif = true;
                      }
                  });
                      
                  var tr = $(this).closest('tr');
                  tr.css("background-color","#FF3700");
                  tr.fadeOut(400, function(){ tr.remove(); });
                  $tfm.val('');
                }
                return false;

              });

               /* MAJ */
              $('body').on('click', '#listMarques .btnmdfy', function(e){
                $tfm.val($(this).data('name'));
                $(this).css("display","none");
                $(this).closest('td').find('.btnconf').css("display","block");
                return false;
              });

              $('body').on('click', '#listMarques .btnconf', function(e){

                $tfm = $("#edit-marque");
                $tabm = $("#listMarques tbody");
                $.ajax({
                    url: "/sites/all/modules/espace_export/Updatelist.php",
                    data: "select=marque&idexpt="+$exportid+"&Oval="+$(this).data('name')+"&Nval="+$tfm.val(),
                    dataType: "json",
                    success: function(json) {
                        $tfm.val('');
                        $tabm.empty();
                        $.each(json, function(index, value) {
                             $tabm.append('<tr><td>'+ index +'</td><td class="actions"><a href="#" class="btnmdfy" data-name="'+ index +'">Modifier</a><a href="#" class="btnconf" style="display:none" data-name="'+ index +'">Confirmer</a><a href="#" class="btnsupp" data-name="'+index+'">Supprimer</a></td></tr>');
                        });
                    }
                });
                
                $(this).css("display","none");
                $(this).closest('td .btnmdfy').css("display","block");

                return false;

              });




            /* certif */
              $tfc = $("#edit-certification");
              $tabc = $("#listcertif tbody");
              $exportid = $("input#exportid").val();
              $('body').on('click', '#edit-btncertif', function(e){
              //$("#edit-btncertif").click(function() {

                $.ajax({
                    url: "/sites/all/modules/espace_export/AddTolist.php",
                    data: "select=certif&idexpt="+$exportid+"&val="+$tfc.val(),
                    dataType: "json",
                    success: function(json) {
                        //location.reload();
                        $tfc.val('');
                        $tabc.empty();
                        $.each(json, function(index, value) {
                            $tabc.append('<tr><td>'+ index +'</td><td class="actions"><a href="#" class="btnmdfy" data-name="'+ index +'">Modifier</a><a href="#" class="btnconf" style="display:none" data-name="'+ index +'">Confirmer</a><a href="#" class="btnsupp" data-name="'+index+'">Supprimer</a></td></tr>');
                        });

                    }
                });

              });

              /** delete **/
              $('body').on('click', '#listcertif .btnsupp', function(e){
             // $("#listcertif .btnsupp").click(function() {
              if (confirm("Êtes-vous sûr ?")) {
          
                $.ajax({
                    url: "/sites/all/modules/espace_export/DeleteFromlist.php",
                    data: "select=certif&idexpt="+$exportid+"&val="+$(this).data('name'),
                    dataType: "json",
                    success: function(json) {

                    }
                    
                });

                $tr = $(this).closest('tr');
                $tr.css("background-color","#FF3700");

                $tr.fadeOut(400, function(){
                    $tr.remove();
                });
                $tfc.val('');
              }
                return false;

              });


              /* MAJ */
              $('body').on('click', '#listcertif .btnmdfy', function(e){
                $tfc.val($(this).data('name'));
                $(this).css("display","none");
                $(this).closest('td').find('.btnconf').css("display","block");
                return false;
              });

              $('body').on('click', '#listcertif .btnconf', function(e){

              
                $.ajax({
                    url: "/sites/all/modules/espace_export/Updatelist.php",
                    data: "select=certif&idexpt="+$exportid+"&Oval="+$(this).data('name')+"&Nval="+$tfc.val(),
                    dataType: "json",
                    success: function(json) {
                        $tfc.val('');
                        $tabc.empty();
                        $.each(json, function(index, value) {
                             $tabc.append('<tr><td>'+ index +'</td><td class="actions"><a href="#" class="btnmdfy" data-name="'+ index +'">Modifier</a><a href="#" class="btnconf" style="display:none" data-name="'+ index +'">Confirmer</a><a href="#" class="btnsupp" data-name="'+index+'">Supprimer</a></td></tr>');
                        });
                    }
                });
                
                $(this).css("display","none");
                $(this).closest('td .btnmdfy').css("display","block");

                return false;

              });


          /** CONTROLL DE SAISIE  **/
         

       }
    };
})(jQuery);