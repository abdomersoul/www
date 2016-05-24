<?php

function getWhere($param){

	if (strchr($param,"fruit légume") !== false) return " AND e.Secteur = 'Primeurs'";
	if (strchr($param,"fruit") !== false && strchr($param,"rouge") !== false) return " AND e.Secteur = 'Primeurs' AND ( e.produit like '%mure%' OR  e.produit like '%fraise%' OR  e.produit like '%myrtille%' OR  e.produit like '%framboise%')";


	if (strchr($param,"sardine") !== false && strchr($param,"conserve") !== false ) return " AND e.Produit like '%sardine%' AND e.produit_sousfamille like '%cons%' ";
	if (strchr($param,"maquereau%") !== false && strchr($param,"conserve") !== false ) return " AND e.Produit like '%maquereau%' AND e.produit_sousfamille like '%cons%' ";
	if (strchr($param,"thon") !== false && strchr($param,"conserve") !== false ) return " AND e.Produit like '%thon%' AND e.produit_sousfamille like '%cons%' ";
	if (strchr($param,"poisson") !== false && strchr($param,"conserve") !== false ) return " AND e.produit_famille like '%cons%' AND e.produit_famille like '%poisson%' ";
	if (strchr($param,"poisson") !== false && strchr($param,"congel") !== false ) return " AND e.produit_sousfamille like '%CONGEL%' AND e.produit_sousfamille like '%poisson%' ";
	if (strchr($param,"crustac") !== false && strchr($param,"congel") !== false ) return " AND e.produit_sousfamille like '%CONGEL%' AND e.produit_sousfamille like '%crustac%' ";
	if (strchr($param,"mollusqu") !== false && strchr($param,"congel") !== false ) return " AND e.produit_sousfamille like '%CONGEL%' AND e.produit_sousfamille like '%mollusqu%' ";	
	if (strchr($param,"fum") !== false && strchr($param,"poisson") !== false ) return " AND e.produit_sousfamille like '%FUMES%' AND e.produit_sousfamille like '%POISSON%' ";	
	if (strchr($param,"farine") !== false && strchr($param,"poisson") !== false ) return " AND e.produit_sousfamille like '%FARINE%' AND e.produit_sousfamille like '%Poisson%' ";
	if (strchr($param,"huile") !== false && strchr($param,"poisson") !== false ) return " AND e.produit_sousfamille like '%HUILE%' AND e.produit_sousfamille like '%Poisson%' ";
	if (strchr($param,"poisson") !== false && strchr($param,"frais") !== false ) return " AND e.produit_famille like '%FRAIS%' AND e.Secteur='PRODUITS DE LA PECHE' ";	
	if (strchr($param,"semi") !== false && strchr($param,"anchoi") !== false && strchr($param,"conserve") !== false ) return " AND e.Produitsousfamille like '%anchoi%' AND e.produit_sousfamille like '%cons%' AND e.produit_sousfamille like '%semi%' ";
	if (strchr($param,"semi") !== false &&strchr($param,"sardine") !== false && strchr($param,"conserve") !== false ) return " AND e.Produit like '%sardine%' AND e.produit_sousfamille like '%cons%' AND e.produit_sousfamille like '%semi%' ";	
	
	
	if (strchr($param,"huile") !== false && strchr($param,"argan") !== false ) return " AND e.Produit like '%huile%' AND e.Produit like '%argan%' ";

	if (strchr($param,"huile") !== false && strchr($param,"olive") !== false ) return " AND e.Produit like '%huile%' AND e.Produit like '%olive%' ";

	if (strchr($param,"conserve") !== false && strchr($param,"olive") !== false ) return " AND e.produit_famille like '%cons%' AND e.produit_famille like '%olive%' ";
	
	
	if (strchr($param,"jus") !== false) return " AND e.produit like '%jus%' AND e.Secteur like 'PRODUITS TRANSFORMES D ORIGINE VEGETALE' ";
	
	if (strchr($param,"epice") !== false || strchr($param,"épice") !== false ) return " AND e.produit_famille like '%EPICE%' ";
	
	if (strchr($param,"conserve") !== false && strchr($param,"fruit") !== false) return " AND e.produit_famille like '%cons%' AND e.produit_famille like '%fruit%' AND e.Secteur like 'PRODUITS TRANSFORMES D ORIGINE VEGETALE' ";

	if (strchr($param,"conserve") !== false && strchr($param,"gume") !== false) return " AND e.produit_famille like '%cons%' AND e.produit_famille like '%LEGUME%' AND e.Secteur like 'PRODUITS TRANSFORMES D ORIGINE VEGETALE' ";

}



