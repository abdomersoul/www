
(function ($) 
{
    Drupal.behaviors.yourFunction =
     {
        attach: function(context, settings) 
        {

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

            /* get Famille de produit */
            $produitFamille = $("#edit-produitfamille");
            $produitFamille.append('<option value="-1">Choisissez une option</option>');
            $("#edit-secteur").change(function() {
                  $produitFamille.empty();
                  $produitFamille.append('<option value="-1">Choisissez une option</option>');
                  $.ajax({
                      url: "/sites/all/modules/annuaire/recherche_avance.php",
                      data: "select=fp&id="+$(this).val(),
                      dataType: "json",
                      success: function(json) {
                          $.each(json, function(index, value) {
                               $produitFamille.append('<option value="'+ value +'">'+ index +'</option>');
                          });
                      },
                      error: function(data, errorThrown)
                      {
                          alert('request failed :'+errorThrown);
                      }
                  });

              });

            /* get SousFamille de produit */
            $SousProduitFamille = $("#edit-sousproduitfamille");
            $SousProduitFamille.append('<option value="-1">Choisissez une option</option>');
            $("#edit-produitfamille").change(function() {
                  $secteur = $("#edit-secteur").val();
                  $SousProduitFamille.empty();
                  $SousProduitFamille.append('<option value="-1">Choisissez une option</option>');
                  $.ajax({
                      url: "/sites/all/modules/annuaire/recherche_avance.php",
                      data: "select=sfp&ids="+$secteur+"&id="+$(this).val(),
                      dataType: "json",
                      success: function(json) {
                          $.each(json, function(index, value) {
                               $SousProduitFamille.append('<option value="'+ value +'">'+ index +'</option>');
                          });
                      },
                      error: function(data, errorThrown)
                      {
                          alert('request failed :'+errorThrown);
                      }
                  });

              });

            /* get  produit */
              $Produit = jQuery("#edit-produit");
              $Produit.append('<option value="-1">Choisissez une option</option>');

              $("#edit-sousproduitfamille").change(function() {
                $secteur = jQuery("#edit-secteur").val();
                $famille = jQuery("#edit-produitfamille").val();
                $Produit.empty();
                $Produit.append('<option value="-1">Choisissez une option</option>');
                  $.ajax({
                      url: "/sites/all/modules/annuaire/recherche_avance.php",
                      data: "select=p&ids="+$secteur+"&idf="+$famille+"&id="+$(this).val(),
                      dataType: "json",
                      success: function(json) {
                          $.each(json, function(index, value) {
                               $Produit.append('<option value="'+ value +'">'+ index +'</option>');
                          });
                      }
                  });

              });

              /* Produit */
              $secteur0 = $("#edit-secteur");
              $tlP = $("#listProduit tbody");
              $exportid = $("input#exportid").val();
              $('body').on('click', '#edit-btnproduit', function(e){

                $.ajax({
                    url: "/sites/all/modules/espace_admin/AddTolist.php",
                    data: "select=produit&idexpt="+$exportid+"&secteur="+$secteur0.val()+
                    "&codef="+$produitFamille.val()+"&Famille="+$("#edit-produitfamille option:selected").text()+
                    "&codesf="+$SousProduitFamille.val()+"&sousFamille="+$("#edit-sousproduitfamille option:selected").text()+
                    "&codep="+$Produit.val()+"&val="+$("#edit-produit option:selected").text(),
                    dataType: "json",
                    success: function(json)
                     {
                        $tlP.empty();
                        $.each(json, function(index, value) {
                            $tlP.append('<tr><td>'+ index +'</td><td class="actions"><a href="#" class="btnsupp" data-name="'+index+'">Supprimer</a></td></tr>');
                        });

                    },
                    error: function(data, errorThrown)
                    {
                        alert('request failed :'+errorThrown);
                    }
                });

              });

              /** delete **/
               $('body').on('click', '#listProduit .btnsupp', function(e){
              //$("#listMarques .btnsupp").on('click',function(e) {
                if (confirm("Êtes-vous sûr ?")) {
                  $verif = false;
                  $.ajax({
                      url: "/sites/all/modules/espace_admin/DeleteFromlist.php",
                      data: "select=produit&idexpt="+$exportid+"&val="+$(this).data('name'),
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

            
            /* Marque*/
              $tfm = $("#edit-marque");
              $tabm = $("#listMarques tbody");
              $exportid = $("input#exportid").val();
              $('body').on('click', '#edit-btnmarque', function(e)
              {
                $.ajax({
                    url: "/sites/all/modules/espace_admin/AddTolist.php",
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
                      url: "/sites/all/modules/espace_admin/DeleteFromlist.php",
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
                    url: "/sites/all/modules/espace_admin/Updatelist.php",
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
                    url: "/sites/all/modules/espace_admin/AddTolist.php",
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
                    url: "/sites/all/modules/espace_admin/DeleteFromlist.php",
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
                    url: "/sites/all/modules/espace_admin/Updatelist.php",
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




              /* Marche */
              $tmc = $("#edit-marche");
              $tmc.append('<option value="-1">Choisissez une option</option>');
              $paysCode = $("#edit-pays");
              $tlmb = $("#listMarche tbody");
              $exportid = $("input#exportid").val();
              $('body').on('click', '#edit-btnmarche', function(e){

                $.ajax({
                    url: "/sites/all/modules/espace_admin/AddTolist.php",
                    data: "select=marche&idexpt="+$exportid+"&marcheCode="+$tmc.val()+"&val="+$("#edit-marche option:selected").text()+"&paysCode="+$paysCode.val()+"&pays="+$("#edit-pays option:selected").text(),
                    dataType: "json",
                    success: function(json)
                     {
                        $tmc.val('');
                        $tlmb.empty();
                        $.each(json, function(index, value) {
                            $tlmb.append('<tr><td>'+ index +'</td><td></td><td class="actions"><a href="#" class="btnsupp" data-name="'+index+'">Supprimer</a></td></tr>');
                        });

                    }
                });

              });

              /** delete **/
              $('body').on('click', '#listMarche .btnsupp', function(e){
             // $("#listcertif .btnsupp").click(function() {
              if (confirm("Êtes-vous sûr ?")) {
          
                $.ajax({
                    url: "/sites/all/modules/espace_admin/DeleteFromlist.php",
                    data: "select=marche&idexpt="+$exportid+"&val="+$(this).data('name'),
                    dataType: "json",
                    success: function(json) {

                    }
                    
                });

                $tr = $(this).closest('tr');
                $tr.css("background-color","#FF3700");

                $tr.fadeOut(400, function(){
                    $tr.remove();
                });
                $tmc.val('');
              }
                return false;

              });

               /* MAJ */
              $('body').on('click', '#listMarche .btnmdfy', function(e){
                $tmc.val($(this).data('name'));
                $(this).css("display","none");
                $(this).closest('td').find('.btnconf').css("display","block");
                return false;
              });

              $('body').on('click', '#listMarche .btnconf', function(e){

              
                $.ajax({
                    url: "/sites/all/modules/espace_admin/Updatelist.php",
                    data: "select=marche&idexpt="+$exportid+"&Oval="+$(this).data('name')+"&Nval="+$tmc.val(),
                    dataType: "json",
                    success: function(json) {
                        $tmc.val('');
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

              /* get  pays */
              $py = jQuery("#edit-pays");
              $py.empty();
              $py.append('<option value="-1">Choisissez une option</option>');

              $("#edit-marche").change(function() {

                $py.empty();
                $py.append('<option value="-1">Choisissez une option</option>');
                  $.ajax({
                      url: "/sites/all/modules/annuaire/recherche_avance.php",
                      data: "select=py&id="+$(this).val(),
                      dataType: "json",
                      success: function(json) {
                          $.each(json, function(index, value) {
                               $py.append('<option value="'+ value +'">'+ index +'</option>');
                          });
                      }
                  });

              });


              


          /** CONTROLL DE SAISIE  **/

         

       }
    };
})(jQuery);