<?php
if(isset($_GET['select']) && isset($_GET['id'])) {
    
    $json = array();
    $id = utf8_decode($_GET['id']);
    if(isset($_GET['ids']))
        $ids = utf8_decode($_GET['ids']);
    if(isset($_GET['idf']))
        $idf = utf8_decode($_GET['idf']);

    if ($_GET['select'] == "fp" ) $requete = "SELECT distinct code_famille, produit_famille FROM export where Secteur = '".addslashes($id)."' ORDER BY code_famille";
    if ($_GET['select'] == "sfp" ) $requete = "SELECT distinct code_sousfamille, produit_sousfamille FROM export where code_famille = '".$id."' AND  Secteur = '".addslashes($ids)."' ORDER BY produit_sousfamille";
    if ($_GET['select'] == "p" ) $requete = "SELECT distinct Code_Produit, Produit FROM export where code_sousfamille = '".$id."' AND  Secteur = '".addslashes($ids)."' AND code_famille = '".$idf."' ORDER BY Produit";
    if ($_GET['select'] == "py" ) $requete = "SELECT distinct code_dest_pays, dest_pays FROM export where code_dest_marche = '".$id."' ORDER BY dest_pays";
 
    
    
    try {
        $bdd = new PDO('mysql:host=localhost;dbname=eacce_db', 'root', '');
    } catch(Exception $e) {
        exit('Impossible de se connecter à la base de données.');
    }
    $resultat = $bdd->query($requete) or die(print_r($bdd->errorInfo()));

    while($donnees = $resultat->fetch(PDO::FETCH_ASSOC)) {
        if ($_GET['select'] == "fp" ) $json[$donnees['produit_famille']] = utf8_encode($donnees['code_famille']);
        if ($_GET['select'] == "sfp" ) $json[$donnees['produit_sousfamille']] = utf8_encode($donnees['code_sousfamille']);
        if ($_GET['select'] == "p" )  $json[$donnees['Produit']] = utf8_encode($donnees['Code_Produit']);
        if ($_GET['select'] == "py" )  $json[$donnees['dest_pays']] = utf8_encode($donnees['code_dest_pays']);
    }

    echo json_encode($json);
}
?>

