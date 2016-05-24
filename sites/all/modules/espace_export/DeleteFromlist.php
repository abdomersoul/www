<?php
if(isset($_GET['select']) && isset($_GET['val']) && isset($_GET['idexpt'])) {
    
    $json = array();
    $id = utf8_decode($_GET['idexpt']);
    $val = utf8_decode($_GET['val']);
   

    if ($_GET['select'] == "marque" ){

        $requete = "SELECT marque FROM export_marques where idexport = '".addslashes($id)."' ORDER BY marque";
        $reqdel ="DELETE FROM export_marques WHERE idexport = '".addslashes($id)."' AND marque = '".addslashes($val)."'";
    }

    if ($_GET['select'] == "certif" ){

        $requete = "SELECT certif FROM export_certifs where idexport = '".addslashes($id)."' ORDER BY certif";
        $reqdel ="DELETE FROM export_certifs WHERE idexport = '".addslashes($id)."' AND certif = '".addslashes($val)."'";
    }
        
    require_once("config.php");

    $count = $bdd->exec($reqdel) or die(print_r($bdd->errorInfo()));
    $resultat = $bdd->query($requete) or die(print_r($bdd->errorInfo()));

    while($donnees = $resultat->fetch(PDO::FETCH_ASSOC)) {
        $json['count'] = utf8_encode($count);
    }

    echo json_encode($json);
}
?>

