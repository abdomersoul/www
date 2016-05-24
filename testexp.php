<?php
//header('Content-Type: application/json; charset="utf-8"');

/**
 * Helper function
 * 
 * @param array   $d   flat data, implementing a id/parent id (adjacency list) structure
 * @param mixed   $r   root id, node to return
 * @param string  $pk  parent id index
 * @param string  $k   id index
 * @param string  $c   children index
 * @return array
 */


    $host = '192.168.9.61';
    $dbname = 'eacce';
    $login = 'root';
    $password ='root';

    $pdo = new PDO("mysql:dbname=$dbname;host=$host", $login, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

    $data = $pdo->query("SELECT e.id_exportateur,DESEXPT,id_produit FROM exportateur e INNER JOIN exportateur_produit p ON e.id_exportateur = p.id_exportateur LIMIT 4")->fetchAll();
     echo var_dump($data);
    //$data = $pdo->query("SELECT id_exportateur,DESEXPT FROM exportateur e LIMIT 10")->fetchAll();
    $res = array();
  
    foreach ($data as $d) {

      $res[$d->id_exportateur]["id"] = $d->id_exportateur;
      $res[$d->id_exportateur]["nom"] = $d->DESEXPT;
      $res[$d->id_exportateur]["idp"] = array();
      foreach ($data as $p) {
        if ( $d->id_exportateur == $p->id_exportateur)
          if(!in_array($p->id_produit,$res[$d->id_exportateur]["idp"]))
            $res[$d->id_exportateur]["idp"][] = $p->id_produit;
      }
    }

     echo json_encode($res);
   //print_r(array_merge_recursive($res));
    /*$expos = array();

    foreach ($expos as $e){


    }*/


/*function makeRecursive($d, $r = 0, $pk = 'parent', $k = 'id', $c = 'children') {
  $m = array();
  foreach ($d as $e) {
    isset($m[$e[$pk]]) ?: $m[$e[$pk]] = array();
    isset($m[$e[$k]]) ?: $m[$e[$k]] = array();
    $m[$e[$pk]][] = array_merge($e, array($c => &$m[$e[$k]]));
  }

  return $m[$r][0]; // remove [0] if there could be more than one root nodes
}

echo json_encode(makeRecursive(array(
  array('id' => 5273, 'parent' => 0,    'name' => 'John Doe'),  
  array('id' => 6032, 'parent' => 5273, 'name' => 'Sally Smith'),
  array('id' => 6034, 'parent' => 6032, 'name' => 'Mike Jones'),
  array('id' => 6035, 'parent' => 6034, 'name' => 'Jason Williams'),
  array('id' => 6036, 'parent' => 5273, 'name' => 'Sara Johnson'),
  array('id' => 6037, 'parent' => 5273, 'name' => 'Dave Wilson'),
  array('id' => 6038, 'parent' => 6037, 'name' => 'Amy Martin'),
)));*/

?>