<?php
if(isset($_GET['select']) && isset($_GET['Oval']) && isset($_GET['Nval']) && isset($_GET['idexpt'])) {
    
    $json = array();
    $id = utf8_decode($_GET['idexpt']);
    $Oval = utf8_decode($_GET['Oval']);
    $Nval = utf8_decode($_GET['Nval']);
   

    if ($_GET['select'] == "marque" ){

        $requete = "SELECT marque FROM export_marques where idexport = '".addslashes($id)."' ORDER BY marque";
        $reqmaj ="UPDATE export_marques SET marque = '".addslashes($Nval)."' WHERE idexport = '".addslashes($id)."' AND marque = '".addslashes($Oval)."'";
    }

    if ($_GET['select'] == "certif" ){

        $requete = "SELECT certif FROM export_certifs where idexport = '".addslashes($id)."' ORDER BY certif";
        $reqmaj ="UPDATE export_certifs SET certif = '".addslashes($Nval)."' WHERE idexport = '".addslashes($id)."' AND certif = '".addslashes($Oval)."'";
    }
        
    require_once("config.php");

    $count = $bdd->exec($reqmaj) or die(print_r($bdd->errorInfo()));
    $resultat = $bdd->query($requete) or die(print_r($bdd->errorInfo()));

    while($donnees = $resultat->fetch(PDO::FETCH_ASSOC)) {
        if ($_GET['select'] == "marque" ) $json[$donnees['marque']] = utf8_encode($donnees['marque']);
        if ($_GET['select'] == "certif" ) $json[$donnees['certif']] = utf8_encode($donnees['certif']);
    }

    echo json_encode($json);
}
?>

