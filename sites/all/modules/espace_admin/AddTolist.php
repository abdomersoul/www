<?php
if(isset($_GET['select']) && isset($_GET['val']) && isset($_GET['idexpt'])) 
{
    
    $json = array();
    $json2 = array();
    $id = utf8_decode($_GET['idexpt']);
    if(isset($_GET['marcheCode']))
        $marcheCode = utf8_decode($_GET['marcheCode']);
    $val = utf8_decode($_GET['val']);
    if(isset($_GET['paysCode']))
        $paysCode = utf8_decode($_GET['paysCode']);
    if(isset($_GET['pays']))
        $pays =utf8_decode($_GET['pays']);

    if(isset($_GET['secteur']))
        $secteur = utf8_decode($_GET['secteur']);
    if(isset($_GET['codef']))
        $codefamille = utf8_decode($_GET['codef']);
    if(isset($_GET['Famille']))
        $produitFamille = utf8_decode($_GET['Famille']);
    if(isset($_GET['codesf']))
        $codesousfamille = utf8_decode($_GET['codesf']);
    if(isset($_GET['sousFamille']))
        $produitsousFamille = utf8_decode($_GET['sousFamille']);
    if(isset($_GET['codep']))
        $codeproduit = utf8_decode($_GET['codep']);


    if ($_GET['select'] == "marque" ){

        $requete = "SELECT marque FROM export_marques where idexport = '".addslashes($id)."' ORDER BY marque";
        $reqinsert = "INSERT INTO export_marques(idexport,marque) VALUES('".addslashes($id)."','".addslashes($val)."')";
    }

    if ($_GET['select'] == "certif" ){

        $requete = "SELECT certif FROM export_certifs where idexport = '".addslashes($id)."' ORDER BY certif";
        $reqinsert = "INSERT INTO export_certifs(idexport,certif) VALUES('".addslashes($id)."','".addslashes($val)."')";
    }

    if ($_GET['select'] == "marche" ){

        $requete = "SELECT marche FROM export_marche where idexport = '".addslashes($id)."' ORDER BY marche";
        $reqinsert = "INSERT INTO export_marche(idexport,code_marche,marche,code_pays,pays) VALUES('".addslashes($id)."','".addslashes($marcheCode)."','".addslashes($val)."','".addslashes($paysCode)."','".addslashes($pays)."')";
    }

    if ($_GET['select'] == "produit" ){

        $requete = "SELECT Produit FROM export_produits where id_exportateur = '".addslashes($id)."' ORDER BY Produit";
        $reqinsert = "INSERT INTO export_produits(Secteur,code_famille,produit_famille,code_sousfamille,produit_sousfamille,Code_Produit,Produit,id_exportateur) VALUES('".addslashes($secteur)."','".addslashes($codefamille)."','".addslashes($produitFamille)."','".addslashes($codesousfamille)."','".addslashes($produitsousFamille)."','".addslashes($codeproduit)."','".addslashes($val)."','".addslashes($id)."')";
    }

        
    require_once("config.php");

    $count = $bdd->exec($reqinsert) or die(print_r($bdd->errorInfo()));
    $resultat = $bdd->query($requete) or die(print_r($bdd->errorInfo()));
    while($donnees = $resultat->fetch(PDO::FETCH_ASSOC)) {
        if ($_GET['select'] == "marque" ) $json[$donnees['marque']] = utf8_encode($donnees['marque']);
        if ($_GET['select'] == "certif" ) $json[$donnees['certif']] = utf8_encode($donnees['certif']);
        if ($_GET['select'] == "marche" ) $json[$donnees['marche']] = utf8_encode($donnees['marche']);
        if ($_GET['select'] == "produit" ) $json[$donnees['Produit']] = utf8_encode($donnees['Produit']);
    }
    $json2[$requete] = utf8_encode($requete);
    echo json_encode($json);
}
?>

