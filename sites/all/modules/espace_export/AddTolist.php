<?php
if(isset($_GET['select']) && isset($_GET['val']) && isset($_GET['idexpt'])) {
    
    $json = array();
    $id = utf8_decode($_GET['idexpt']);
    $val = utf8_decode($_GET['val']);
   

    if ($_GET['select'] == "marque" ){

        $requete = "SELECT marque FROM export_marques where idexport = '".addslashes($id)."' ORDER BY marque";
        $reqinsert = "INSERT INTO export_marques(idexport,marque) VALUES('".addslashes($id)."','".addslashes($val)."')";
    }

    if ($_GET['select'] == "certif" ){

        $requete = "SELECT certif FROM export_certifs where idexport = '".addslashes($id)."' ORDER BY certif";
        $reqinsert = "INSERT INTO export_certifs(idexport,certif) VALUES('".addslashes($id)."','".addslashes($val)."')";
    }

        
    require_once("config.php");
    
    $count = $bdd->exec($reqinsert) or die(print_r($bdd->errorInfo()));
    $resultat = $bdd->query($requete) or die(print_r($bdd->errorInfo()));

    while($donnees = $resultat->fetch(PDO::FETCH_ASSOC)) {
        if ($_GET['select'] == "marque" ) $json[$donnees['marque']] = utf8_encode($donnees['marque']);
        if ($_GET['select'] == "certif" ) $json[$donnees['certif']] = utf8_encode($donnees['certif']);
    }

    echo json_encode($json);
}
?>

