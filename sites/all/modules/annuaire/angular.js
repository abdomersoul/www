
	var myApp = angular.module("myApp", ['angularUtils.directives.dirPagination']);

	myApp.controller('Ctrl',function($scope){
		
  		//$scope.datef = "29/07/2016";
		$scope.expos = expos;
	});

	myApp.controller('Ctrl1',function($scope){
		
		$scope.resexpot = res1;
		$scope.res = res;
		$scope.ress = res;
		$scope.produits = [];
		$scope.regions = [];
		$scope.pays = [];

		console.log($scope.res);
		console.log(res1);
		$expores = [];

		/*angular.forEach(res1, function(i, item) {
		   $expores[item[i].idexpo]["id"] = item[i].idexpo;
		   $expores[item[i].idexpo]["nom"] = item[i].nomexpo;
		   $expores[item[i].idexpo]["adresse"] = item[i].ADRESSE;
		   console.log(item);
		});​*/

	/*angular.forEach($scope.resexpot, function(value, key){
			$expores[value.idexpo]["id"] = value.idexpo;
			$expores[value.idexpo]["nom"] = value.nomexpo;
		    // console.log();
		});

		console.log($expores);*/


		$scope.exposelect = [];

		$scope.currentPage = 1;
  		$scope.numPerPage = 10;
  		$scope.maxSize = 5;


  		$scope.toggleSelection = function toggleSelection(idexpo) {
		    var idx = this.exposelect.indexOf(idexpo);

		    // is currently selected
		    if (idx > -1) {
		      this.exposelect.splice(idx, 1);
		    }

		    // is newly selected
		    else {
		      this.exposelect.push(idexpo);
		    }
		  };

	});



	function parseDate(input) {
  		var parts = input.split('/');
 		return new Date(parts[2], parts[1]-1, parts[0]); 
	}

	function inArray(needle, haystack) {
	    var length = haystack.length;

	    for(var i = 0; i < length; i++) {
	        if(haystack[i] == +needle) 
	        	{	
	        		console.log("produits : "+haystack[i]+"idp : "+needle);
	        		return true;
	        	}
	    }
	    return false;
	}

	/* filter by produit */
	myApp.filter("fProd",function(){
		return function(items,produits){

			if( produits.length <= 0) return items;
       
		    var filtred = [];

	    	angular.forEach(items, function(item) {
	    		
	    		console.log("idp : "+item+" produits : "+ produits);
	    		var rtn = false;
	    		for (var i = 0; i < produits.length; i++) {
	    			console.log("inArray : "+inArray(produits[i],item.idp));
	    			if(inArray(produits[i],item.idp)) rtn = true;
	    			else {rtn = false; break;}
	    		}

	    		console.log("rtn : "+ rtn);
	    		if (rtn == true){
		    			filtred.push(item);
		    			//console.log("res : "+item);
		    		}
	    	})
		   		
		   		console.log("filtred ");
		   		console.log(filtred);
		   		return filtred;
		    }
	});

	/* filter by region */
	myApp.filter("fReg",function(){
		return function(items,regions){

			if( regions.length <= 0) return items;
       
		    var filtred = [];

	    	angular.forEach(items, function(item) {
	    		
	    		console.log("idr : "+item+" produits : "+ regions);
	    		var rtn = false;
	    		for (var i = 0; i < regions.length; i++) {
	    			console.log("inArray : "+inArray(regions[i],item.idr));
	    			if(inArray(regions[i],item.idr)) rtn = true;
	    			else {rtn = false; break;}
	    		}

	    		console.log("rtn : "+ rtn);
	    		if (rtn == true){
		    			filtred.push(item);
		    			//console.log("res : "+item);
		    		}
	    	})
		   		
		   		console.log("filtred ");
		   		console.log(filtred);
		   		return filtred;
		    }
	});

	/* filter by pays */
	myApp.filter("fPays",function(){
		return function(items,pays){

			if( pays.length <= 0) return items;
       
		    var filtred = [];

	    	angular.forEach(items, function(item) {
	    		
	    		console.log("idy : "+item+" pays : "+ pays);
	    		var rtn = false;
	    		for (var i = 0; i < pays.length; i++) {
	    			console.log("inArray : "+inArray(pays[i],item.idy));
	    			if(inArray(pays[i],item.idy)) rtn = true;
	    			else {rtn = false; break;}
	    		}

	    		console.log("rtn : "+ rtn);
	    		if (rtn == true){
		    			filtred.push(item);
		    			//console.log("res : "+item);
		    		}
	    	})
		   		
		   		console.log("filtred ");
		   		console.log(filtred);
		   		return filtred;
		    }
	});





	myApp.filter("DateCpm",function(){
		return function(items,from,to){

			if (!from) from = "01/01/1010";
			if (!to) to = "12/12/9999";

			console.log("from  : "+from+" to : "+to);
			var dateStart = Date.parse(parseDate(from));

			var dateEnd = Date.parse(parseDate(to));

      		

      		return items.filter(function(item){
      			console.log("--- debut ---");
      			console.log("dated : "+from+" datef : "+to);

      			var dateInsc = Date.parse(parseDate(item.date_insc));
      			
      			console.log(item);
      			console.log(item.date_insc);
      			console.log(dateInsc);
		        return (dateInsc > dateStart && dateInsc < dateEnd);
		    });
		}
		
	});

	